import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
const AlertContext = createContext(null);

export function AlertProvider({ children }) {

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const timerRef = useRef(null);

  const hideAlert = useCallback(() => {
    setVisible(false);
    setMessage("");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showAlert = useCallback((msg, t = "info", duration = 1500) => {
    // clear any running timer, update content, show, then schedule auto-hide
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setMessage(msg);
    setType(t);
    setVisible(true);
    timerRef.current = setTimeout(() => {
      hideAlert();
    }, duration);
  }, [hideAlert]);

  const value = useMemo(() => ({ showAlert, hideAlert }), [showAlert, hideAlert]);

  return (
    <AlertContext.Provider value={value}>
      {children}
        {visible && (<div className={`alert alert-${type} fade show position-fixed top-0 w-100`} style={{ zIndex: 1080 }} role="alert">{message}</div>)}
    </AlertContext.Provider>
  );
}

// it can be called directly so no need to write there use context again.
export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
}
