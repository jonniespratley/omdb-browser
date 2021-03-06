/**
 * @description I handle making a request using XHR to the API endpoint.
 * @param {String} url Endpoint url to request.
 * @param {Object} params Query parameters to send with request.
 * @returns {Promise} A promise that resolves JSON data on success.
 */
export function xhrRequest(url, params) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        try {
          let json = JSON.parse(this.responseText);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      }
    });
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send({});
  });
}
/**
 * @description I handle making a request using fetch to the API endpoint.
 * @param {String} url Endpoint url to request.
 * @returns {Promise} A promise that resolves JSON data on success.
 */
export function fetchRequest(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.json();
    })
    .then(json => json);
}


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
   * @param {String} apikey Your OMDB API Key
   */
  constructor(apikey) {
    if (!apikey) {
      throw new Error("Must Provide API Key!");
    }
    this.baseUrl = `http://www.omdbapi.com?apikey=${apikey}`;
    this.cache = new Map();
  }

  /**
   * @description I handle making a request to the API endpoint.
   * @param {Object} params Query parameters to send with request.
   * @returns {Promise} A promise that resolves JSON data on success.
   */
  request(params) {
    const url = `${this.baseUrl}&${new URLSearchParams(params).toString()}`;
    if (this.cache.has(url)) {
      return Promise.resolve(this.cache.get(url));
    }
    return fetchRequest(url).then(resp => {
      this.cache.set(url, resp);
      return resp;
    });
  }
  /**
   * @description I search search for movies based on query.
   * @param {String} s A movie search query.
   * @returns {Promise} A promise that resolves with movies on success.
   */
  getMovies(s) {
    return this.request({
      s
    });
  }
  /**
   * @description I fetch movie details.
   * @param {String} i The movie id.
   * @returns {Promise} A promise that resolves with a movie on success.
   */
  getMovie(i) {
    return this.request({
      i
    });
  }
}