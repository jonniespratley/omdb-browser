import Base from "./Base";

export default class OMDBList extends Base {
  constructor(selector = ".omdb-list", props) {
    super(selector, props);
  }

  createMovieFrag(movie) {
    const li = document.createElement('li');
    li.className = 'omdb-list-item';
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

  render(movies) {
    if (!movies) {
      return;
    }
    const fragment = document.createDocumentFragment();
    movies.forEach(movie => {
      fragment.appendChild(this.createMovieFrag(movie));
    });
    this.ref.appendChild(fragment);
  }
}