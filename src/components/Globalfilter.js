import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const Globalfilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce(() => {
    setFilter(value || undefined);
  }, 300);
  return (
    <span className="w-full block my-4 text-indigo-500 italic text-xl ">
      Search :{" "}
      <input
        className="w-1/3 p-2 border-2 border-indigo-500 outline-indigo-700 rounded-md shadow-sm focus:shadow-md"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export default Globalfilter;
