import DeliveryShop from 'delivery-shop';
import { useMemo } from 'react';
import { ScrollView } from 'react-native';

const {DeliveryMethodId, DeliverySelector} = DeliveryShop;

export default function App() {
  const postConfig = useMemo(
    () => ({
      accessToken: '',
      basicToken: '',
      request: {
        'mail-category': 'ORDINARY' as const,
        'mail-type': 'ONLINE_PARCEL' as const,
        'mass': 1000,
      },
    }),
    []
  );
  const CDEKConfig = useMemo(
    () => ({
      account: '',
      password: '',
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
    }),
    []
  );

  return (
    <ScrollView style={{paddingHorizontal:15, paddingTop:50}}>
      <DeliverySelector
        deliveryMethods={[
          {
            method: DeliveryMethodId.POST,
            data: {
              fromIndex: '101000',
              toIndex: '150001',
            },
          },
          {
            method: DeliveryMethodId.CDEK_POINT,
            data: {
              fromAddress: 'Москва, ул. Пушкина, д. 10',
              toAddress: 'Ярославль, ул. Мельничная, д. 97',
              fromCoordinates: { longitude: 37.6173, latitude: 55.7558 },
              toCoordinates: { longitude: 30.3158, latitude: 59.9343 },
            },
          },
          {
            method: DeliveryMethodId.CDEK_DOOR,
            data: {
              fromAddress: 'Москва, ул. Пушкина, д. 10',
              toAddress: 'Ярославль, ул. Мельничная, д. 97',
              fromCoordinates: { longitude: 37.6173, latitude: 55.7558 },
              toCoordinates: { longitude: 30.3158, latitude: 59.9343 },
            },
          },
          {
            method: DeliveryMethodId.LPOST_COURIER,
            data: {
              fromWarehouseId: 6412, 
              latitude: 55.755241, 
              longitude: 37.617779, 
            },
          },
          {
            method: DeliveryMethodId.LPOST_POINT,
            data: {
              fromWarehouseId: 6412, 
              toPickupPointId: 3855,
              latitude: 55.755241, 
              longitude: 37.617779, 
            },
          },
        ]}
        packages={[
          {
            weight: 500, // 500 г
            length: 20, // 20 см
            width: 15, // 15 см
            height: 10, // 10 см
          },
        ]}
        customOptions={[
          {
            id: 'custom',
            title: 'Самовывоз',
            cost: 0,
            duration: 'Сегодня',
          },
        ]}
        lpostConfig={{
          secret: '', // Секрет партнера от Л-Пост
        }}
        postConfig={postConfig}
        cdekConfig={CDEKConfig}
        onSelect={(option) => console.log('Selected:', option)}
        onLoadComplete={(options) => console.log('Loaded:', options)}
        onError={(error) => console.error('Error:', error)}
        initialSelectedId={DeliveryMethodId.POST}
        colors={{
          primary: '#33AA00',
        }}
      />
    </ScrollView>
  );
}
