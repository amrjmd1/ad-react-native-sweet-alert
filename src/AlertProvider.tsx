import React, { useCallback, useMemo, useState } from 'react';
import { AlertContext, defaultConfig } from './AlertContext';
import type { AlertConfig, AlertOptions, InternalAlert } from './types';
import { AlertContainer } from './AlertContainer';

type Props = {
  children: React.ReactNode;
  config?: AlertConfig;
};

const genId = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

export const AlertProvider: React.FC<Props> = ({ children, config }) => {
  const merged = useMemo(
    () => ({ ...defaultConfig, ...(config || {}) }),
    [config]
  );
  const [alerts, setAlerts] = useState<InternalAlert[]>([]);

  const showAlert = useCallback((opts: AlertOptions) => {
    const id = opts.id ?? genId();
    setAlerts((prev) => {
      const next: InternalAlert = { id, ...opts };
      return [next, ...prev];
    });
    return id;
  }, []);

  const hideAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const clear = useCallback(() => setAlerts([]), []);

  return (
    <AlertContext.Provider
      value={{ showAlert, hideAlert, clear, config: merged }}
    >
      {children}
      <AlertContainer alerts={alerts} onClose={hideAlert} config={merged} />
    </AlertContext.Provider>
  );
};
