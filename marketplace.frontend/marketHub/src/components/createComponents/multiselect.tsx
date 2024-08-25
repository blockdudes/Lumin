"use client";
import React, { useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

export const MultiSelect = ({
  options,
  onChange,
}: {
  options: Option[] | undefined;
  onChange: (categories: string[]) => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const handleChange = (selected: ReadonlyArray<Option>) => {
    setSelectedOptions(selected as Option[]);
    onChange(selected.map((option) => option.value));
  };

  return (
    <Select
      isMulti
      name="courses"
      options={options}
      isLoading={options === undefined}
      className="basic-multi-select w-[600px]"
      classNamePrefix="select"
      placeholder="Filter by category"
      value={selectedOptions}
      onChange={handleChange}
    />
  );
};
