import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import IconButton from '@ui/IconButton';
import { Button } from '@models/page';
import { commonStyles } from '@constants/CommonStyles';

interface ButtonGridProps extends ViewProps {
  buttons: Button[];
  buttonStyle?: StyleProp<ViewStyle>;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({ buttons, buttonStyle, style, ...props }) => {
  if (!buttons?.length) return null;

  return (
    <View style={[commonStyles.buttonsContainer, style]} {...props}>
      {buttons.map((button) => (
        <IconButton key={button.id} button={button} style={[commonStyles.buttonGrid, buttonStyle]} />
      ))}
    </View>
  );
};
