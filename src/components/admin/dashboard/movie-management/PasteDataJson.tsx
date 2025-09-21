"use client";

import { appConfig } from "@/configs/app.config";
import { setMovieDetailJson } from "@/store/slices/crawl-movies.slice";
import { AppDispatch } from "@/store/store";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import ReactJson from "react-json-view";

const { dialog } = appConfig.chakra;
const motionPresetDefault = dialog.motionPresetDefault;

interface PasteDataJsonProps {
  trigger: React.ReactNode;
}

const PasteDataJson = ({ trigger }: PasteDataJsonProps) => {
  const [open, setOpen] = useState(false);
  const [jsonData, setJsonData] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();

  const handlePreview = () => {
    try {
      const parsed = JSON.parse(jsonData);
      setParsedData(parsed);
    } catch {
      toast.error("Dữ liệu JSON không hợp lệ.");
      setParsedData(null);
    }
  };

  const handleSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonData);

      const { movie = {}, episodes: eps = [] } = parsedData || {};

      const {
        country = [],
        category = [],
        actor = [],
        director = [],
        ...restMovie
      } = movie;

      const movieDetail = {
        countries: country.map(({ slug }: any) => slug),
        categories: category.map(({ slug }: any) => slug),
        actors: actor,
        directors: director,
        episodes: eps.map(({ server_name = "", server_data = [] }: any) => ({
          server_name,
          server_data: server_data.map(
            ({ name = "", link_m3u8 = "" }: any) => ({
              name,
              link_m3u8,
            })
          ),
        })),
        ...restMovie,
      };

      dispatch(setMovieDetailJson(movieDetail));
      setOpen(false);
      setJsonData("");
      setParsedData(null);
    } catch (error) {
      toast.error("Dữ liệu JSON không hợp lệ. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <Dialog.Root
      size="full"
      open={open}
      motionPreset={motionPresetDefault}
      onOpenChange={({ open }) => setOpen(open)}
      scrollBehavior="outside"
    >
      <Dialog.Trigger asChild>
        <Box>{trigger}</Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content
            className={`relative text-gray-50 bg-[#2a314e] backdrop-blur`}
          >
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>
                Dán dữ liệu JSON từ TMDB hoặc các nguồn khác
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body className="space-y-4">
              <Textarea
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                placeholder="Dán dữ liệu JSON vào đây..."
                size="md"
                rows={10}
                className="bg-[#1e253e] text-gray-50 border border-gray-600 focus:border focus:border-gray-50 rounded-md"
              />

              {parsedData && (
                <div className="flex flex-col gap-2">
                  <span>Xem trước dữ liệu JSON đã phân tích:</span>
                  <div className="bg-[#1e253e] rounded-md p-2 max-h-[400px] overflow-auto">
                    <ReactJson
                      src={parsedData}
                      theme="google"
                      collapsed={2}
                      displayDataTypes={false}
                      displayObjectSize={false}
                    />
                  </div>
                </div>
              )}
            </Dialog.Body>

            <Dialog.Footer className="justify-between gap-2">
              <Box className="flex items-center gap-2">
                <Button
                  onClick={handlePreview}
                  className="bg-blue-500 text-white hover:opacity-75"
                >
                  Xem trước
                </Button>
                <Button
                  onClick={() => {
                    setJsonData("");
                    setParsedData(null);
                  }}
                  className="bg-red-500 text-white hover:opacity-75"
                >
                  Xóa dữ liệu
                </Button>
              </Box>
              <Box className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="bg-white text-black hover:opacity-75"
                >
                  Hủy
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="bg-primary liner-gradient text-black hover:opacity-75"
                >
                  Lưu
                </Button>
              </Box>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PasteDataJson;
