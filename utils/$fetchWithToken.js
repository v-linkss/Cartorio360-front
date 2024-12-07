// utils/fetchWithToken.js
export const $fetchWithToken = async (url, options = {}) => {
    const tokenCookie = useCookie('auth_token');
    const token = tokenCookie.value;
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    
    return await $fetch(url, {
      ...options,
      headers,
    });
  };
  