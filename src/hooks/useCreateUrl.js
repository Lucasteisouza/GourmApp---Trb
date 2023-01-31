import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * @returns {Array} [url, setEndPoint, setUrl]
 * @param {object} url {baseUrl, endPoint}
 * @param {string} url.baseUrl
 * @param {string} url.endPoint
 * @param {function} setEndPoint
 * @param {function} setUrl
 * @param {URL} fullUrl
 * @param {function} setFullUrl
 * @description Hook para criar uma URL para fazer o fetch. A url muda de acordo com o path da página.
 * @example const [url, setEndPoint, setUrl] = useCreateUrl();
*/
export default function useCreateUrl(endPoint) {
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];
  const [url, setUrl] = useState({
    baseUrl: pathname === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/',
    endPoint,
  });
  const [fullUrl, setFullUrl] = useState(`${url.baseUrl}${url.endPoint}`);

  const setEndPoint = (end) => {
    setUrl({ ...url, endPoint: end });
    setFullUrl(`${url.baseUrl}${end}`);
  };

  const updateUrl = (newUrl) => {
    setUrl(newUrl);
    setFullUrl(`${newUrl.baseUrl}${newUrl.endPoint}`);
  };

  return useMemo(
    () => ([url, setEndPoint, fullUrl, updateUrl, setFullUrl]),
    [url, fullUrl, endPoint],
  );
}
