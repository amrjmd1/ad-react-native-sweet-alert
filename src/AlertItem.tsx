import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, type ViewStyle } from 'react-native';
import type { AlertConfig, InternalAlert } from './types';

const bgFor = (t?: string) =>
  t === 'error'
    ? '#ef4444'
    : t === 'warning'
      ? '#f59e0b'
      : t === 'info'
        ? '#3b82f6'
        : '#22c55e';

type Props = {
  data: InternalAlert;
  onClose: () => void;
  config: Required<AlertConfig>;
  index: number;
};

export const AlertItem: React.FC<Props> = ({ data, onClose, config }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(
    new Animated.Value(config.position === 'top' ? -20 : 20)
  ).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (config.animation === 'fade') {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    if (config.animation === 'slide') {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translate, { toValue: 0, useNativeDriver: true }),
      ]).start();
    }

    if (config.animation === 'scale') {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }

    // auto dismiss
    if (data.dismissible !== false) {
      const ms = data.duration ?? config.duration;
      const t = setTimeout(() => handleClose(), ms);
      return () => clearTimeout(t);
    }
    return () => null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (config.animation === 'fade') {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(onClose);
    }

    if (config.animation === 'slide') {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translate, {
          toValue: config.position === 'top' ? -20 : 20,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(onClose);
    }

    if (config.animation === 'scale') {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(onClose);
    }
  };

  // dynamic style
  const containerStyle: ViewStyle = {
    marginHorizontal: 12,
    marginBottom: config.position === 'bottom' ? config.offset : 0,
    marginTop: config.position === 'top' ? config.offset : 0,
    borderRadius: 12,
    padding: 12,
    backgroundColor: bgFor(data.type),
    opacity,
    transform: [
      ...(config.animation === 'slide' ? [{ translateY: translate }] : []),
      ...(config.animation === 'scale' ? [{ scale }] : []),
    ],
  } as any;

  return (
    <Animated.View style={containerStyle}>
      <Pressable onPress={data.onPress ?? handleClose}>
        {data.title ? (
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              marginBottom: data.message ? 2 : 0,
            }}
          >
            {data.title}
          </Text>
        ) : null}
        {data.message ? (
          <Text style={{ color: 'white' }}>{data.message}</Text>
        ) : null}
      </Pressable>
    </Animated.View>
  );
};
