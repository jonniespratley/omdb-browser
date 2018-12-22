import Base from "./Base";

export default class OMDBList extends Base {
  constructor(selector = ".omdb-list", props) {
    super(selector, props);
    this.state = {
      movies: []
    };
  }
  beforeRender() {
    console.log("Fetch movies");
  }
  render() {
    console.log("Render List");
    return `
    Movies
    `;
  }
}
