"use client";

import { Dialog, Field, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  movieName: string;
  description?: string;
  releaseYear?: number | null;
  country?: string | null;
  genre?: string | null;
}

const MovieRequestForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register: rhfMovieRequest,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormValues) => {
    const { movieName, description, releaseYear, country, genre } = data;
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Dialog.Body>
        <Field.Root invalid={!!errors.movieName}>
          <Field.Label>Tiêu đề phim</Field.Label>
          <Input
            autoFocus
            {...rhfMovieRequest("movieName", {
              required: "Vui lòng nhập tiêu đề phim",
            })}
            type="email"
            name="movieName"
            className={`border text-gray-50 ${
              !errors.movieName
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Nhập tiêu đề phim"
          />
          <Field.ErrorText>{errors.movieName?.message}</Field.ErrorText>
        </Field.Root>
      </Dialog.Body>
    </form>
  );
};

export default MovieRequestForm;
