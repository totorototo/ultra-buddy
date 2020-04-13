import React, { useState, useEffect } from "react";
import { differenceInMilliseconds } from "date-fns";

import styled from "./style";
import Home from "../home/Home";
import Map from "../map/Map";
import Options from "../options/Options";
import Sections from "../sections/Sections";
// import Profile from "../profile/Profile";
import usePresistedState from "../../hooks/usePersistedState";
import trace from "../../helpers/trace";

const Main = ({ className }) => {
  const [route, setRoute] = usePresistedState("route", null);
  const [checkpoints, setCheckpoints] = usePresistedState("checkpoints", null);
  const [sections, setSections] = usePresistedState("sections", null);
  const [toggle, setToggle] = useState(false);
  const [pageIndex, setPageIndex] = useState(4);

  useEffect(() => {
    if (!checkpoints || !route) return;
    const helper = trace(...route.features[0].geometry.coordinates);
    const distances = checkpoints.map((checkpoint) => checkpoint.distance);
    const locationsIndices = helper.getLocationIndexAt(...distances);
    const sectionsIndices = locationsIndices.reduce(
      (accu, locationIndex, index, array) => {
        if (index > 0) {
          return [...accu, [array[index - 1], locationIndex]];
        } else return accu;
      },
      []
    );
    const sectionsCoordinates = sectionsIndices.reduce(
      (accu, sectionIndices) => {
        const section = route.features[0].geometry.coordinates.slice(
          sectionIndices[0],
          sectionIndices[1]
        );
        return [...accu, section];
      },
      []
    );

    const sectionsStats = sectionsCoordinates.map((section) => {
      const helper = trace(...section);
      return {
        distance: helper.computeDistance(),
        elevation: helper.computeElevation(),
        coordinates: section,
      };
    });

    const sectionsDetails = checkpoints.reduce(
      (accu, checkpoint, index, array) => {
        if (index > 0) {
          const label = `${array[index - 1].location} - ${checkpoint.location}`;
          const endingDate = new Date(checkpoint.timeBarrier);
          const startingDate = new Date(array[index - 1].timeBarrier);
          const duration = differenceInMilliseconds(endingDate, startingDate);
          return [
            ...accu,
            {
              label,
              duration,
              timeBarrier: checkpoint.timeBarrier,
              ...sectionsStats[index - 1],
              indices: sectionsIndices[index - 1],
            },
          ];
        }
        return accu;
      },
      []
    );
    setSections(sectionsDetails);
  }, [checkpoints, route, setSections]);

  return (
    <div className={className}>
      <div className={`sections-wrapper ${toggle ? "menu-open" : ""}`}>
        <h1>Menu</h1>
        <section className={`one ${pageIndex < 0 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(0);
                setToggle(!toggle);
              }}
            >
              Options
            </h1>
            <div className="section-content">
              <Options />
            </div>
          </div>
        </section>
        <section className={`two ${pageIndex < 1 && "after"}`}>
          <h1
            onClick={() => {
              setPageIndex(1);
              setToggle(!toggle);
            }}
          >
            Progression
          </h1>
        </section>
        <section className={`three ${pageIndex < 2 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(2);
                setToggle(!toggle);
              }}
            >
              Sections
            </h1>
            <div className="section-content">
              {route && sections && (
                <Sections
                  sections={sections}
                  data={route.features[0].geometry.coordinates}
                />
                // <Profile data={route.features[0].geometry.coordinates} />
              )}
            </div>
          </div>
        </section>
        <section className={`four ${pageIndex < 3 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(3);
                setToggle(!toggle);
              }}
            >
              Map
            </h1>
            <div className="section-content">
              <Map route={route} checkpoints={checkpoints} />
            </div>
          </div>
        </section>
        <section className={`five ${pageIndex < 4 && "after"}`}>
          <div className="container">
            <h1
              onClick={() => {
                setPageIndex(4);
                setToggle(!toggle);
              }}
            >
              Home
            </h1>
            <div className="section-content">
              <Home
                setRoute={setRoute}
                setCheckpoints={setCheckpoints}
                setSections={setSections}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default styled(Main);
