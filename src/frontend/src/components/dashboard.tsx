import { ChangeEventHandler } from "react";
import { BezierPoint } from "../interfaces/point";

interface DashboardParameter {
  numberOfPoints: number;
  handleNumberOfPointsChange: ChangeEventHandler<HTMLInputElement>;
  numberOfIteration: number;
  handleNumberOfIterationChange: ChangeEventHandler<HTMLInputElement>;
  arrayOfPoints: BezierPoint[];
  handlePointChange: Function;
  isDnc: boolean;
  handleIsDnc: ChangeEventHandler<HTMLInputElement>;
  setResultPoints: any;
  setTimeElapsed: any;
}

export default function Dashboard({
  numberOfPoints,
  handleNumberOfPointsChange,
  numberOfIteration,
  handleNumberOfIterationChange,
  arrayOfPoints,
  handlePointChange,
  isDnc,
  handleIsDnc,
  setResultPoints,
  setTimeElapsed,
}: DashboardParameter) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const data = {
        neff: numberOfPoints,
        points: [...arrayOfPoints],
        iteration: numberOfIteration,
      };

      let response;
      if (isDnc) {
        response = await fetch("http://localhost:8080/dnc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("http://localhost:8080/bruteforce", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      setTimeElapsed(res.time);
      setResultPoints(res.result.points);
    } catch (error) {
      console.log("Unexpected error occured");
    }
  }

  return (
    <div className="w-[400px] py-5 px-10 rounded-lg text-[#eee] font-semibold bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg box-border">
      <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 text-xl box-border">
          <label htmlFor="number-of-point" className="flex items-center">
            Number of Point
          </label>
          <input
            type="number"
            id="number-of-point"
            value={numberOfPoints}
            min={1}
            onChange={handleNumberOfPointsChange}
            required
            className="text-[#121212] py-1 box-border px-3 rounded"
          />
        </div>
        <div className="flex flex-col gap-2 text-xl box-border">
          <label htmlFor="number-of-iteration" className="flex items-center">
            Num of Iteration
          </label>
          <input
            type="number"
            id="number-of-iteration"
            min={1}
            onBlur={handleNumberOfIterationChange}
            required
            className="text-[#121212] py-1 box-border px-3 rounded"
          />
        </div>
        {arrayOfPoints.map((point, index) => (
          <div key={index} className="flex gap-5">
            <div className="flex flex-col gap-1 text-xl box-border">
              <label htmlFor={`x-${index + 1}`} className="flex items-center">
                {`X${index + 1}`}
              </label>
              <input
                type="number"
                step="any"
                id={`x-${index + 1}`}
                // value={point.x}
                onBlur={(e) =>
                  handlePointChange(index, "x", parseFloat(e.target.value))
                }
                required
                className="text-[#121212] py-1 box-border px-3 rounded w-full"
              />
            </div>
            <div className="flex flex-col gap-1 text-xl box-border">
              <label htmlFor={`y-${index + 1}`} className="flex items-center">
                {`Y${index + 1}`}
              </label>
              <input
                type="number"
                step="any"
                id={`y-${index + 1}`}
                // value={point.y}
                onBlur={(e) =>
                  handlePointChange(index, "y", parseFloat(e.target.value))
                }
                required
                className="text-[#121212] py-1 box-border px-3 rounded w-full"
              />
            </div>
          </div>
        ))}
        <label className="flex gap-2 items-center cursor-pointer ml-11 mt-6">
          <span>Bruteforce</span>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDnc}
            onChange={handleIsDnc}
          />
          <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span>DNC</span>
        </label>
        <div className="mt-4">
          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Insert
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
