import { ENV } from "../utils";

export class Storage {
  baseApi = ENV.BASE_API;

  async register(data) {
    try {
      //TODO: pending backend endpoint
      console.log(data);
    } catch (exception) {
      console.error(
        "Hubo un error en la respuesta del servidor. Error: " + exception.msg
      );
      throw exception;
    }
  }

  async requestStoragePublication(accessToken, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.STORAGE_REQUEST}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          companyId: data.companyId,
          storageAddress: data.storageAddress,
          storage: data.email,
          password: data.password,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
