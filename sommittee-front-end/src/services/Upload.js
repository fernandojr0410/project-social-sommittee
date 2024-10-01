import Http from "./Http";

class UploadService extends Http {
  constructor() {
    super("/upload");
  }

  async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await this.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.url) {
      return response.url;
    } else {
      throw new Error("A URL da imagem não foi encontrada na resposta.");
    }
  }
}

export default UploadService;
