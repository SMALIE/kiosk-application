import React from 'react';
import { View, ViewProps } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { ButtonGrid } from '@ui/ButtonGrid';
import { MediaDisplay } from '@ui/MediaDisplay';
import { PageHeader } from '@ui/PageHeader';
import { Text } from '@ui/Text';
import { Button } from '@models/page';
import { commonStyles } from '@constants/CommonStyles';

interface PageLayoutProps extends ViewProps {
  title?: string | null;
  description?: string | null;
  media?: { url: string; mime?: string | null } | null;
  content?: string | null;
  buttons?: Button[] | null;
  scrollable?: boolean;
  children?: React.ReactNode;
  headerProps?: object;
  mediaProps?: object;
  buttonsProps?: object;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  media,
  content,
  buttons,
  scrollable = true,
  children,
  headerProps,
  mediaProps,
  buttonsProps,
  style,
  ...props
}) => {
  const ContentElement = (
    <>
      <PageHeader title={title} description={description} {...headerProps} />

      <MediaDisplay media={media} {...mediaProps} />

      {content && <Text style={commonStyles.content}>{content}</Text>}

      {children}

      <ButtonGrid buttons={buttons || []} {...buttonsProps} />
    </>
  );

  if (scrollable) {
    return (
      <ScrollView contentContainerStyle={[commonStyles.pageContainer, style]} {...props}>
        {ContentElement}
      </ScrollView>
    );
  }

  return (
    <View style={[commonStyles.fullHeightContainer, style]} {...props}>
      {ContentElement}
    </View>
  );
};
