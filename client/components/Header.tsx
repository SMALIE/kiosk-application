import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Link } from 'expo-router';

import Time from '@components/Time';
import { rs } from '@utils/scaling';
import Logo from '@assets/icons/logo.svg';
import { i18n } from '@lib/i18n';

const Header: React.FC = () => {
  return (
    <View style={styles.contentContainer}>
      <Link href={`/${i18n.language}`} style={styles.logoContainer}>
        <Logo width={rs(42)} height={rs(42)} />
      </Link>
      <Time />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  logoContainer: {},
});

export default Header;
