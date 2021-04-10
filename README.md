# Experiment with redux@alpha ⚗️

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: GPL--3.0](https://img.shields.io/badge/License-GPL--3.0-yellow.svg)](./LICENSE)
[![HitCount](https://hits.dwyl.com/leosuncin/congenial-broccoli.svg)](https://hits.dwyl.com/leosuncin/congenial-broccoli)
[![Twitter: jl_suncin](https://img.shields.io/twitter/follow/jl_suncin.svg?style=social)](https://twitter.com/jl_suncin)

Goal: see if @reduxjs/toolkit@1.6.0-alpha.0 & redux@4.1.0-alpha.0 works well with different bundlers

Bundlers tested:

- Create React App
- Snowpack
- Vite
- Next (with Webpack 5)

Bundlers come with the default settings with React and Typescript

## Install

```sh
npm install
npm install --prefix with-cra
npm install --prefix with-snowpack
npm install --prefix with-vite
npm install --prefix with-next
```

## Usage

**Create React App**

```sh
npm start --prefix with-cra
```

**Snowpack**

```sh
npm start --prefix with-snowpack
```

**Vite**

```sh
npm run dev --prefix with-vite
```

**Next**

```sh
npm run dev --prefix with-next
```

## Run unit tests

```sh
npm test --prefix with-cra
npm test --prefix with-snowpack
npm test --prefix with-vite
npm test --prefix with-next
```

## Run E2E tests

End-to-end tests are written with [CodeceptJS](https://codecept.io/) and Playwright.

**Run**

```sh
npm run codeceptjs:headless
```

**Modify**

You can set the next environment variables to change the config of the test runner without need to modify [codecept.conf.js](codecept.conf.js) directly.

| Environmental variable | Description                       | Default value    |
| ---------------------- | --------------------------------- | ---------------- |
| HEADLESS               | Show browser window.              | false            |
| BROWSER                | The browser to test on.           | firefox          |
| BASE_URL               | Base URL of website to be tested. | http://localhost |

## TODO

- [x] Add more unit tests
- [ ] Use an API to make request

## Author

👤 **Jaime Leonardo Suncin Cruz <leosuncin@gmail.com>**

- Twitter: [@jl_suncin](https://twitter.com/jl_suncin)
- Github: [@leosuncin](https://github.com/leosuncin)
- LinkedIn: [@jaimesuncin](https://linkedin.com/in/jaimesuncin)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/leosuncin/congenial-broccoli/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Jaime Leonardo Suncin Cruz <leosuncin@gmail.com>](https://github.com/leosuncin).

This project is [GPL--3.0](./LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
