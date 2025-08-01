import { e as useCookie } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';

const fetchWithToken = async (url, options = {}) => {
  const tokenCookie = useCookie("auth_token");
  const token = tokenCookie.value;
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`
  };
  return await useFetch(url, {
    ...options,
    headers
  }, "$xCdwQCU31G");
};
const $fetchWithToken = async (url, options = {}) => {
  const tokenCookie = useCookie("auth_token");
  const token = tokenCookie.value;
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`
  };
  return await $fetch(url, {
    ...options,
    headers
  });
};

export { $fetchWithToken as $, fetchWithToken as f };
//# sourceMappingURL=fetchWithToken-Cjtduyn0.mjs.map
