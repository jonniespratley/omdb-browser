/**
 * @description I handle making a request using XHR to the API endpoint.
 * @param url {String} Endpoint url to request.
 * @param params {Object} Query parameters to send with request.
 * @returns {Promise} A promise that resolves JSON data on success.
 */
export function xhrRequest(url, params) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        try {
          let json = JSON.parse(this.responseText);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      }
    });
    xhr.open("GET", `${url}${new URLSearchParams(params).toString()}`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send({});
  });
}
/**
 * @description I handle making a request using fetch to the API endpoint.
 * @param url {String} Endpoint url to request.
 * @param params {Object} Query parameters to send with request.
 * @returns {Promise} A promise that resolves JSON data on success.
 */
export function fetchRequest(url, params) {
  return fetch(new Request(`${url}&${new URLSearchParams(params).toString()}`))
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
      return fetchRequest(this.baseUrl, params);
    } else {
      return xhrRequest(this.baseUrl, params);
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
