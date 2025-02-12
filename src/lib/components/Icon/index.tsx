import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Icon: React.FC<IconProps> = ({name, size, color}) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

export default Icon;
