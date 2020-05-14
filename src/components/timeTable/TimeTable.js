import React, { useEffect, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";

import styled from "./style";

const d3 = {
  scale,
  shape,
  d3Array,
};

const LOCATION_NAME_WIDTH = 100;

const createXScale = (start, end, rangeMin, rangeMax) => {
  return d3.scale.scaleTime().domain([start, end]).range([rangeMin, rangeMax]);
};

const createYScale = (start, end, rangeMin, rangeMax) => {
  return d3.scale
    .scaleLinear()
    .domain([start, end])
    .range([rangeMin, rangeMax]);
};

const TimeTable = ({ className, checkpoints, width, height }) => {
  const [scales, setScales] = useState();
  const [intervals, setIntervals] = useState();

  useEffect(() => {
    if (!height && !width) return;
    if (!checkpoints || checkpoints.length <= 0) return;

    const x = createXScale(
      new Date(checkpoints[0].cutOffTime),
      new Date(checkpoints[checkpoints.length - 1].cutOffTime),
      LOCATION_NAME_WIDTH,
      width > LOCATION_NAME_WIDTH ? width * 2.5 : LOCATION_NAME_WIDTH
    );

    const y = createYScale(0, checkpoints.length, 0, height);
    setScales({ x, y });
  }, [width, height, checkpoints]);

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
    setIntervals(intervals);
  }, [checkpoints]);

  return <div className={className}>{scales && intervals && <div></div>}</div>;
};

export default styled(TimeTable);
