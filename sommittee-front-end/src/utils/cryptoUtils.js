import CryptoJS from "crypto-js";

const passphrase = "my_super_secret_key";

const key = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(passphrase).toString());

export function decrypt(encryptedText) {
  if (!encryptedText) return "";

  const [ivHex, encryptedHex] = encryptedText.split(":");
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);

  const decrypted = CryptoJS.AES.decrypt({ ciphertext: encrypted }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
