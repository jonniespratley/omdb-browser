import { xhr, fetch } from "../utils/index";

/**
 * @class OMDBService
 * @description Service class for accessing OMDB.
 * @example
 * const api = new OMDBService('aba065d3');
 * api.getMovies('christmas').then(data => console.log(data));
 */
export default class OMDBService {
  /**
   * @constructor
   * @param apikey {String} Your OMDB API Key
   */
  constructor(apikey) {
    if (!apikey) {
      throw new Error("Must Provide API Key!");
    }
    this.baseUrl = `http://www.omdbapi.com?apikey=${apikey}`;
  }

  /**
   * @description I handle making a request to the API endpoint.
   * @param params {Object} Query parameters to send with request.
   * @returns {Promise} A promise that resolves JSON data on success.
   */
  request(params) {
    if ("fetch" in window) {
      console.log("Using fetch");
      return fetch(this.baseUrl, params);
    } else {
      return xhr(this.baseUrl, params);
    }
  }
  /**
   * @description I search search for movies based on query.
   * @param s {String} A movie search query.
   * @returns {Promise} A promise that resolves with movies on success.
   */
  getMovies(s) {
    console.log("getMovies", s);
    return this.request({
      s
    });
  }
  /**
   * @description I fetch movie details.
   * @param i {String} The movie id.
   * @returns {Promise} A promise that resolves with a movie on success.
   */
  getMovie(i) {
    console.log("getMovie", i);
    return this.request({
      i
    });
  }
}
