import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { rs } from '@utils/scaling';

export const Loader = () => (
  <View style={styles.wrapper}>
    <ActivityIndicator size={rs(64)} color='#314aed' />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
