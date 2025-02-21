import Delivery from 'delivery-shop';
import { ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView>
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
    </ScrollView>
  );
}
