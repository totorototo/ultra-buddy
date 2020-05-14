import React, { useEffect } from "react";
import { eachDayOfInterval } from "date-fns";

import styled from "./style";

const TimeTable = ({ className, checkpoints }) => {
  useEffect(() => {
    if (!checkpoints) return;

    const days = eachDayOfInterval({
      start: new Date(checkpoints[0].cutOffTime),
      end: new Date(checkpoints[checkpoints.length - 1].cutOffTime),
    });
    // remove first item -> 00-AM to start date
    days.shift();
    // add race start time -> start date to 00-PM
    days.unshift(new Date(checkpoints[0].cutOffTime));
    //add race finish time -> OO-AM to finsih date
    days.push(new Date(checkpoints[checkpoints.length - 1].cutOffTime));

    const intervals = days.reduce((intervals, day, index, array) => {
      if (index < array.length - 1) {
        return [...intervals, { start: day, end: array[index + 1] }];
      }
      return intervals;
    }, []);
    debugger;
  }, [checkpoints]);
  return <div className={className}></div>;
};

export default styled(TimeTable);
