import CryptoJS from "crypto-js";

const config = useRuntimeConfig();
const SECRET_KEY = config.public.docEditor; // ideal guardar via .env

export const encryptData = (data) => {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
};
