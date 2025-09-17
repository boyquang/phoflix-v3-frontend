"use client";

import CheckboxCustom from "@/components/shared/CheckboxCustom";
import { appConfig } from "@/configs/app.config";
import {
  defaultInputValues,
  movieDetailDefault,
  setMovieDetailField,
  setMovieDetailJson,
} from "@/store/slices/crawl-movies.slice";
import { AppDispatch, RootState } from "@/store/store";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaFields from "./MetaFields";
import { categories, countries } from "@/constants/movie.contant";
import EpisodesEditor from "./EpisodesEditor";
import { createNewMovie } from "@/lib/actions/movie.action";
import { toast } from "sonner";
import { generateSlug } from "@/lib/utils";
import PasteDataJson from "./PasteDataJson";
import MultiNameInput from "./MultiNameInput";
import { updateMovie } from "@/lib/actions/movie.action";
import FieldInput from "./FieldInput";
import { useRouter } from "next/navigation";

const { dialog } = appConfig.charka;
const motionPresetDefault = dialog.motionPresetDefault;

interface MovieActionsDialogProps {
  action: "create" | "update";
  trigger: React.ReactNode;
  data?: Movie & { episodes: Episode[] | null };
}

export const inputClasseDefault =
  "border text-gray-50 focus:border rounded-md focus:border-gray-50 border-gray-600";

const basicFields = [
  {
    label: "Tên phim",
    name: "name",
    type: "text",
    required: true,
    helpText: " Vượt ngục",
  },
  {
    label: "Tên phim gốc",
    name: "origin_name",
    type: "text",
    required: true,
    helpText: " Prison Break",
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
    required: true,
    helpText: " vuot-nguc",
  },
  {
    label: "Ngôn ngữ",
    name: "lang",
    type: "text",
    required: true,
    helpText: "Vietsub, Thuyết minh, Lồng tiếng",
  },
  {
    label: "Poster URL",
    name: "poster_url",
    type: "text",
    required: true,
    helpText: " https://example.com/poster.jpg",
  },
  {
    label: "Thumb URL",
    name: "thumb_url",
    type: "text",
    required: true,
    helpText: " https://example.com/thumb.jpg",
  },
  {
    label: "Năm sản xuất",
    name: "year",
    type: "number",
    required: true,
    helpText: " 2020",
  },
  {
    label: "Tập hiện tại",
    name: "episode_current",
    type: "text",
    required: false,
    helpText: " 12 (để trống nếu là phim lẻ)",
  },
  {
    label: "Tổng số tập",
    name: "episode_total",
    type: "text",
    required: false,
    helpText: " 24 (để trống nếu là phim lẻ)",
  },

  {
    label: "Trailer URL",
    name: "trailer_url",
    type: "text",
    required: false,
    helpText: " https://example.com/trailer.mp4",
  },
  {
    label: "Thời lượng",
    name: "time",
    type: "text",
    required: false,
    helpText: " 120 phút",
  },
  {
    label: "TMDB ID",
    name: "tmdb.id",
    type: "number",
    required: false,
    helpText: " 12345",
  },
  {
    label: "Season",
    name: "tmdb.season",
    type: "number",
    required: false,
    helpText: " 1",
  },
  {
    label: "Điểm trung bình",
    name: "tmdb.vote_average",
    type: "number",
    required: false,
    helpText: " 8.5",
  },
  {
    label: "Số lượt bình chọn",
    name: "tmdb.vote_count",
    type: "number",
    required: false,
    helpText: " 1500",
  },
];

const checkboxFields = [
  { label: "Phim chiếu rạp", name: "is_cinema", required: false },
  { label: "Sub độc quyền", name: "sub_docquyen", required: false },
];

const selectMovieTypeOptions = [
  { label: "Phim lẻ", value: "single" },
  { label: "Phim bộ", value: "series" },
  { label: "Phim hoạt hình", value: "hoathinh" },
  { label: "Chương trình truyền hình", value: "tvshows" },
];

const selectTmdbTypeOptions = [
  { label: "Movie", value: "movie" },
  { label: "Tv", value: "tv" },
];

const selectQualityOptions = [
  { label: "HD", value: "HD" },
  { label: "FullHD", value: "FullHD" },
  { label: "Cam", value: "Cam" },
  { label: "HDCam", value: "HDCam" },
  { label: "Trailer", value: "Trailer" },
];

const selectDataMapping = {
  "tmdb.type": {
    label: "TMDB Type",
    data: selectTmdbTypeOptions,
  },
  type: {
    label: "Loại phim",
    data: selectMovieTypeOptions,
  },
  quality: {
    label: "Chất lượng",
    data: selectQualityOptions,
  },
};

