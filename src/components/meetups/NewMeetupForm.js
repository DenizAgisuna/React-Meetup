import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { ALL_MEETUP_PAGE } from "../../utils/constants";

export default function NewMeetupForm() {
  const titleRef = useRef();
  const imageRef = useRef();
  const addressRef = useRef();
  const descriptionRef = useRef();

  // const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  function submitHandler(event) {
    event.preventDefault();
    const enteredTitle = titleRef.current.value.trim();
    const enteredImage = imageRef.current.value.trim();
    const enteredAddress = addressRef.current.value.trim();
    const enteredDescription = descriptionRef.current.value.trim();

    if (
      !enteredTitle ||
      !enteredImage ||
      !enteredAddress ||
      !enteredDescription
    ) {
      return;
    }

    const newMeetup = {
      id: Date.now().toString(),
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    // setIsSubmitting(true);
    try {
      const stored = JSON.parse(localStorage.getItem("meetups") || "[]");
      stored.push(newMeetup); // append to the end
      localStorage.setItem("meetups", JSON.stringify(stored));
    } catch (err) {
      console.error("Failed to save meetup", err);
    }
    // setIsSubmitting(false);
    history.push(ALL_MEETUP_PAGE);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
