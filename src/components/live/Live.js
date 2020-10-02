import React, { Fragment, useEffect, useState } from "react";
import {
  eachDayOfInterval,
  differenceInMilliseconds,
  addMilliseconds,
  addHours,
  format,
  isBefore,
  isAfter,
} from "date-fns";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";
import { useRecoilValue } from "recoil";

import styled from "./style";
import { checkpointsState, runnerLocationsState } from "../../model";

const d3 = {
  scale,
  shape,
  d3Array,
};

const OFFSET_Y = 60;
const OFFSET_X = 30;

const createXScale = (start, end, rangeMin, rangeMax) => {
  return d3.scale.scaleTime().domain([start, end]).range([rangeMin, rangeMax]);
};

const createYScale = (start, end, rangeMin, rangeMax) => {
  return d3.scale
    .scaleLinear()
    .domain([start, end])
    .range([rangeMin, rangeMax]);
};



const Live = ({ className,  width, height }) => {


  const checkpoints = useRecoilValue(checkpointsState);
  const runnerLocations = useRecoilValue(runnerLocationsState);

  const [scales, setScales] = useState();
  const [intervals, setIntervals] = useState();
  const [checkpointsIntervals, setCheckpointsIntervals] = useState();
  const [intervalsArea, setIntervalsArea] = useState();
  const [livePath, setLivePath] = useState();
  const [verticalTicks, setVerticalTicks] = useState([]);
  const [horizontalTicks, setHorizontalTicks] = useState([]);

  useEffect(() => {
    const tickPeriod = 4;
    let date = new Date(checkpoints[0].cutOffTime);

    const markers = [];

    while (
      differenceInMilliseconds(
        date,
        new Date(checkpoints[checkpoints.length - 1].cutOffTime)
      ) < 0
    ) {
      markers.push(date);
      date = addHours(date, tickPeriod);
    }

    setHorizontalTicks(markers);
  }, [checkpoints]);

  useEffect(() => {
    const tickPeriod = 10;
    const distance = checkpoints[checkpoints.length - 1].distance;
    const times = (distance - (distance % tickPeriod)) / tickPeriod;

    const markers = [];
    for (let i = 0; i <= times; i++) {
      markers.push(i * tickPeriod);
    }
    setVerticalTicks(markers);
  }, [checkpoints]);

  useEffect(() => {
    if (!height && !width) return;
    if (!checkpoints || checkpoints.length <= 0) return;

    const x = createXScale(
      new Date(checkpoints[0].cutOffTime),
      new Date(checkpoints[checkpoints.length - 1].cutOffTime),
      OFFSET_X,
      width
    );

    const y = createYScale(
      checkpoints[checkpoints.length - 1].distance,
      0,
      0,
      height - OFFSET_Y
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
    //add race finish time -> OO-AM to finish date
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
    setIntervalsArea(path);
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

  useEffect(() => {
    if (!scales || runnerLocations.length <= 0 || !checkpoints) return;

    const start = new Date(checkpoints[0].cutOffTime);
    const end = new Date(checkpoints[checkpoints.length - 1].cutOffTime);
    const raceDistance = checkpoints[checkpoints.length - 1].distance;

    const positions = runnerLocations
      .filter((location) => {
        const current = new Date(location.timestamp);
        return (
          isAfter(current, start) &&
          isBefore(current, end) &&
          location.distance <= raceDistance
        );
      })
      .map((location) => [
        location.distance / 1000,
        new Date(location.timestamp),
      ]);

    const getLine = d3.shape
      .line()
      .x((d) => scales.x(new Date(d[1])))
      .y((d) => scales.y(d[0]))
      .defined((d) => !d.fake);

    const path = getLine(positions);
    setLivePath(path);
  }, [runnerLocations, scales, checkpoints]);

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
                <clipPath id={`clip-${index}`}>
                  <rect
                    key={`${index}-area`}
                    x={x}
                    y={y}
                    width={width}
                    height={height - OFFSET_Y}
                  />
                </clipPath>
                <g className="group-area" clipPath={`url(#${`clip-${index}`})`}>
                  <rect
                    opacity="1"
                    key={`${index}-area`}
                    className="area"
                    x={x}
                    y={y}
                    width={width}
                    height={height - OFFSET_Y}
                  />
                  <text
                    writingMode="tb"
                    className="label"
                    x={x + 15}
                    y={10}
                    fontSize={28}
                    transform={
                      index > 0
                        ? `translate(0, ${height - 350})`
                        : "translate(0,0)"
                    }
                  >
                    {format(new Date(interval.start), "EEEE")}
                  </text>
                </g>
              </Fragment>
            );
          })}
      </g>

      <g className="horizontal-ticks">
        {horizontalTicks.map((tick, index) => (
          <g key={`${index}-group`}>
            <text
              writingMode="tb"
              key={`${index}-text`}
              fontSize="12"
              fill="#ffffff94"
              x={scales.x(new Date(tick))}
              y={height - 50}
            >
              {format(new Date(tick), "HH:mm")}
            </text>
            <line
              stroke="#ffffff94"
              key={`${index}-tick`}
              x1={scales.x(new Date(tick))}
              x2={scales.x(new Date(tick))}
              y2={height - OFFSET_Y + 5}
              y1={height - OFFSET_Y}
            />
          </g>
        ))}
      </g>
      <g className="vertical-ticks">
        {verticalTicks.map((tick, index) => (
          <g key={`${index}-group`}>
            <text
              key={`${index}-text`}
              fontSize="12"
              fill="#ffffff94"
              x={0}
              y={scales.y(tick)}
            >
              {tick}
            </text>
            <line
              stroke="#ffffff94"
              key={`${index}-tick`}
              x1={OFFSET_X - 5}
              x2={OFFSET_X}
              y2={scales.y(tick)}
              y1={scales.y(tick)}
            />
          </g>
        ))}
      </g>
      {intervalsArea && (
        <path
          fillOpacity="0.9"
          d={intervalsArea}
          strokeWidth="0"
          fill="#d9a443"
        />
      )}
      {livePath && (
        <path
          d={livePath}
          fill="none"
          stroke="#357597"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeOpacity="0.9"
        />
      )}
      <g className="checkpoints">
        {checkpointsIntervals &&
          checkpointsIntervals.map((d, index) => {
            const x1 = OFFSET_X;
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
    </svg>
  );
};

export default styled(Live);
