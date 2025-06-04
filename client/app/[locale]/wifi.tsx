import React from 'react';
import { StyleSheet, View } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import { Redirect, useLocalSearchParams } from 'expo-router';

import Card from '@ui/Card';
import { LoadingState } from '@ui/LoadingState';
import { PageHeader } from '@ui/PageHeader';
import { Text } from '@ui/Text';
import { useWifi } from '@hooks/useWifi';
import { rs } from '@utils/scaling';
import { Fonts } from '@models/fonts';
import { Colors } from '@constants/Colors';
import { commonStyles } from '@constants/CommonStyles';

export default function Wifi() {
  const { locale } = useLocalSearchParams<{
    locale: string;
  }>();

  const { data, isLoading, isError } = useWifi({ locale });

  if (!data || isError) return <Redirect href={`/${locale}`} />;

  const parts = [`T:${data.encryption}`, `S:${data.ssid}`, data.password ? `P:${data.password}` : null, `H:false`];
  const wifiQR = `WIFI:${parts.filter(Boolean).join(';')};;`;

  return (
    <LoadingState isLoading={isLoading} isError={isError}>
      <View style={commonStyles.pageContainer}>
        <PageHeader title={data.title} description={data.description} />

        <Card style={styles.card}>
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={wifiQR}
              size={rs(180)}
              color='#10141D'
              backgroundColor={'white'}
              logo={require('@assets/images/icon.png')}
              logoSize={rs(30)}
              logoBorderRadius={100}
              logoBackgroundColor={Colors.background.primary}
            />
          </View>
          <View style={styles.cardTextContainer}>
            <Text font={Fonts.MEDIUM} style={styles.credentialLabel}>
              {data.ssidPlaceholder}
            </Text>
            <Text style={styles.credentialValue}>{data.ssid}</Text>
          </View>
          {data.password && (
            <View style={styles.cardTextContainer}>
              <Text font={Fonts.MEDIUM} style={styles.credentialLabel}>
                {data.passwordPlaceholder}
              </Text>
              <Text style={styles.credentialValue}>{data.password}</Text>
            </View>
          )}
        </Card>
      </View>
    </LoadingState>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    gap: rs(32),
    margin: rs(24),
  },

  qrCodeContainer: {
    padding: rs(11),
    borderRadius: rs(16),
    backgroundColor: '#fff',
    marginTop: rs(24),
  },

  cardTextContainer: {
    gap: rs(8),
    alignItems: 'center',
  },

  credentialLabel: {
    fontSize: rs(22),
    color: Colors.text.primary,
  },

  credentialValue: {
    fontSize: rs(18),
    color: Colors.text.tertiary,
  },
});
