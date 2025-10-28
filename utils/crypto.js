import CryptoJS from "crypto-js";

const config = useRuntimeConfig();
const SECRET_KEY = config.public.docEditor; // ideal guardar via .env

export const encryptData = (data) => {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (e) {
    console.error("Erro ao descriptografar", e);
    return null;
  }
};
