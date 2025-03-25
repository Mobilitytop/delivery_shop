"use strict";

import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import defaultStyles from "./styles.js";
import useApp from "../../hooks/useApp.js";
import { deliveriesData } from "../DeliveryMethod/data.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const CurrentDeliveryMethod = ({
  rate,
  styles,
  activeDeliveryMethod,
  formData,
  onEdit
}) => {
  const {
    isDarkMode
  } = useApp();
  const currentDelivery = useMemo(() => {
    return deliveriesData.find(el => el.id === activeDeliveryMethod);
  }, [activeDeliveryMethod]);
  return /*#__PURE__*/_jsx(View, {
    style: {
      ...defaultStyles.container,
      ...styles?.container
    },
    children: /*#__PURE__*/_jsx(View, {
      style: {
        ...defaultStyles.item,
        ...styles?.item
      },
      children: /*#__PURE__*/_jsx(View, {
        style: {
          ...defaultStyles.itemInner,
          ...styles?.itemInner
        },
        children: /*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.itemContainer,
            ...styles?.itemContainer
          },
          children: [/*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.header,
              ...styles?.header
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.title,
                ...styles?.title
              },
              children: currentDelivery?.title
            }), /*#__PURE__*/_jsx(TouchableOpacity, {
              style: {
                ...defaultStyles.edit,
                ...styles?.edit
              },
              onPress: onEdit,
              children: /*#__PURE__*/_jsx(Text, {
                style: {
                  color: isDarkMode ? '#fff' : '#000',
                  ...defaultStyles.editText,
                  ...styles?.editText
                },
                children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"
              })
            })]
          }), !!currentDelivery?.description && /*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.description,
              ...styles?.description
            },
            children: currentDelivery.description
          }), formData.pickupPoint && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u041F\u0443\u043D\u043A\u0442 \u0421\u0414\u0415\u041A"
            }), /*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: formData.pickupPoint?.name
            })]
          }), !!formData.address && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u0410\u0434\u0440\u0435\u0441"
            }), /*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: formData.address
            })]
          }), !!formData.flat && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
            }), /*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: formData.flat
            })]
          }), !!formData.entrance && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u041F\u043E\u0434\u044A\u0435\u0437\u0434"
            }), /*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: formData.entrance
            })]
          }), !!formData.floor && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u042D\u0442\u0430\u0436"
            }), /*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: formData.floor
            })]
          }), !!formData.intercom && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u0414\u043E\u043C\u043E\u0444\u043E\u043D"
            }), /*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: formData.intercom
            })]
          }), !!formData.index && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u0418\u043D\u0434\u0435\u043A\u0441"
            }), /*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: formData.index
            })]
          }), !!formData.comment && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"
            }), /*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: formData.comment
            })]
          }), !!rate && /*#__PURE__*/_jsxs(View, {
            style: {
              ...defaultStyles.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/_jsx(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
            }), /*#__PURE__*/_jsxs(Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.description,
                ...styles?.description
              },
              children: [rate, " \u0440\u0443\u0431."]
            })]
          })]
        })
      })
    })
  });
};
export default CurrentDeliveryMethod;
//# sourceMappingURL=index.js.map