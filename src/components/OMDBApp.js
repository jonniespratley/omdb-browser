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
   * @param fn {Function} A function to debounce.
   * @param ms {Number} The time in ms to debounce.
   * @returns {Function}
   */
  debounce(fn, ms = 0) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  fetchMovies(e) {
    const s = e.target.value;
    if (s !== "") {
      console.log("Fetch movies", this, s);
      api
        .getMovies(s)
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.error("fetchMovies", err);
        });
    }
  }

  render() {
    console.log("Render OMDBApp", this);
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
      this.debounce(this.fetchMovies.bind(this), 300)
    );
  }
}
