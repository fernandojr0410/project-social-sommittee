import axios from "axios";
import { decrypt } from "@/utils/cryptoUtils";

axios.interceptors.response.use((response) => {
  const decryptIdentifier = (data) => {
    if (Array.isArray(data)) {
      return data.map(decryptIdentifier);
    }

    if (data !== null && typeof data === "object") {
      const newData = { ...data };

      if ("identifier" in newData && newData.identifier) {
        newData.identifier = decrypt(newData.identifier);
      }

      Object.keys(newData).forEach((key) => {
        if (typeof newData[key] === "object" && newData[key] !== null) {
          newData[key] = decryptIdentifier(newData[key]);
        }
      });

      return newData;
    }

    return data;
  };

  response.data = decryptIdentifier(response.data);
  return response;
});
(error) => {
  if (error.response && error.response.data.type === "expires_token") {
    store.dispatch("auth/setSessionExpired", true);
  }
  return Promise.reject(error);
};

export default axios;
