import { extendTheme } from '@chakra-ui/react';

const colors = {
  brands: {
    facebook: '#1877f2',
    google: '#ea4335',
    github: '#c9510c',
  },
  vdv: {
    main: '#e4ebed',
    black: '#191a21',
    green: '#1c5738',
    'light-green': '#8f9f5a',
  },
};

export const theme = extendTheme({ colors });
