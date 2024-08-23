"use client";
import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "web3", label: "Web3" },
  { value: "arts", label: "Arts" },
  { value: "business", label: "Business" },
];

interface Option {
  value: string;
  label: string;
}

export const MultiSelect = ({ onChange }: { onChange: (categories: string[]) => void }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const handleChange = (selected: ReadonlyArray<Option>) => {
    setSelectedOptions(selected as Option[]);
    onChange(selected.map(option => option.value));
  };

  return (
    <Select
      isMulti
      name="courses"
      options={options}
      className="basic-multi-select w-[750px]"
      classNamePrefix="select"
      placeholder="Filter by category"
      value={selectedOptions}
      onChange={handleChange}
    />
  );
};