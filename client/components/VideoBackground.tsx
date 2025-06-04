import { StyleSheet, View } from 'react-native';

import { useVideoPlayer, VideoView } from 'expo-video';

interface VideoBackgroundProps {
  children?: React.ReactNode;
  src: string;
}

export default function VideoBackground({ children, src }: VideoBackgroundProps) {
  const player = useVideoPlayer(src, (p) => {
    p.loop = true;
    p.volume = 1;
    p.play();
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <VideoView player={player} style={[StyleSheet.absoluteFill]} nativeControls={false} contentFit='cover' />
      {children}
    </View>
  );
}
