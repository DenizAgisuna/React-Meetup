import { useContext } from "react";
import MeetupItem from "../components/meetups/MeetupItem";
import classes from "./../components/meetups/MeetupList.module.css";
import FavoritesContext from "../store/favorites-context";

export default function FavoritesPage() {
  const { totalFavorites, favorites } = useContext(FavoritesContext);

  let content;

  if (totalFavorites === 0) {
    content = <p>You don't have any favorites at the moment.</p>;
  } else {
    content = (
      <ul className={classes.list}>
        {favorites.map((item) => (
          <MeetupItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <section>
      <h1>Favorites Page</h1>
      {content}
    </section>
  );
}
