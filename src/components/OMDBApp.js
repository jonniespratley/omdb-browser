import Base from "./Base";
import OMDBService from "../services/OMDBService";

//API service
const api = new OMDBService("aba065d3");

export default class OMDBApp extends Base {
  constructor(selector = ".omdb-app", props) {
    super(selector, props);
  }

  /**
   * @description I handle debouncing a function.
   * @param {Function} fn A function to debounce.
   * @param {Number} ms The time in ms to debounce.
   * @returns {Function}
   */
  debounce(fn, ms = 0) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  /**
   * @description I handle the event from the search input.
   * @param {Event} e The event.
   */
  handleSearch(e) {
    if (e.target.value !== '') {
      this.fetchMovies(e.target.value);
    }
  }

  /**
   * @description I handle the event from the mouse over.
   * @param {Event} e The event.
   */
  handleMouseover(e) {
    const id = e.target.dataset.id;
    if (e.target.className.includes("title") && !api.cache.has(id)) {
      const detailsElement = e.target.offsetParent.querySelector('dl');
      detailsElement.innerHTML = '';
      api.getMovie(id).then(resp => {
        detailsElement.appendChild(this.createMovieDetailsFrag(resp))
      });
    }
  }

  /**
   * @description I query movies from the API.
   * @param {String} s The query string to search for. 
   */
  fetchMovies(s) {
    api
      .getMovies(s)
      .then(resp => {
        this.renderMovies(resp.Search);
      })
      .catch(err => {
        console.error("fetchMovies.error", err);
      });
  }

  /**
   * @description I handle creating a movie fragment.
   * @param {Object} movie A movie object.
   */
  createMovieFrag(movie) {
    const li = document.createElement('li');
    li.className = 'omdb-list-item';
    li.innerHTML = `
      <img class="omdb-list-item__media" src="${movie.Poster}" alt="${movie.Title} Poster"/>
      <span class="omdb-list-item__title" data-id="${movie.imdbID}">${movie.Title}</span>
      <span class="omdb-list-item__type">${movie.Type}</span>
      <dl class="omdb-list-item__details"></dl>
    `;
    return li;
  }

  /**
   * @description I handle creating a movie details fragment.
   * @param {Object} movie A movie object.
   */
  createMovieDetailsFrag(movie){
    const fragment = document.createElement('dl');
    fragment.dataset.id = movie.imdbID;
    fragment.innerHTML = `
      <dt>Type:</dt>
      <dd>${movie.Type}</dd>
      <dt>Year:</dt>
      <dd>${movie.Year}</dd>
      <dt>Director:</dt>
      <dd>${movie.Director}</dd>
      <dt>Ratings:</dt>
      <dd>${movie.Ratings.map(r => (`${r.Source} (${r.Value})`)).join('\n')}</dd>
    `;
    return fragment;
  }

  /**
   * @description I handle rendering the movies.
   * @param {Array} movies An array of movies to render.
   */
  renderMovies(movies) {
    if (!movies) {
      return;
    }
    this.$omdbList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    movies.forEach(movie => {
      fragment.appendChild(this.createMovieFrag(movie));
    });
    this.$omdbList.appendChild(fragment);
  }

  render() {
    return `
      <article class="omdb-app">
        <header class="omdb-header">
          <input type="search" class="omdb-search-input" placeholder="Search..."/>
        </header>
        <section class="omdb-content">
          <ul class="omdb-list"></ul>
        </section>
      </article>
    `;
  }

  afterRender() {
    this.$omdbList = this.ref.querySelector(".omdb-list");
    this.$omdbList.addEventListener("mouseover", this.handleMouseover.bind(this));
    this.$omdbSearchInput = this.ref.querySelector(".omdb-search-input");
    this.$omdbSearchInput.addEventListener(
      "keyup",
      this.debounce(this.handleSearch.bind(this), 500)
    );
  }
}