"use client";

import { setMovieDetailField } from "@/store/slices/crawl-movies.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Field, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface MultiNameInputProps {
  type: "actors" | "directors";
}

const MultiNameInput = ({ type }: MultiNameInputProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { movieDetail } = useSelector((state: RootState) => state.crawlMovies);
  const [values, setValues] = useState<string[]>(movieDetail?.[type] || []);

  const label = type === "actors" ? "Diễn viên" : "Đạo diễn";

  const handleAddNewItem = () => {
    dispatch(
      setMovieDetailField({
        field: type,
        value: [...structuredClone(movieDetail?.[type] || []), ""],
      })
    );
    setValues((prev) => [...prev, ""]);
  };

  const handleRemoveItem = (index: number) => {
    const newData = movieDetail?.[type]?.filter((_, i) => i !== index);
    dispatch(setMovieDetailField({ field: type, value: newData ?? [] }));
    setValues(newData || []);
  };

  const handleChangeItem = (index: number, value: string) => {
    if (!movieDetail) return;

    const newData = structuredClone(movieDetail?.[type] || []);
    newData[index] = value;
    dispatch(setMovieDetailField({ field: type, value: newData }));
  };

  return (
    <Box className="">
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movieDetail?.[type]?.map((name, index) => (
          <Field.Root key={index}>
            <Field.Label>{`Tên ${label} ${index + 1}`}</Field.Label>
            <Box className="flex gap-4 w-full">
              <Input
                onBlur={(e) => handleChangeItem(index, e.target.value)}
                onChange={(e) =>
                  setValues((prev) => {
                    const newValues = [...prev];
                    newValues[index] = e.target.value;
                    return newValues;
                  })
                }
                placeholder={`Nhập tên ${label}`}
                value={values[index] || ""}
                className="border min-h-10 flex-1 text-gray-50 focus:border rounded-md focus:border-gray-50 border-gray-600"
              />
              <IconButton
                className=" bg-red-600 text-white hover:opacity-75"
                onClick={() => handleRemoveItem(index)}
              >
                <FaTrash />
              </IconButton>
            </Box>
          </Field.Root>
        ))}
      </Box>

      <Box className="flex justify-start mt-4">
        <Button
          className="bg-sky-500 text-black hover:opacity-75 mt-6 lg:w-auto w-full"
          onClick={handleAddNewItem}
        >
          <IoIosAddCircle />
          Thêm {label}
        </Button>
      </Box>
    </Box>
  );
};

export default MultiNameInput;
