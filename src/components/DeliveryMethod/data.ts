import { DeliveryMethodId, Method } from './types';

export const deliveriesData: Method[] = [
  {
    id: DeliveryMethodId.COURIER,
    title: 'Доставка курьером по Москве внутри МКАД?',
    description: '2 500 руб.',
  },
  {
    id: DeliveryMethodId.PICKUP,
    title: 'Самовывоз',
    description: 'Бесплатно',
  },
  {
    id: DeliveryMethodId.CDEK_DOOR,
    title: 'СДЭК-экспресс (Экспресс до двери)',
  },
  {
    id: DeliveryMethodId.CDEK_POINT,
    title: 'СДЭК-экспресс (Экспресс до пункта выдачи)',
  },
  {
    id: DeliveryMethodId.POST,
    title: 'Почта России (Доставка в отделение)',
    description: 'Самовывоз из отделения Почты России',
  },
];
