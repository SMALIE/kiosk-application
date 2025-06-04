import React from 'react';
import { View } from 'react-native';

import { Text } from '@ui/Text';
import { commonStyles } from '@constants/CommonStyles';

export default function NotFound() {
  return (
    <View style={[commonStyles.fullHeightContainer, commonStyles.centerContent]}>
      <Text>Page not found</Text>
    </View>
  );
}
