import React, { Fragment, useEffect, useState } from "react";
import {
  eachDayOfInterval,
  differenceInMilliseconds,
  addMilliseconds,
} from "date-fns";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";

import styled from "./style";

const d3 = {
  scale,
  shape,
  d3Array,
};

const createXScale = (start, end, rangeMin, rangeMax) => {
  return d3.scale.scaleTime().domain([start, end]).range([rangeMin, rangeMax]);
};

const createYScale = (start, end, rangeMin, rangeMax) => {
  return d3.scale
    .scaleLinear()
    .domain([start, end])
    .range([rangeMin, rangeMax]);
};

const Live = ({ className, checkpoints, width, height }) => {
  const [scales, setScales] = useState();
  const [intervals, setIntervals] = useState();
  const [checkpointsIntervals, setCheckpointsIntervals] = useState();
  const [path, setPath] = useState();

  useEffect(() => {
    if (!height && !width) return;
    if (!checkpoints || checkpoints.length <= 0) return;

    const x = createXScale(
      new Date(checkpoints[0].cutOffTime),
      new Date(checkpoints[checkpoints.length - 1].cutOffTime),
      0,
      width
    );

    const y = createYScale(
      checkpoints[checkpoints.length - 1].distance,
      0,
      0,
      height
    );
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

  useEffect(() => {
    if (!scales || !checkpointsIntervals) return;

    const sh = d3.shape
      .area()
      .x0((d) => scales.x(new Date(d.fast)))
      .x1((d) => scales.x(new Date(d.slow)))
      .y((d) => scales.y(d.distance))
      .curve(d3.shape.curveNatural);
    const path = sh(checkpointsIntervals);
    setPath(path);
  }, [scales, checkpointsIntervals]);

  useEffect(() => {
    if (!checkpoints) return;

    const start = new Date(checkpoints[0].cutOffTime);

    const result = checkpoints.reduce((checkpointsIntervals, checkpoint) => {
      const slow = new Date(checkpoint.cutOffTime);
      const duration = differenceInMilliseconds(slow, start);
      const fast = addMilliseconds(start, duration / 2);
      const distance = checkpoint.distance;
      return [...checkpointsIntervals, { fast, slow, distance }];
    }, []);

    setCheckpointsIntervals(result);
  }, [checkpoints]);

  return (
    <svg width={width} height={height} className={className}>
      <g className="intervals">
        {intervals &&
          intervals.map((interval, index) => {
            const x = scales.x(new Date(interval.start));
            const y = 0;
            const width =
              scales.x(new Date(interval.end)) -
              scales.x(new Date(interval.start));

            return (
              <Fragment key={index}>
                <rect
                  key={`${index}-area`}
                  className="area"
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                />
                {/* <line
                  key={`${index}-line`}
                  className="line"
                  x1={scales.x(new Date(interval.end))}
                  x2={scales.x(new Date(interval.end))}
                  y1={0}
                  y2={height}
                /> */}
              </Fragment>
            );
          })}
      </g>
      {path && <path d={path} strokeWidth="0" fill="#d9a443" opacity="0.8" />}
      <g className="checkpoints">
        {checkpointsIntervals &&
          checkpointsIntervals.map((d, index) => {
            const x1 = 0;
            const x2 = width;
            const y1 = scales.y(d.distance);
            const y2 = scales.y(d.distance);

            return (
              <line
                key={index}
                className="line"
                x1={x1}
                x2={x2}
                y2={y2}
                y1={y1}
              />
            );
          })}
      </g>

      {/* {checkpointsIntervals &&
        checkpointsIntervals.map((checkpointsInterval, index) => {
          const x1 = scales.x(checkpointsInterval.fast);
          const x2 = scales.x(checkpointsInterval.slow);
          const y = scales.y(checkpointsInterval.distance);

          return (
            <line
              className="interval"
              fill="#357597"
              key={`${index}`}
              x1={x1}
              x2={x2}
              y2={y}
              y1={y}
            />
          );
        })} */}
    </svg>
  );
};

export default styled(Live);
