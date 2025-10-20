import React, { useState, useEffect } from "react";

const MeetupsContext = React.createContext({
  meetups: [],
  isLoading: false,
  error: null,
  addMeetup: (m) => {},
  removeMeetup: (id) => {},
});

export function MeetupsContextProvider({ children }) {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error("Failed to fetch meetups");
        const data = await res.json();
        const stored = JSON.parse(localStorage.getItem("meetups") || "[]");
        const combined = [...stored, ...data];
        console.log("Loaded meetups:", combined);
        if (mounted) setMeetups(combined);
      } catch (err) {
        if (mounted) setError(err.message || "Error loading meetups");
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  function addMeetup(newMeetup) {
    setMeetups((prev) => {
      const updated = [...prev, newMeetup];
      return updated;
    });

    try {
      const stored = JSON.parse(localStorage.getItem("meetups") || "[]");
      stored.push(newMeetup);
      localStorage.setItem("meetups", JSON.stringify(stored));
    } catch (err) {
      console.error("Failed to persist meetup", err);
    }
  }

  function removeMeetup(id) {
    setMeetups((prev) => prev.filter((m) => m.id !== id));
    try {
      const stored = JSON.parse(localStorage.getItem("meetups") || "[]");
      const updatedStored = stored.filter((m) => m.id !== id);
      localStorage.setItem("meetups", JSON.stringify(updatedStored));
    } catch (err) {
      console.error(err);
    }
  }

  const context = {
    meetups,
    isLoading,
    error,
    addMeetup,
    removeMeetup,
  };

  return (
    <MeetupsContext.Provider value={context}>
      {children}
    </MeetupsContext.Provider>
  );
}

export default MeetupsContext;