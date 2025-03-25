import DeliveryShop from 'delivery-shop';
import { ScrollView } from 'react-native';

export default function App() {
  const postConfig = {
    accessToken: 'your access token',
    basicToken: 'yout basic token',
    request: {
      'mail-category': 'ORDINARY' as const,
      'mail-type': 'ONLINE_PARCEL' as const,
      'mass': 1000,
    },
  };

  const CDEKConfig = {
    account: 'your_account',
    password: 'your_password',
    url_base: 'https://api.cdek.ru/v2' as const,
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
  };

  return (
    <ScrollView>
      <DeliveryShop.DeliveryWidget
        address="г. Москва, Пушкина 1"
        index="150022"
        postConfig={postConfig}
        CDEKConfig={CDEKConfig}
        customOptions={[
          {
            id: 'custom',
            title: 'Custom',
            cost: 0,
            duration: 'Сегодня',
          },
        ]}
      />
    </ScrollView>
  );
}
