import axios from "axios";

class StorageService {
  async updateAvatar(imageUrl) {
    const token = localStorage.getItem("@sommittee.access_token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.patch(
        "/users/auth/avatar",
        { url: imageUrl },
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar avatar no backend:", error);
      throw error;
    }
  }
}

export default StorageService;
