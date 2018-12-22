import Base from "./components/Base";
import OMDBApp from "./components/OMDBApp";

export default class App {
  constructor(el) {
    this.el = el;
    this.app = new OMDBApp();
    this.el.innerHTML = this.app.render();
  }
}
