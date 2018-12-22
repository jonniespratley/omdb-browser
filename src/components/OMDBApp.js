import Base from "./Base";
import OMDBSearchInput from "./OMDBSearchInput";
import OMDBList from "./OMDBList";
import OMDBService from "../services/OMDBService";

export default class OMDBApp extends Base {
  constructor(selector = ".omdb-app", props) {
    super(selector, props);

    this.searchInput = new OMDBSearchInput();
    this.searchInput.onSearch = this.fetchMovies.bind(this);
  }

  fetchMovies(s) {
    console.log("Fetch movies", s);
    // this.api.getMovies(s);
    //this.list = new OMDBList();
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
    this.fetchMovies();
  }
}