const MovieActionsDialog = ({
  action = "create",
  trigger,
  data,
}: MovieActionsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const { movieDetail } = useSelector((state: RootState) => state.crawlMovies);

  useEffect(() => {
    if (action === "create") {
      dispatch(setMovieDetailJson(movieDetailDefault));
    }
  }, [open, action]);

  useEffect(() => {
    if (action === "update" && data) {
      const categories = data?.categories?.map((c) => c.slug) || [];
      const countries = data?.countries?.map((c) => c.slug) || [];
      const episodes = data?.episodes?.map((ep) => ({
        server_name: ep.server_name,
        server_data: ep.server_data?.map((sd) => ({
          name: sd.name,
          link_m3u8: sd.link_m3u8,
        })),
      }));

      const finalData = {
        ...data,
        categories,
        countries,
        episodes,
        actors: data?.actors || defaultInputValues,
        directors: data?.directors || defaultInputValues,
      };

      dispatch(setMovieDetailJson(finalData));
    }
  }, [data, open]);

  const handleSubmit = async () => {
    if (!movieDetail) {
      toast.error("Dữ liệu phim không hợp lệ, vui lòng thử lại");
      return;
    }

    if (!session?.user?.accessToken) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    try {
      setLoading(true);
      let res = null;

      if (action === "create") {
        res = await createNewMovie(movieDetail, session?.user?.accessToken);
      } else if (action === "update" && data?._id) {
        res = await updateMovie({
          movieId: data._id,
          movieData: movieDetail,
          accessToken: session?.user?.accessToken as string,
        });
      }

      if (res?.status) {
        setOpen(false);
        toast.success(res.message || "Thao tác thành công");

        if (action === "update") {
          toast.info("Dữ liệu sẽ làm mới sau vài phút, vui lòng chờ!");
          router.push(`/thong-tin-phim/${movieDetail?.slug}?updated=true`);
        }

        dispatch(setMovieDetailField(movieDetailDefault));
      } else {
        toast.error(res?.message || "Thao tác thất bại, vui lòng thử lại");
      }
    } catch (error) {
      console.error("Error submitting movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeValue = (field: string, value: any) => {
    dispatch(setMovieDetailField({ field, value }));

    if (field === "name") {
      dispatch(
        setMovieDetailField({ field: "slug", value: generateSlug(value) })
      );
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
            <Dialog.Header className="flex items-center gap-4">
              <Dialog.Title>
                {action === "create" ? "Thêm phim mới" : "Chỉnh sửa phim"}
              </Dialog.Title>

              <PasteDataJson
                trigger={
                  <Button
                    size="xs"
                    rounded="full"
                    variant="outline"
                    className="text-white hover:bg-white/10"
                  >
                    Dán dữ liệu JSON
                  </Button>
                }
              />
            </Dialog.Header>

            <Dialog.Body>
              <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
                {basicFields.map((field) => (
                  <FieldInput key={field.name} field={field} />
                ))}

                {Object.entries(selectDataMapping).map(
                  ([field, options], index) => (
                    <Field.Root key={field}>
                      <Field.Label>{options.label}</Field.Label>
                      <select
                        name={field}
                        onChange={(e) =>
                          handleChangeValue(field, e.target.value)
                        }
                        className={`w-full ${inputClasseDefault} h-10 p-2 rounded-md bg-transparent text-white`}
                      >
                        {options.data.map((option) => (
                          <option
                            className="text-black"
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field.Root>
                  )
                )}
              </Box>

              <Box className="my-6">
                <FieldInput
                  Tag={Textarea}
                  field={{
                    label: "Nội dung phim",
                    name: "content",
                    type: "text",
                    required: false,
                    helpText: "",
                  }}
                />
              </Box>

              <Box className="flex items-center gap-6">
                {checkboxFields.map((field) => (
                  <Box key={field.name}>
                    <CheckboxCustom
                      checked={
                        (movieDetail as Record<string, any>)[field.name] ||
                        false
                      }
                      onChange={(e) =>
                        handleChangeValue(field.name, e.target.checked)
                      }
                      label={field.label}
                      color="primary"
                      size="small"
                    />
                  </Box>
                ))}
              </Box>

              <Box className="w-full h-[1px] bg-gray-600 my-12" />

              <Box className="flex flex-col gap-6">
                <Field.Root>
                  <Field.Label>Quốc gia</Field.Label>
                  <MetaFields type="countries" data={countries} />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Thể loại</Field.Label>
                  <MetaFields type="categories" data={categories} />
                </Field.Root>
              </Box>

              <Box className="w-full h-[1px] bg-gray-600 my-12" />
              <MultiNameInput type="actors" />
              <Box className="w-full h-[1px] bg-gray-600 my-12" />
              <MultiNameInput type="directors" />
              <Box className="w-full h-[1px] bg-gray-600 my-12" />

              <EpisodesEditor />
            </Dialog.Body>

            <Dialog.Footer className="justify-end gap-2">
              <Button
                variant="outline"
                disabled={loading}
                onClick={() => setOpen(false)}
                className="bg-white text-black hover:opacity-75"
              >
                Hủy
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-primary liner-gradient text-black hover:opacity-75"
              >
                {action === "create" ? "Tạo ngay" : "Cập nhật "}
                {loading && <Spinner size="sm" />}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default MovieActionsDialog;
