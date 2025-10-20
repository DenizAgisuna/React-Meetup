import MeetupItem from "../components/meetups/MeetupItem";
import classes from "./../components/meetups/MeetupList.module.css";
import { useContext } from "react";
import MeetupsContext from "../store/meetups-context";

export default function AllMeetupsPage() {
  const meetupsCtx = useContext(MeetupsContext);
  const meetups = meetupsCtx.meetups; 
  const isLoading = meetupsCtx.isLoading;

  if (isLoading) return <p>Loading...</p>;
  if (!meetups || meetups.length === 0) return <p>No meetups found.</p>;
  
  return (
    <section>
      <h1>All Meetups</h1>
      <ul className={classes.list}>
        {meetups.map((item) => (
          <MeetupItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
