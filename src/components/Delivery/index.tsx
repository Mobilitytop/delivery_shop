import {StyleSheetProperties, Text, TouchableOpacity, View} from 'react-native';
import defaultStyles from './styles';
import {useState} from 'react';

type DeliveryProps = {
  config: {};
  styles?: {
    container: StyleSheetProperties;
    item: StyleSheetProperties;
    itemInner: StyleSheetProperties;
    checkbox: StyleSheetProperties;
    checkboxActive: StyleSheetProperties;
    itemContainer: StyleSheetProperties;
    title: StyleSheetProperties;
    description: StyleSheetProperties;
  };
};

const deliveries = [
  {
    id: 1,
    title: 'Доставка курьером по Москве внутри МКАД?',
    description: '2 500 руб.',
  },
  {id: 2, title: 'СДЭК-экспресс (Экспресс до двери)'},
  {id: 3, title: 'СДЭК-экспресс (Экспресс до пункта выдачи)'},
  {
    id: 4,
    title: 'Почта России (Доставка в отделение)',
    description: 'Самовывоз из отделения Почты России',
  },
];

const Delivery: React.FC<DeliveryProps> = ({config, styles}) => {
  const [active, setActive] = useState(0);
  const onPress = (id: number) => {
    setActive(id);
  };

  return (
    <View style={{...defaultStyles.container, ...styles?.container}}>
      {deliveries?.map(el => (
        <TouchableOpacity
          onPress={() => {
            onPress(el.id);
          }}
          style={{
            ...defaultStyles.item,
            ...styles?.item,
          }}>
          <View
            style={{
              ...defaultStyles.itemInner,
              ...styles?.itemInner,
            }}>
            <View
              style={{
                ...defaultStyles.itemContainer,
                ...styles?.itemContainer,
              }}>
              <Text
                style={{
                  ...defaultStyles.title,
                  ...styles?.title,
                }}>
                {el.title}
              </Text>
              {el.description && (
                <Text
                  style={{
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}>
                  {el.description}
                </Text>
              )}
            </View>
            <View
              style={{
                ...defaultStyles.checkbox,
                ...styles?.checkbox,
                backgroundColor: active === el.id ? '#F93D00' : undefined,
              }}>
              {active === el.id && (
                <View
                  style={{
                    ...defaultStyles.checkboxActive,
                    ...styles?.checkboxActive,
                  }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Delivery;
