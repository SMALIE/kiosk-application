import React from 'react';
import { View } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import { Image } from 'expo-image';
import { Redirect, useLocalSearchParams } from 'expo-router';

import Card from '@ui/Card';
import { LoadingState } from '@ui/LoadingState';
import { PageHeader } from '@ui/PageHeader';
import { Text } from '@ui/Text';
import { buildMediaUri } from '@hooks/useMedia';
import { useSocialMedia } from '@hooks/useSocialMedia';
import { calc, rs } from '@utils/scaling';
import { Colors } from '@constants/Colors';
import { commonStyles } from '@constants/CommonStyles';

const Socials: React.FC = () => {
  const { locale } = useLocalSearchParams<{
    locale: string;
  }>();

  const { data, isLoading, isError } = useSocialMedia({ locale });

  return (
    <LoadingState isLoading={isLoading} isError={isError} errorFallback={<Redirect href={`/${locale}`} />}>
      <View style={commonStyles.pageContainer}>
        <PageHeader title={data?.title} description={data?.description} />

        <View style={styles.cardGrid}>
          {data?.links.map((link) => (
            <Card key={link.logo.id} style={styles.card}>
              <View style={styles.logoContainer}>
                <Image source={{ uri: buildMediaUri(link.logo.url) }} contentFit='contain' style={styles.logo} />
              </View>
              <Text style={styles.handle}>{link.handle}</Text>
              <View style={styles.qrCodeContainer}>
                <QRCode
                  value={link.url}
                  size={rs(110)}
                  color='#10141D'
                  backgroundColor='white'
                  logo={require('@assets/images/icon.png')}
                  logoSize={rs(30)}
                  logoBorderRadius={100}
                  logoBackgroundColor={Colors.background.primary}
                />
              </View>
            </Card>
          ))}
        </View>
      </View>
    </LoadingState>
  );
};

const styles = {
  cardGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: rs(20),
  },
  card: {
    width: calc('50% - rs(60)'),
  },
  logoContainer: {
    justifyContent: 'center' as const,
    minHeight: rs(80),
  },
  logo: {
    width: rs(60),
    height: rs(60),
    marginBottom: rs(12),
  },
  handle: {
    fontSize: rs(18),
    color: Colors.text.tertiary,
  },

  qrCodeContainer: {
    padding: rs(12),
    backgroundColor: 'white',
    borderRadius: rs(14),
    marginTop: rs(24),
  },
};

export default Socials;
