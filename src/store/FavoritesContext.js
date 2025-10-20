import React, { useState } from "react";

const FavoritesContext = React.createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (fav) => {},
  removeFavorite: (id) => {},
  itemIsFavorite: (id) => false,
});

export function FavoritesContextProvider({ children }) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prev) => [...prev, favoriteMeetup]);
  }

  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prev) => prev.filter((m) => m.id !== meetupId));
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((m) => m.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
