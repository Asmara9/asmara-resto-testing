import CONFIG from "../../globals/config";

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__title">${restaurant.name}</h2>
  <img class="restaurant__poster" src="${
    CONFIG.BASE_IMAGE_URL + restaurant.pictureId
  }" alt="${restaurant.name}" crossorigin="anonymous" loading="lazy"/>
  <div class="restaurant__info">
    <h3>Information</h3>
    <h4>Address</h4>
    <p>${restaurant.address}</p>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
  </div>
  <div class="restaurant__description">
    <h3>Description</h3>
    <p>${restaurant.description}</p>
  </div>
  <div class="restaurant__menus">
    <h3>Menus</h3>
    <h4>Foods</h4>
    <ul>
      ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join("")}
    </ul>
    <h4>Drinks</h4>
    <ul>
      ${restaurant.menus.drinks
        .map((drink) => `<li>${drink.name}</li>`)
        .join("")}
    </ul>
  </div>
  <div class="restaurant__reviews">
    <h3>Customer Reviews</h3>
    ${restaurant.customerReviews
      .map(
        (review) => `
      <div class="review">
        <h4>${review.name}</h4>
        <p>${review.review}</p>
        <small>${review.date}</small>
      </div>
    `
      )
      .join("")}
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster" alt="${
        restaurant.name || "-"
      }"
        src="${
          CONFIG.BASE_IMAGE_URL + restaurant.pictureId
        }" crossorigin="anonymous" loading="lazy"/>
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${
          restaurant.rating || "-"
        }</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p>${restaurant.description || "-"}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
