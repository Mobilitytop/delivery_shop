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
        accessToken: 'AccessToken ...',
        basicToken: 'Basic ...',
        request: {
        'mail-category': 'ORDINARY',
        'mail-type': 'ONLINE_PARCEL',
        'mass': 1000,
        },
    }}
/>
```

## Props

#### `postConfig` (required)

propType: `any`
default: `{accessToken: 'AccessToken ...', basicToken: 'Basic ...', request: {...}}`

Specify the access Token, basic Token and request parameters for calculating the cost of Post delivery. https://otpravka.pochta.ru/new/specification#/nogroup-rate_calculate

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
