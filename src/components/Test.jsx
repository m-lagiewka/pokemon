import { useEffect, useState } from "react";

const Test = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);
  return (
    <div>
      <button
        onClick={() =>
          setCurrentDate(
            new Date(currentDate.setDate(currentDate.getDate() - 1))
          )
        }
      >
        Prev
      </button>
      <time className="p-2">
        {currentDate.toLocaleDateString("pl-PL", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <button
        onClick={() =>
          setCurrentDate(
            new Date(currentDate.setDate(currentDate.getDate() + 1))
          )
        }
      >
        Next
      </button>
    </div>
  );
};

export default Test;
