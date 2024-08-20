import React, { useState, useEffect } from "react";

const Upload = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const base_url = "http://127.0.0.1:8000/v1/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/result/`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const timeSlots = [
    "8am - 10am",
    "10am - 12noon",
    "12noon - 2pm",
    "2pm - 4pm",
  ];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="py-5  px-10">
      <h2 className="text-4xl text-gray-900 text-center py-5">
        Welcome to Resources Planning System
      </h2>
      <table className="min-w-full border  border-gray-200">
        <thead className="bg-[#1560bd] text-white">
          <tr>
            <th className="border-b px-4 py-2">Days/Time</th>
            {timeSlots.map((time) => (
              <th key={time} className="border-b px-4 py-2">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            <tr key={day} className="hover:bg-gray-100">
              <td className="border-b px-4 py-5 font-semibold">{day}</td>
              {timeSlots.map((time) => (
                <td key={time} className="border-b px-4 py-5">
                  {data[day]?.[time] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Upload;
