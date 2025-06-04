import React from 'react';
import { View, ViewProps } from 'react-native';

import { Text } from '@ui/Text';
import { Fonts } from '@models/fonts';
import { commonStyles } from '@constants/CommonStyles';

interface PageHeaderProps extends ViewProps {
  title?: string | null;
  description?: string | null;
  titleFont?: Fonts;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, titleFont = Fonts.MEDIUM, style, ...props }) => {
  if (!title && !description) return null;

  return (
    <View style={[commonStyles.headerContainer, style]} {...props}>
      {title && (
        <Text font={titleFont} style={commonStyles.title}>
          {title}
        </Text>
      )}
      {description && (
        <Text font={Fonts.REGULAR} style={commonStyles.description}>
          {description}
        </Text>
      )}
    </View>
  );
};
