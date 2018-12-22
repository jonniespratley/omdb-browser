import OMDBApp from "./components/OMDBApp";
import "./styles/main.scss";

(() => {
  let app = new OMDBApp("#app");
  window.app = app;
  console.log(app);
})();
