import "react-dates-gte-react-17-21.8.0-version-fixed/initialize";
import "react-dates-gte-react-17-21.8.0-version-fixed/lib/css/_datepicker.css";

import {
  DateRangePicker,
  isInclusivelyBeforeDay,
} from "react-dates-gte-react-17-21.8.0-version-fixed";


import React from "react";
import moment from "moment";

const PickDate = ({ startDate, endDate,  setStartDate, setEndDate, focusedInput, setFocusedInput}) => {
  

  // console.log(startDate.toDate(), endDate.toDate());

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="startDate"
      endDate={endDate}
      endDateId="endDate"
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={setFocusedInput}
      isOutsideRange={(day) => !isInclusivelyBeforeDay(day, moment())}
      initialVisibleMonth={() => moment().subtract(1, "month")}
      orientation={"horizontal"}
    />
  );
};

export default PickDate;
