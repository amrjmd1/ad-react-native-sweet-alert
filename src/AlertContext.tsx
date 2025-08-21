import { createContext } from 'react';
import type { AlertConfig, AlertOptions } from './types';

export type AlertContextType = {
  showAlert: (opts: AlertOptions) => string;
  hideAlert: (id: string) => void;
  clear: () => void;
  config: Required<AlertConfig>;
};

export const defaultConfig: Required<AlertConfig> = {
  position: 'top',
  animation: 'slide',
  duration: 3000,
  maxVisible: 3,
  offset: 0,
  respectSafeArea: true,
  extraTopInset: 0,
  extraBottomInset: 0,
};

export const AlertContext = createContext<AlertContextType>({
  showAlert: () => '',
  hideAlert: () => {},
  clear: () => {},
  config: defaultConfig,
});
