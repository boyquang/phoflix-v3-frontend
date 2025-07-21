"use client";

import {
  Box,
  Button,
  Field,
  Popover,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { MovieRequestProcess } from "./TableMovieRequest";
import { useEffect, useState } from "react";

const options = [
  { value: "approved", label: "Hoàn thành" },
  { value: "rejected", label: "Hủy bỏ" },
];

interface PopoverMovieRequestProps {
  movieRequest: MovieRequest;
  loading: boolean;
  onClickSubmit: (agrs: MovieRequestProcess) => Promise<boolean>;
}

const PopoverMovieRequest = ({
  movieRequest,
  loading,
  onClickSubmit,
}: PopoverMovieRequestProps) => {
  const [status, setStatus] = useState<MovieRequestStatus | null>(null);
  const [response, setResponse] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (movieRequest) {
      setStatus(movieRequest.status || null);
      setResponse(movieRequest.admin_response || "");
    }
  }, [movieRequest]);

  const handleClick = async (agrs: MovieRequestProcess) => {
    const status = await onClickSubmit(agrs);

    if (status) {
      setStatus(agrs.status);
      setOpen(false);
      setResponse(agrs.adminResponse || "");
    }
  };

  return (
    <Popover.Root
      open={open}
      autoFocus={false}
      positioning={{ placement: "bottom-end" }}
    >
      <Popover.Trigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          size="xs"
          className="border border-[#ffffff10] text-white bg-transparent rounded-md hover:border-[#ffd875] hover:text-[#ffd875] transition"
        >
          Xử lý
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner
          css={{
            zIndex: "123 !important",
          }}
        >
          <Popover.Arrow />
          <Popover.Content className="p-4 max-w-[360px] rounded-lg bg-white">
            <Box className="flex flex-col gap-4">
              <Field.Root>
                <Field.Label>Trạng thái</Field.Label>
                <select
                  value={status || ""}
                  onChange={(e) =>
                    setStatus(e.target.value as "approved" | "rejected")
                  }
                  className="w-full border h-10 px-3 border-gray-600 text-while rounded-sm focus:border-gray-50"
                >
                  <option className="text-black" value="">
                    --- Chọn trạng thái ---
                  </option>
                  {options.map((option) => (
                    <option
                      key={option.value}
                      className="text-black"
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field.Root>
              <Field.Root>
                <Field.Label>Phản hồi</Field.Label>
                <Textarea
                  onChange={(e) => setResponse(e.target.value)}
                  variant="outline"
                  autoresize
                  resize="none"
                  maxLength={500}
                  value={response}
                  className="border-gray-600"
                  placeholder="Nhập phản hồi của bạn tại đây"
                ></Textarea>
              </Field.Root>
              <Box className="flex items-center gap-4 ml-auto">
                <Button
                  onClick={() => setOpen(false)}
                  size="xs"
                  colorPalette="gray"
                  variant="subtle"
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={() => {
                    handleClick({
                      movieRequestId: movieRequest.id,
                      status,
                      adminResponse: response,
                    });
                  }}
                  loading={loading}
                  size="xs"
                  className="border-none shadow-primary bg-primary linear-gradient text-gray-900"
                >
                  Hoàn thành
                </Button>
              </Box>
            </Box>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverMovieRequest;
