import Base from "./Base";
import { debounce } from "../utils/index";

export default class OMDBSearchInput extends Base {
  constructor(selector = ".omdb-search-input", props) {
    super(selector, props);
  }
  handleSearch(e) {
    if (this.onSearch) {
      this.onSearch(e.target.value);
    }
  }
  afterRender() {
    this.ref.addEventListener(
      "keyup",
      debounce(this.handleSearch.bind(this), 300)
    );
  }
}
