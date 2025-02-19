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
      />
    </ScrollView>
  );
}
