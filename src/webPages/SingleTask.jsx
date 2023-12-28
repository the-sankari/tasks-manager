import { useParams } from "react-router-dom";
import FetchData from "../tools/FetchData";
import { useEffect, useState } from "react";
import PickDate from "../components/PickDate";
import moment from "moment";
import BarChart from "../components/Chart";

const SingleTask = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);

  const [startDate, setStartDate] = useState(
    moment().subtract(7, "days").startOf("day")
  );
  const [endDate, setEndDate] = useState(moment().endOf("day"));
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await FetchData(
          `http://localhost:3010/tasks/${id}`
        );
        if (error) {
          console.error("Error fetching tasks:", error);
          return;
        }
        setTask(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
    return () => {
      setTask(null);
    };
  }, [id]);

  // console.log(startDate.toDate(), endDate.toDate());
  let observationInterval = {};
  if (startDate && endDate) {
    const start = startDate.toDate();
    const end = endDate.toDate();
    observationInterval = {
      start: start,
      end: end,
    };
  }

  console.log(observationInterval);

  return (
    <div className="flex flex-col items-center ">
      <PickDate
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        focusedInput={focusedInput}
        setFocusedInput={setFocusedInput}
      />
      {task && observationInterval && (
        <BarChart task={task} observationInterval={observationInterval} />
      )}
    </div>
  );
};

export default SingleTask;
