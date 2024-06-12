class RestaurantItem extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="restaurant-item">
          <img src="${this._restaurant.pictureId}" alt="${this._restaurant.name}" />
          <div class="restaurant-info">
            <h3>${this._restaurant.name}</h3>
            <p>${this._restaurant.description}</p>
            <p>City: ${this._restaurant.city}</p>
            <p>Rating: ${this._restaurant.rating}</p>
          </div>
        </div>
      `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
