import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [
    { url: '/offline.html', revision: null },
  ],
  disable: process.env.NODE_ENV === 'development',
  cacheOnNavigation: true,
  reloadOnOnline: true,
});

/** @type {import('next').NextConfig} */  
const baseConfig: import('next').NextConfig = {

  images: {
    unoptimized: true,  
  },
};

export default withSerwist(baseConfig);