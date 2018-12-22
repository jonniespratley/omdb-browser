import Base from "./Base";
import OMDBList from "./OMDBList";
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
   * @param {Event} e The event from the input.
   */
  handleSearch(e){
    if(e.target.value !== ''){
      this.fetchMovies(e.target.value);
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

  createMovieFrag(movie) {
    const li = document.createElement('li');
    li.className = 'omdb-list-item';
    li.dataset.id = movie.imdbID;
    li.innerHTML = `
      <img class="omdb-list-item__media" src="${movie.Poster}" alt="${movie.Title} Poster"/>
      <span class="omdb-list-item__title">${movie.Title}</span>
      <span class="omdb-list-item__type">${movie.Type}</span>
      <dl class="omdb-list-item__details">
        <dt>Type:</dt>
        <dd>${movie.Type}</dd>
        <dt>Year:</dt>
        <dd>${movie.Year}</dd>
        <dt>Director:</dt>
        <dd>${movie.Director}</dd>
        <dt>Ratings</dt>
        <dd>${movie.Ratings && movie.Ratings.map(r => (`${r.Source}`)).join('')}</dd>
      </dl>
    `;
    return li;
  }

  renderMovies(movies){
    this.moviesList = new OMDBList();
    //this.moviesList = new OMDBList();
    this.moviesList.render(movies);
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
    this.searchInput = this.ref.querySelector(".omdb-search-input");
    this.searchInput.addEventListener(
      "keyup",
      this.debounce(this.handleSearch.bind(this), 500)
    );
  }
}
