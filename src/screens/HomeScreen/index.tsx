import React from 'react';
import Delivery from '../../lib/components/Delivery';
import {ScrollView} from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView>
      <Delivery deliveryMethods={[]} />
    </ScrollView>
  );
};

export default HomeScreen;
