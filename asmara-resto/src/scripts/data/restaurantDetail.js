// restaurantDetail.js
class RestaurantDetail extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="restaurant-detail">
        <img src="${this._restaurant.pictureId}" alt="${this._restaurant.name}" />
        <h2>${this._restaurant.name}</h2>
        <p><strong>Rating:</strong> ${this._restaurant.rating}</p>
        <p><strong>Address:</strong> ${this._restaurant.address}</p>
        <p><strong>Categories:</strong> ${this._restaurant.categories.map((category) => category.name).join(', ')}</p>
        <!-- Add more details here as needed -->
      </div>
    `;
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
