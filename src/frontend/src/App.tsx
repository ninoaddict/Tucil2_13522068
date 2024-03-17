import "./App.css";
import Coordinate from "./components/coordinate.tsx";
import { useState, ChangeEvent } from "react";
import Title from "./components/title.tsx";
import Dashboard from "./components/dashboard.tsx";
import { BezierPoint } from "./interfaces/point.tsx";

const initialPoints: BezierPoint[] = [
  { x: Math.floor(Math.random() * 21), y: Math.floor(Math.random() * 21) },
  { x: Math.floor(Math.random() * 21), y: Math.floor(Math.random() * 21) },
  { x: Math.floor(Math.random() * 21), y: Math.floor(Math.random() * 21) },
];

function App() {
  const [numberOfPoints, setNumberOfPoints] = useState(3);
  const [numberOfIteration, setNumberOfIteration] = useState(2);
  const [arrayOfPoints, setArrayOfPoints] = useState([...initialPoints]);
  const [isDnc, setIsDnc] = useState(true);
  const [resultPoints, setResultPoints] = useState<BezierPoint[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);

  function handleIsDnc() {
    setIsDnc((prev) => !prev);
  }

  function handleReset() {
    setResultPoints([]);
    setTimeElapsed(0);
  }

  // tes

  function handleNumberOfPointsChange(e: ChangeEvent<HTMLInputElement>) {
    let val = parseInt(e.target.value);
    setNumberOfPoints(val);
    if (isNaN(val) || val <= 0) {
      return;
    }
    let num = numberOfPoints;
    if (isNaN(num) || num <= 0) {
      num = 0;
    }

    if (val > num) {
      const numNeededSpace: number = val - num;
      let updatedPoints: BezierPoint[] = [...arrayOfPoints];
      if (num === 0) {
        updatedPoints = [];
      }
      for (let i = 0; i < numNeededSpace; i++) {
        let x: number = Math.floor(Math.random() * 21);
        let y: number = Math.floor(Math.random() * 21);
        updatedPoints.push({ x, y });
      }
      setArrayOfPoints(updatedPoints);
    } else {
      const newPoints = [...arrayOfPoints.slice(0, val)];
      setArrayOfPoints(newPoints);
    }
    handleReset();
  }

  function handleNumberOfIterationChange(e: ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value);
    if (isNaN(val)) return;
    setNumberOfIteration(val);
  }

  function handlePointChange(index: number, axis: string, value: number) {
    if (isNaN(value)) return;
    if (axis === "x") {
      setArrayOfPoints((prevPoints) => {
        const updatedPoints = [...prevPoints];
        updatedPoints[index].x = value;
        return updatedPoints;
      });
    } else {
      setArrayOfPoints((prevPoints) => {
        const updatedPoints = [...prevPoints];
        updatedPoints[index].y = value;
        return updatedPoints;
      });
    }
    handleReset();
  }

  return (
    <div className="App min-h-screen p-8 lg:p-6 md:p-4 radial-gradient">
      <Title />
      <div className="flex gap-9 justify-center">
        <div className="flex justify-center">
          <Coordinate
            points={arrayOfPoints}
            resultPoints={resultPoints}
            timeElapsed={timeElapsed}
            handleReset={handleReset}
            iteration={numberOfIteration}
          />
        </div>
        <Dashboard
          numberOfPoints={numberOfPoints}
          handleNumberOfPointsChange={handleNumberOfPointsChange}
          numberOfIteration={numberOfIteration}
          handleNumberOfIterationChange={handleNumberOfIterationChange}
          arrayOfPoints={arrayOfPoints}
          handlePointChange={handlePointChange}
          isDnc={isDnc}
          handleIsDnc={handleIsDnc}
          setResultPoints={setResultPoints}
          setTimeElapsed={setTimeElapsed}
        />
      </div>
    </div>
  );
}

export default App;
