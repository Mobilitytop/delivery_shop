import React from 'react';
import Delivery from '../../lib/components/Delivery';
import {ScrollView} from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView>
      <Delivery
        postConfig={{
          accessToken: 'AccessToken NemOKgN0Rksq0cot79ix294S7IBSzIa5',
          basicToken: 'Basic c2FsZXNAbW9iaWxpdHkudG9wOlZPelZpVGRM',
          request: {
            'entries-type': 'OTHER',
            'index-from': '198097',
            'index-to': '196084',
            inventory: false,
            'mail-category': 'ORDINARY',
            'mail-type': 'ONLINE_PARCEL',
            mass: 1000,
            'notice-payment-method': 'CASHLESS',
            'payment-method': 'CASHLESS',
            'transport-type': 'EXPRESS',
          },
        }}
      />
    </ScrollView>
  );
};

export default HomeScreen;
