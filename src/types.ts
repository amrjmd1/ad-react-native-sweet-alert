import type { ReactNode } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';
export type AlertAnimation = 'slide' | 'fade' | 'scale';
export type AlertPosition = 'top' | 'bottom';

export interface AlertOptions {
  id?: string;
  type?: AlertType;
  title?: string;
  message?: string;
  duration?: number; // in ms
  icon?: ReactNode;
  onPress?: () => void;
  dismissible?: boolean;
}

export interface AlertConfig {
  position?: AlertPosition;
  animation?: AlertAnimation;
  duration?: number; // default auto-dismiss
  maxVisible?: number; // maximum number of alerts visible at once
  offset?: number; // in pixels
  respectSafeArea?: boolean;
  extraTopInset?: number;
  extraBottomInset?: number;
}

export interface InternalAlert
  extends Required<Pick<AlertOptions, 'id'>>,
    Omit<AlertOptions, 'id'> {}
