import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import { LanguageSwitcher } from '@components/LanguageSwitcher';
import { rs } from '@utils/scaling';
import Return from '@assets/icons/return.svg';
import { i18n } from '@lib/i18n';
import { Colors } from '@constants/Colors';
import { useHistory } from '@providers/historyProvider';

const NavigationControls: React.FC = () => {
  const { stack, goBack, ignoreNextChange } = useHistory();

  const canGoBack = stack.length > 2;

  const handleReturn = () => {
    if (!canGoBack) return;

    const prevPath = stack[stack.length - 2];
    const parts = prevPath.split('/').filter(Boolean);
    parts[0] = i18n.language;

    goBack();
    ignoreNextChange();

    const finalPath = `/${parts.join('/')}`;

    router.replace(finalPath as `/${string}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleReturn} disabled={!canGoBack} style={styles.backButton} accessibilityLabel='Go back'>
        <Return width={rs(18)} height={rs(18)} fill={canGoBack ? Colors.text.primary : Colors.text.disabled} />
      </TouchableOpacity>
      <LanguageSwitcher />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    right: 0,
    top: '50%',
    transform: [{ translateY: -50 }],

    gap: rs(8),
    zIndex: 1000,
    backgroundColor: Colors.background.overlay,

    borderWidth: rs(0.8),
    borderRightWidth: 0,
    borderColor: Colors.border.navigation,
    borderRadius: rs(12),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: rs(12),
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(8),
  },
});

export default NavigationControls;
