import { StyleSheet } from 'react-native';

import { calc, rs } from '@utils/scaling';
import { Colors } from '@constants/Colors';

export const commonStyles = StyleSheet.create({
  // Layout containers
  pageContainer: {
    gap: rs(36),
    paddingBottom: rs(48),
  },

  fullHeightContainer: {
    gap: rs(36),
    minHeight: '100%',
    position: 'relative',
  },

  // Header containers
  headerContainer: {
    width: '100%',
    gap: rs(12),
    marginTop: rs(8),
  },

  // Media containers
  mediaContainer: {
    width: '100%',
    gap: rs(16),
  },

  // Button layouts
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(24),
    margin: 0,
    justifyContent: 'space-between',
  },

  buttonGrid: {
    width: calc('50% - rs(64)'),
  },

  // Typography
  title: {
    fontSize: rs(24),
  },

  subtitle: {
    fontSize: rs(20),
  },

  description: {
    fontSize: rs(16),
    color: Colors.text.tertiary,
  },

  content: {
    fontSize: rs(16),
    flex: 1,
    lineHeight: rs(25),
  },

  // Media
  mediaImage: {
    width: '100%',
    height: rs(250),
    borderRadius: rs(12),
  },

  // Utilities
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },

  rounded: {
    borderRadius: rs(20),
  },

  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});
