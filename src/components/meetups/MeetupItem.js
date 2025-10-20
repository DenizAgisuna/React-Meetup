import { useContext } from "react";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import FavoritesContext from "../../store/FavoritesContext";

export default function MeetupItem({ item }) {
  const favCtx = useContext(FavoritesContext);
  const itemIsFavorite = favCtx.itemIsFavorite(item.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favCtx.removeFavorite(item.id);
      return;
    }
    favCtx.addFavorite(item);
  }

  return (
    <li className={classes.item} data-test="meet-up-item">
      <Card>
        <div className={classes.image}>
          <img src={item.image} alt={item.title} />
        </div>
        <div className={classes.content}>
          <h3>{item.title}</h3>
          <address>{item.address}</address>
          <p>{item.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}
