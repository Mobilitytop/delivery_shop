import DeliveryShop from 'delivery-shop';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

const { DeliveryMethodId, DeliverySelector, DeliveryWidget, PickupPointSelector } = DeliveryShop;

export default function App() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const postConfig = useMemo(
    () => ({
      accessToken: '',
      basicToken: '',
      request: {
        'mail-category': 'ORDINARY' as const,
        'mail-type': 'ONLINE_PARCEL' as const,
        mass: 1000,
      },
    }),
    []
  );

  const cdekConfig = useMemo(
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

  const deliveryMethods = useMemo(
    () => [
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
          toIndex: '150001',
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
    ],
    []
  );

  const packages = useMemo(
    () => [
      {
        weight: 500, // 500 г
        length: 20, // 20 см
        width: 15, // 15 см
        height: 10, // 10 см
      },
    ],
    []
  );

  const customOptions = useMemo(
    () => [
      {
        id: 'custom',
        title: 'Самовывоз',
        cost: 0,
        duration: 'Сегодня',
      },
    ],
    []
  );

  const lpostConfig = useMemo(
    () => ({
      secret: '', // Секрет партнера от Л-Пост
    }),
    []
  );

  // Функция для обработки выбора метода доставки вручную
  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <ScrollView style={{ paddingHorizontal: 15, paddingTop: 50 }}>
      <DeliverySelector
        deliveryMethods={deliveryMethods}
        packages={packages}
        customOptions={customOptions}
        lpostConfig={lpostConfig}
        postConfig={postConfig}
        cdekConfig={cdekConfig}
        colors={{
          primary: '#33AA00',
        }}
        onSelect={(option)=>handleMethodSelect(option.id)}
      />
      {selectedMethod === DeliveryMethodId.CDEK_POINT && (
        <PickupPointSelector
          deliveryMethod={DeliveryMethodId.CDEK_POINT}
          cdekConfig={cdekConfig}
          toAddress={deliveryMethods.find((m) => m.method === DeliveryMethodId.CDEK_POINT)?.data.toAddress || ''}
          toIndex={'150001'} // Используем запасной индекс
          colors={{
            primary: '#33AA00',
            text: '#000',
            border: '#00000044',
          }}
          onSelect={(point) => console.log('Selected pickup point:', point)}
          onError={(error) => console.error('Pickup point error:', error)}
        />
      )}
    </ScrollView>
  );
}