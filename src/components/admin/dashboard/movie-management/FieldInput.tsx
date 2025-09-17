"use client";

import { setMovieDetailField } from "@/store/slices/crawl-movies.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Field, Input, Textarea } from "@chakra-ui/react";
import { get } from "lodash";
import React, { useState, JSX, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputClasseDefault } from "./MovieActionsDialog";
import { generateSlug } from "@/lib/utils";

interface FieldInputProps {
  field: {
    label: string;
    name: string;
    type: string;
    required: boolean;
    helpText: string;
  };
  Tag?: typeof Input | typeof Textarea;
}

const FieldInput = ({ field, Tag = Input }: FieldInputProps) => {
  const dispatch: AppDispatch = useDispatch();
  const value = useSelector((state: RootState) =>
    get(state.crawlMovies.movieDetail, field.name)
  );
  const [val, setVal] = useState(value || "");

  useEffect(() => {
    setVal(value || "");
  }, [value]);

  useEffect(() => {
    if (field.name === "name") {
      dispatch(
        setMovieDetailField({
          field: "slug",
          value: generateSlug(val),
        })
      );
    }
  }, [value]);

  return (
    <Field.Root key={field.name}>
      <Field.Label>
        {field.required && <span className="text-red-500">*</span>}{" "}
        {field.label}
      </Field.Label>
      {field.helpText && (
        <Field.HelperText className="text-green-400">
          Ví dụ: {field.helpText}
        </Field.HelperText>
      )}
      <Tag
        onChange={(e) => {
          setVal(e.target.value);
        }}
        onBlur={() => {
          dispatch(setMovieDetailField({ field: field.name, value: val }));
        }}
        name={field.name}
        type={field.type}
        className={`w-full min-h-10 ${inputClasseDefault} `}
        value={val}
      />
    </Field.Root>
  );
};

export default FieldInput;
