import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';

import { CAPTCHA_CONFIG } from '../utils/rewardConfig';


function makeCode() {
  const { charset, codeLength } = CAPTCHA_CONFIG;
  let out = '';
  for (let i = 0; i < codeLength; i += 1) {
    out += charset[Math.floor(Math.random() * charset.length)];
  }
  return out;
}
 
/**
 * status: 'idle' | 'short' | 'success' | 'error'
 * NOTE: demo only. In production the code must be generated and checked on the server.
 */
export default function useCaptcha() {
  const [code, setCode] = useState(makeCode);
  const [input, setInputState] = useState('');
  const [status, setStatus] = useState('idle');
  const [gems, setGems] = useState(0);
  const [solved, setSolved] = useState(0);
  const timer = useRef(null);
 
  useEffect(() => () => clearTimeout(timer.current), []);
 
  const refresh = useCallback(() => {
    clearTimeout(timer.current);
    setCode(makeCode());
    setInputState('');
    setStatus('idle');
  }, []);
 
  const setInput = useCallback((value) => {
    setInputState(value.toUpperCase().slice(0, CAPTCHA_CONFIG.codeLength));
    setStatus((s) => (s === 'short' ? 'idle' : s));
  }, []);
 
  const verify = useCallback(() => {
    if (status === 'success' || status === 'error') return;
    if (input.length < CAPTCHA_CONFIG.codeLength) {
      setStatus('short');
      return;
    }
    if (input === code) {
      setStatus('success');
      setGems((g) => g + CAPTCHA_CONFIG.gemsPerTask);
      setSolved((s) => s + 1);
      timer.current = setTimeout(refresh, CAPTCHA_CONFIG.successDelayMs);
    } else {
      setStatus('error');
      timer.current = setTimeout(refresh, CAPTCHA_CONFIG.errorDelayMs);
    }
  }, [status, input, code, refresh]);
 
  return { code, input, setInput, status, gems, solved, refresh, verify };
}