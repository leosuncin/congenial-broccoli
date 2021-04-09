require('ts-node/register');
const { cleanEnv, str, bool, url } = require('envalid');

const env = cleanEnv(process.env, {
  HEADLESS: bool({
    default: false,
    desc: 'hide browser window.',
    example: 'true',
  }),
  BROWSER: str({
    choices: ['chromium', 'firefox', 'webkit'],
    default: 'firefox',
    desc: 'a browser to test on',
    example: 'chromium',
  }),
  BASE_URL: url({
    default: 'http://localhost:3000',
    desc: 'base url of website to be tested',
    example: 'http://localhost',
  }),
});

exports.config = {
  tests: './e2e/tests/*.test.ts',
  output: './e2e/output',
  helpers: {
    Playwright: {
      url: env.BASE_URL,
      show: !env.HEADLESS,
      windowSize: '1200x900',
      browser: env.BROWSER,
    },
  },
  include: {
    I: './e2e/steps-file.ts',
  },
  mocha: {},
  name: 'congenial-broccoli',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
