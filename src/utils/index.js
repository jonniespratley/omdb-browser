export function debounce(fn, ms = 0) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

/**
 * @description I take an object and serialize it.
 * @param obj {Object} A key-value object to serialize.
 * @returns {String} A URL safe query string.
 */
export function serialize(obj) {
  const str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

/**
 * @description I handle making a request using XHR to the API endpoint.
 * @param url {String} Endpoint url to request.
 * @param params {Object} Query parameters to send with request.
 * @returns {Promise} A promise that resolves JSON data on success.
 */
export function xhr(url, params) {
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
    xhr.open("GET", `${url}${serialize(params)}`);
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
export function fetch(url, params) {
  return fetch(new Request(`${url}&${serialize(params)}`))
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.json();
    })
    .then(json => json);
}
