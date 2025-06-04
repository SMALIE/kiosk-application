import React from 'react';
import { View } from 'react-native';

import { ButtonGrid } from '@ui/ButtonGrid';
import { PageHeader } from '@ui/PageHeader';
import { Text } from '@ui/Text';
import { rs } from '@utils/scaling';
import { Fonts } from '@models/fonts';
import type { Button } from '@models/page';
import { commonStyles } from '@constants/CommonStyles';

import NewsCarousel from './Carousel';

interface MenuData {
  title?: string | null;
  buttons: Button[];
}

interface MenuRendererProps {
  menu: MenuData;
}

const MenuRenderer: React.FC<MenuRendererProps> = ({ menu }) => {
  return (
    <View style={commonStyles.fullHeightContainer}>
      <PageHeader title={menu.title} />

      <ButtonGrid buttons={menu.buttons} />

      <View style={styles.newsContainer}>
        <Text font={Fonts.MEDIUM} style={commonStyles.title}>
          News
        </Text>
        <View style={commonStyles.centerContent}>
          <NewsCarousel />
        </View>
      </View>
    </View>
  );
};

const styles = {
  newsContainer: {
    width: '100%' as const,
    position: 'absolute' as const,
    bottom: rs(100),
    justifyContent: 'center' as const,
  },
};

export default MenuRenderer;
