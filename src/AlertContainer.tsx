import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AlertConfig, InternalAlert } from './types';
import { AlertItem } from './AlertItem';

type Props = {
  alerts: InternalAlert[];
  onClose: (id: string) => void;
  config: Required<AlertConfig>;
};

export const AlertContainer: React.FC<Props> = ({
  alerts,
  onClose,
  config,
}) => {
  const visible = useMemo(
    () => alerts.slice(0, config.maxVisible),
    [alerts, config.maxVisible]
  );

  return (
    <View
      pointerEvents="box-none"
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: config.position === 'top' ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      <SafeAreaView
        pointerEvents="box-none"
        edges={config.position === 'top' ? ['top'] : ['bottom']}
        style={{
          paddingTop: config.position === 'top' ? config.extraTopInset || 5 : 0,
          paddingBottom:
            config.position === 'bottom' ? config.extraBottomInset || 5 : 0,
        }}
      >
        {visible.map((a) => (
          <AlertItem
            key={a.id}
            data={a}
            onClose={() => onClose(a.id!)}
            config={config}
            index={0}
          />
        ))}
      </SafeAreaView>
    </View>
  );
};
