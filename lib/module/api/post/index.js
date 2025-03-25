"use strict";

export const fetchPostTariff = ({
  accessToken,
  basicToken,
  body
}) => {
  return fetch('https://otpravka-api.pochta.ru/1.0/tariff', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
      'X-User-Authorization': basicToken
    },
    body: JSON.stringify(body)
  }).then(response => response.json()).catch(error => console.error(error));
};
//# sourceMappingURL=index.js.map