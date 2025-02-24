# delivery-shop

A library for integrating the Post and Cdek delivery API

## Installation

```sh
npm install https://github.com/Mobilitytop/delivery_shop.git
```

## Usage


```js
import { DeliveryShopView } from "delivery-shop";

// ...

<Delivery
  postConfig={{
    accessToken: 'AccessToken NemOKgN0Rksq0cot79ix294S7IBSzIa5',
    basicToken: 'Basic c2FsZXNAbW9iaWxpdHkudG9wOlZPelZpVGRM',
    request: {
      'mail-category': 'ORDINARY',
      'mail-type': 'ONLINE_PARCEL',
      'mass': 1000,
    },
  }}
  CDEKConfig={{
    account: 'wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP',
    password: 'RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5',
    url_base: 'https://api.edu.cdek.ru/v2',
    request: {
      from_location: {
        code: 44,
      },
      packages: [
        {
          weight: 1000,
        },
      ],
    },
  }}
/>
```

## Props

#### `postConfig` (required)

propType: `any`

default: `{accessToken: 'AccessToken ...', basicToken: 'Basic ...', request: {...}}`

Specify the access Token, basic Token and request parameters for calculating the cost of Post delivery. The values mail-category, 'mail-type' and 'mass' are required in the request property. https://otpravka.pochta.ru/new/specification#/nogroup-rate_calculate


#### `CDEKConfig` (required)

propType: `any`

default: `{account: '...', password: '...', url_base: '...', request: {...}}`

Specify the account, password and request parameters for calculating the cost of CDEK delivery. The values {from_location: {code: number}, packages: [ {weight: number} ]} are required in the request property. https://apidoc.cdek.ru/


#### `deliveryMethods`

propType: `array`

An array of available shipping methods. If not passed, then all are used. Available values: 'courier', 'pickup', 'CDEK-door', 'CDEK-point', 'post'

#### `styles`

propType: `any`

Use this to pass or overwrite styling


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
