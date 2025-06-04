import { StyleProp, StyleSheet, View } from 'react-native';

import { ImageStyle } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';

import { rs } from '@utils/scaling';

export default function VideoPlayer({ uri, style }: { uri: string; style: StyleProp<ImageStyle> }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.wrap}>
      <VideoView style={[styles.v, style]} player={player} allowsFullscreen />
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { width: '100%', height: rs(300) }, v: { width: '100%', height: '100%' } });
