import Delivery from 'delivery-shop';

export default function App() {
  return (
    <Delivery
      postConfig={{
        accessToken: 'AccessToken NemOKgN0Rksq0cot79ix294S7IBSzIa5',
        basicToken: 'Basic c2FsZXNAbW9iaWxpdHkudG9wOlZPelZpVGRM',
        request: {
          'entries-type': 'OTHER',
          'inventory': false,
          'mail-category': 'ORDINARY',
          'mail-type': 'ONLINE_PARCEL',
          'mass': 1000,
          'notice-payment-method': 'CASHLESS',
          'payment-method': 'CASHLESS',
          'transport-type': 'EXPRESS',
        },
      }}
    />
  );
}
