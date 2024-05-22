import axios from "axios";


export class FavouritesApi {
  #baseUrl = ''
  #headers = {}
  #id = ''
  constructor(baseUrl, headers, id) {
    this.#baseUrl = baseUrl;
    this.#headers = headers
    this.#id = id;
  }

  async getFavourites() {
    return (await axios
      .get(this.#baseUrl)).data;
  }

  async updateFavourite(favourites) {
    try {
      const status = await axios.put(this.#baseUrl, favourites, {
        headers: this.#headers
      });
      if (status.error) {
        console.error(status.error);
        return false;
      }
      return true;
    } catch (e) {
      console.log('Update error happened. Resetting');
      console.error(e);
      return false;
    }
  }
}