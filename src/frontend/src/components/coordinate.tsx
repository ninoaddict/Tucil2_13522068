import { Coordinates, Mafs, Point, Line, Text } from "mafs";
import { BezierPoint } from "../interfaces/point";
import { useMemo, useState, useEffect } from "react";
import SelectButton from "./select-button";
import React from "react";

export default function Coordinate({
  points,
  resultPoints,
  timeElapsed,
  handleReset,
  iteration,
}: {
  points: BezierPoint[];
  resultPoints: BezierPoint[];
  timeElapsed: number;
  handleReset: any;
  iteration: number;
}) {
  const viewContent = useMemo(() => {
    let maxX: number = points[0].x;
    let minX: number = points[0].x;
    let maxY: number = points[0].y;
    let minY: number = points[0].y;

    const res = [-10, 10, -10, 10];

    for (let i = 1; i < points.length; i++) {
      if (points[i].x > maxX) {
        maxX = points[i].x;
      }
      if (points[i].x < minX) {
        minX = points[i].x;
      }
      if (points[i].y > maxY) {
        maxY = points[i].y;
      }
      if (points[i].y < minY) {
        minY = points[i].y;
      }
    }

    if (maxX !== minX) {
      res[0] = minX;
      res[1] = maxX;
    } else {
      res[1] = maxX;
    }

    if (maxY !== minY) {
      res[2] = minY;
      res[3] = maxY;
    } else {
      res[3] = maxY;
    }
    return res;
  }, [points]);

  const [currIterationPoints, setCurrIterPoint] = useState([...resultPoints]);
  const [currIter, setCurrIter] = useState(iteration);
  const [maxIter, setMaxIter] = useState(1);

  useEffect(() => {
    setCurrIterPoint([...resultPoints]);
  }, [resultPoints]);

  useEffect(() => {
    setCurrIter(iteration);
    setMaxIter(iteration);
  }, [resultPoints]);

  function handleChangeIteration(iter: number) {
    setCurrIter(iter);
    const newCurrResPoints = [];
    const divisor = Math.floor(Math.pow(2, iter));
    const addition = Math.floor((resultPoints.length - 1) / divisor);
    newCurrResPoints.push({ ...resultPoints[0] });
    if (resultPoints.length > 1) {
      for (let i = addition; i < resultPoints.length - 1; i += addition) {
        newCurrResPoints.push({ ...resultPoints[i] });
      }
      newCurrResPoints.push({ ...resultPoints[resultPoints.length - 1] });
    }
    setCurrIterPoint(newCurrResPoints);
  }

  return (
    <div className="border-2 h-[705px] relative 2xl:min-w-[1000px] xl:min-w-[900px] lg:min-w-[800px] md:min-w-[500px]">
      <Mafs
        zoom={{ min: 0.001, max: 50 }}
        height={700}
        viewBox={{
          x: [viewContent[0], viewContent[1]],
          y: [viewContent[2], viewContent[3]],
        }}
      >
        <Coordinates.Cartesian />
        {points.map((point, index) => {
          if (index > 0 && resultPoints.length > 0) {
            return (
              <React.Fragment key={index}>
                <Point
                  key={"point-" + index}
                  x={point.x}
                  y={point.y}
                  color="#ffffff"
                />
                <Line.Segment
                  key={"line-" + index}
                  point1={[points[index - 1].x, points[index - 1].y]}
                  point2={[point.x, point.y]}
                />
                <Text
                  key={"text-" + index}
                  x={point.x}
                  y={point.y}
                  attach="e"
                  attachDistance={15}
                >
                  P{index + 1}
                </Text>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <Point
                  key={"point-" + index}
                  x={point.x}
                  y={point.y}
                  color="#ffffff"
                />
                <Text
                  key={"text-" + index}
                  x={point.x}
                  y={point.y}
                  attach="e"
                  attachDistance={15}
                >
                  P{index + 1}
                </Text>
              </React.Fragment>
            );
          }
        })}
        {currIterationPoints.map((point, index) => {
          if (index > 0) {
            return (
              <React.Fragment key={index}>
                <Point
                  key={"point-" + index}
                  x={point.x}
                  y={point.y}
                  color="#5C8374"
                />
                <Line.Segment
                  key={"line-" + index}
                  point1={[
                    currIterationPoints[index - 1].x,
                    currIterationPoints[index - 1].y,
                  ]}
                  point2={[point.x, point.y]}
                  color="#93B1A6"
                />
              </React.Fragment>
            );
          } else {
            return (
              <Point
                key={"point-" + index}
                x={point.x}
                y={point.y}
                color="#5C8374"
              />
            );
          }
        })}
      </Mafs>
      <div className="absolute left-3 top-3">
        <h1 className="text-[#eee] font-semibold">{timeElapsed} ms</h1>
      </div>
      {resultPoints.length > 0 && (
        <div className="absolute left-3 bottom-3 flex gap-3">
          <button
            type="button"
            className="border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            onClick={handleReset}
          >
            Reset
          </button>
          <SelectButton
            maxIter={maxIter}
            iteration={currIter}
            setIteration={handleChangeIteration}
          />
        </div>
      )}
    </div>
  );
}
