import { StyleSheet, Text as RNText, TextProps } from 'react-native';

import { rs } from '@utils/scaling';
import { Fonts } from '@models/fonts';
import { Colors } from '@constants/Colors';

interface CustomTextProps extends TextProps {
  font?: Fonts;
}

export const Text = ({ style, font = Fonts.REGULAR, ...props }: CustomTextProps) => {
  const fontFamily = font;

  return <RNText style={[styles.text, { fontFamily }, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontSize: rs(20),
    color: Colors.text.primary,
    fontFamily: Fonts.REGULAR,
  },
});
