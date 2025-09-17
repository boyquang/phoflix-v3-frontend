"use client";

import {
  addNewEpisode,
  addNewServerData,
  deleteEpisode,
  deleteServerData,
  setEpisode,
  setServerName,
} from "@/store/slices/crawl-movies.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Field, IconButton, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const EpisodesEditor = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movieDetail } = useSelector((state: RootState) => state.crawlMovies);
  const [values, setValues] = useState<EpisodesMovie[]>(
    movieDetail?.episodes || []
  );

  useEffect(() => {
    setValues(structuredClone(movieDetail?.episodes || []));
  }, [movieDetail?.episodes]);

  const handleChangeEpisodeField = (
    field: "name" | "link_m3u8",
    value: string,
    serverIndex: number,
    episodeIndex: number
  ) => {
    setValues((prev) => {
      const newValues = structuredClone(prev);
      newValues[serverIndex].server_data[episodeIndex][field] = value;
      return newValues;
    });
  };

  const handleBlurEpisodeField = (
    field: "name" | "link_m3u8",
    serverIndex: number,
    episodeIndex: number
  ) => {
    dispatch(
      setEpisode({
        serverIndex,
        episodeIndex,
        field,
        value: values[serverIndex]?.server_data[episodeIndex]?.[field] || "",
      })
    );
  };

  return (
    <Box className="w-full">
      {movieDetail?.episodes?.map((episode, serverIndex) => (
        <Box className="flex flex-col gap-4 mb-12 last:mb-0" key={serverIndex}>
          <Field.Root>
            <Field.Label>Tên máy chủ phát</Field.Label>
            <Input
              onChange={(e) =>
                setValues((prev) => {
                  const newValues = structuredClone(prev); // deep clone
                  newValues[serverIndex].server_name = e.target.value;
                  return newValues;
                })
              }
              onBlur={(e) => {
                dispatch(
                  setServerName({
                    serverIndex,
                    value: values[serverIndex]?.server_name || "",
                  })
                );
              }}
              placeholder="Tên máy chủ phát (phim nhanh, FPT play, ...)"
              className=" w-full border text-gray-50 focus:border focus:border-gray-50 border-gray-600 rounded-md bg-transparent"
              value={values[serverIndex]?.server_name || ""}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Danh sách tập phim</Field.Label>
            <Box className="flex flex-col lg:gap-4 gap-8 flex-1 w-full">
              {episode.server_data.map((item, index) => (
                <Box
                  className="flex lg:items-center gap-4 lg:flex-row flex-col w-full"
                  key={`${index}-episode`}
                >
                  <Input
                    onChange={(e) =>
                      handleChangeEpisodeField(
                        "name",
                        e.target.value,
                        serverIndex,
                        index
                      )
                    }
                    onBlur={(e) => {
                      handleBlurEpisodeField("name", serverIndex, index);
                    }}
                    key={`${index}-name`}
                    placeholder="Tên tập phim (vd: Tập 1, Tập 2, ...)"
                    className="w-full border min-h-10 flex-1 text-gray-50 focus:border focus:border-gray-50 border-gray-600 rounded-md bg-transparent"
                    value={values[serverIndex]?.server_data[index]?.name || ""}
                  />
                  <Input
                    onBlur={(e) => {
                      handleBlurEpisodeField("link_m3u8", serverIndex, index);
                    }}
                    onChange={(e) =>
                      handleChangeEpisodeField(
                        "link_m3u8",
                        e.target.value,
                        serverIndex,
                        index
                      )
                    }
                    key={`${index}-linkM3u8`}
                    placeholder="Link M3U8 tập phim (đường dẫn video)"
                    className="w-full min-h-10 border flex-2 text-gray-50 focus:border focus:border-gray-50 border-gray-600 rounded-md bg-transparent"
                    value={
                      values[serverIndex]?.server_data[index]?.link_m3u8 || ""
                    }
                  />
                  <IconButton
                    onClick={() =>
                      dispatch(
                        deleteEpisode({ serverIndex, episodeIndex: index })
                      )
                    }
                    className="bg-red-500 col-span-12 lg:col-span-1 text-white rounded-md px-4 py-2 hover:opacity-80"
                  >
                    <FaTrash />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Box className="flex lg:mx-auto lg:w-auto w-full items-center gap-4 mt-6">
              <Button
                onClick={() => dispatch(addNewEpisode({ serverIndex }))}
                className="bg-sky-400 lg:w-auto flex-1 text-black hover:opacity-80 mt-2"
              >
                <IoIosAddCircle />
                Thêm tập phim
              </Button>
              <Button
                onClick={() => dispatch(deleteServerData({ serverIndex }))}
                className="bg-red-500 text-white lg:w-auto flex-1 hover:opacity-80 mt-2"
              >
                <FaTrash />
                Xóa server
              </Button>
            </Box>
          </Field.Root>
        </Box>
      ))}
      <Button
        className="bg-sky-400 text-black hover:opacity-80 mt-2 lg:w-auto w-full"
        onClick={() => {
          dispatch(addNewServerData());
        }}
      >
        <IoIosAddCircle />
        Thêm server
      </Button>
    </Box>
  );
};

export default EpisodesEditor;
