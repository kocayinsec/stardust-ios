import React, { createContext, useContext, useMemo } from 'react';
import { Platform } from 'react-native';

export const fontAssets = {
  CormorantGaramond_600SemiBold: require('../../assets/fonts/CormorantGaramond-SemiBold.ttf'),
};

export const fonts = {
  title: 'CormorantGaramond_600SemiBold',
  titleFallback: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }),
  body: Platform.select({
    ios: 'System',
    android: 'System',
    default: 'System',
  }),
};

const createTypography = (fontsLoaded = false) => {
  const titleFamily = fontsLoaded ? fonts.title : fonts.titleFallback;

  return {
    title: {
      fontFamily: titleFamily,
      letterSpacing: 0.6,
    },
    display: {
      fontFamily: titleFamily,
      letterSpacing: 1.2,
    },
    subtitle: {
      fontFamily: fonts.body,
      letterSpacing: 0.8,
    },
    label: {
      fontFamily: fonts.body,
      letterSpacing: 1.6,
    },
    button: {
      fontFamily: fonts.body,
      letterSpacing: 1,
    },
    body: {
      fontFamily: fonts.body,
    },
  };
};

const TypographyContext = createContext(createTypography(false));

export const TypographyProvider = ({ fontsLoaded = false, children }) => {
  const value = useMemo(() => createTypography(fontsLoaded), [fontsLoaded]);

  return (
    <TypographyContext.Provider value={value}>
      {children}
    </TypographyContext.Provider>
  );
};

export const useTypography = () => useContext(TypographyContext);

export const defaultTypography = createTypography(false);
