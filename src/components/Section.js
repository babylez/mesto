export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

  }

  renderItems() {
    //get arr and causes setItem
    this._items.forEach(el => this._renderer(el));
  }

  setItem(el) {
    //add item in container
    this._container.append(el)
  }
}