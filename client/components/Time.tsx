import { StyleSheet, View } from 'react-native';

import { Text } from '@ui/Text';
import { useLocalTime } from '@hooks/useLocalTime';
import { rs } from '@utils/scaling';
import { Fonts } from '@models/fonts';
import { Colors } from '@constants/Colors';

export default function Time() {
  const time = useLocalTime();

  return (
    <View>
      <Text font={Fonts.MEDIUM} style={styles.time}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: rs(16),
    fontWeight: '500',
    color: Colors.text.primary,
  },
});
