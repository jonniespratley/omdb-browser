export default class Base {
  constructor(selector, props) {
    this.ref = selector ? document.querySelector(selector) : null;
    this.props = props;
    this.beforeRender();
    if (this.ref) {
      this.ref.innerHTML = this.render(props);
    }
    this.afterRender();
  }
  beforeRender() {}
  afterRender() {}
  render() {
    return `HTML`;
  }
}