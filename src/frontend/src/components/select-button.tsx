export default function SelectButton({
  maxIter,
  iteration,
  setIteration,
}: {
  maxIter: number;
  iteration: number;
  setIteration: any;
}) {
  const options = [];
  for (let i = 1; i <= maxIter; i++) {
    options.push(
      <option key={i} value={i}>
        Iteration {i}
      </option>
    );
  }
  return (
    <select
      id="iterations"
      className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={iteration}
      onChange={(e) => {
        setIteration(parseInt(e.target.value));
      }}
    >
      {options}
    </select>
  );
}
