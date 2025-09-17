"use client";

import CheckboxCustom from "@/components/shared/CheckboxCustom";
import { setMovieDetailField } from "@/store/slices/crawl-movies.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

interface MetaFieldsProps {
  type: "countries" | "categories";
  data: CountriesWithAll[] | CategoryWithAll[];
}

const MetaFields = ({ type, data }: MetaFieldsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { movieDetail } = useSelector((state: RootState) => state.crawlMovies);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    slug: string
  ) => {
    const field = type === "countries" ? "countries" : "categories";

    if (e.target.checked) {
      const newData = [...(movieDetail?.[field] ?? []), slug];
      dispatch(setMovieDetailField({ field, value: newData }));
    } else {
      const newData = movieDetail?.[field]?.filter((s) => s !== slug);
      dispatch(setMovieDetailField({ field, value: newData ?? [] }));
    }
  };

  return (
    <div className="flex flex-wrap gap-6">
      {data?.map((item, index) => (
        <CheckboxCustom
          key={index}
          label={item.name}
          color="primary"
          checked={
            type === "countries"
              ? movieDetail?.countries.includes(item.slug) ?? false
              : movieDetail?.categories.includes(item.slug) ?? false
          }
          onChange={(e) => handleChangeCheckbox(e, item.slug)}
        />
      ))}
    </div>
  );
};

export default MetaFields;
