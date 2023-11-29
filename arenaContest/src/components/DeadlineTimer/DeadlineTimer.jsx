import { useState, useEffect } from "react";

export default function DeadlineTimer({ deadline }) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  function getTimeRemaining() {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate - now;

    if (timeDifference <= 0) {
      // Deadline has passed
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <h2>Time Remaining:</h2>
      <div>
        <span>{timeRemaining.days}</span> days&nbsp;
        <span>{timeRemaining.hours}</span> hours&nbsp;
        <span>{timeRemaining.minutes}</span> minutes&nbsp;
        <span>{timeRemaining.seconds}</span> seconds
      </div>
    </div>
  );
}
