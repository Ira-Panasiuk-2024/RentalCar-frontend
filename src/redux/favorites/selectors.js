export const selectFavoriteItems = state => state.favorites.items;
export const selectIsFavorite = id => state =>
  state.favorites.items.includes(id);
