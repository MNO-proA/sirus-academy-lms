/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const YearFilterInput = ({ onYearFilter }) => {
  const [yearInput, setYearInput] = useState('');

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYearInput(value);
    onYearFilter(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Filter by year (e.g., 2024)"
        value={yearInput}
        onChange={handleYearChange}
        className="pl-10 pr-4 h-10 w-full rounded-md border border-gray-200 bg-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
        maxLength="4"
        pattern="\d{4}"
      />
    </div>
  );
};

export default YearFilterInput;