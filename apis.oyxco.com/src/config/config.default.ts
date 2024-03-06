import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1709460539734_9578',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*'
  },
  jwt: {
    secret: '1709460539734_9578', // fs.readFileSync('xxxxx.key')
    sign: {
      // signOptions
      expiresIn: '2d', // https://github.com/vercel/ms
    },
    verify: {
      // verifyOptions
    },
    decode: {
      // decodeOptions
    }
  },
} as MidwayConfig;
