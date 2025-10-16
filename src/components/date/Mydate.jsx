import React, { useEffect, useState } from 'react';
import { FaCopyright } from "react-icons/fa";


export default function Mydate() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div>
      <div className="flex justify-between h-[90px] items-center px-4 py-1">
  <img src="/logo.png" alt="kwasu logo" className="w-[105px] cover" />
  <div className="flex items-center gap-2 text-xl">
    <span className="text-2xl"><FaCopyright /></span>
    <span className="text-xl">{year}</span>
  </div>
</div>

    </div>
  );
}
