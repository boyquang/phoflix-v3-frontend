import { categories, countries } from "@/constants/movie.contant";

export const charactors = [
  { _id: "a", name: "a", slug: "a" },
  { _id: "b", name: "b", slug: "b" },
  { _id: "c", name: "c", slug: "c" },
  { _id: "d", name: "d", slug: "d" },
  { _id: "e", name: "e", slug: "e" },
  { _id: "f", name: "f", slug: "f" },
  { _id: "g", name: "g", slug: "g" },
  { _id: "h", name: "h", slug: "h" },
  { _id: "i", name: "i", slug: "i" },
  { _id: "j", name: "j", slug: "j" },
  { _id: "k", name: "k", slug: "k" },
  { _id: "l", name: "l", slug: "l" },
  { _id: "m", name: "m", slug: "m" },
  { _id: "n", name: "n", slug: "n" },
  { _id: "o", name: "o", slug: "o" },
  { _id: "p", name: "p", slug: "p" },
  { _id: "q", name: "q", slug: "q" },
  { _id: "r", name: "r", slug: "r" },
  { _id: "s", name: "s", slug: "s" },
  { _id: "t", name: "t", slug: "t" },
  { _id: "u", name: "u", slug: "u" },
  { _id: "v", name: "v", slug: "v" },
  { _id: "w", name: "w", slug: "w" },
  { _id: "x", name: "x", slug: "x" },
  { _id: "y", name: "y", slug: "y" },
  { _id: "z", name: "z", slug: "z" },
  { _id: "0", name: "0", slug: "0" },
  { _id: "1", name: "1", slug: "1" },
  { _id: "2", name: "2", slug: "2" },
  { _id: "3", name: "3", slug: "3" },
  { _id: "4", name: "4", slug: "4" },
  { _id: "5", name: "5", slug: "5" },
  { _id: "6", name: "6", slug: "6" },
  { _id: "7", name: "7", slug: "7" },
  { _id: "8", name: "8", slug: "8" },
  { _id: "9", name: "9", slug: "9" },
];

/////////////////////////////////////////////////////////////
const currentYear = new Date().getFullYear();
const numberOfYear = 22;
const recentYears = Array.from({ length: numberOfYear }, (_, i) => {
  return {
    id: currentYear - i,
    name: currentYear - i,
    slug: currentYear - i,
  };
});

export const filterOptions = [
  {
    data: [{ _id: "", name: "Tất cả", slug: "" }, ...countries],
    id: "country",
    title: "Quốc gia",
  },
  {
    data: [{ _id: "", name: "Tất cả", slug: "" }, ...categories],
    id: "category",
    title: "Thể loại",
  },
  {
    data: [{ _id: "", name: "Tất cả", slug: "" }, ...recentYears],
    id: "year",
    title: "Năm sản xuất",
  },
  {
    data: [
      { _id: "", name: "Tất cả", slug: "" },
      { _id: "vietsub", name: "Phụ đề", slug: "vietsub" },
      { _id: "thuyetminh", name: "Thuyết Minh", slug: "thuyet-minh" },
      { _id: "longtieng", name: "Lồng Tiếng", slug: "long-tieng" },
    ],
    id: "sort_lang",
    title: "Phiên bản",
  },
  {
    data: [
      { _id: "desc", name: "Mới nhất", slug: "desc" },
      { _id: "asc", name: "Cũ nhất", slug: "asc" },
    ],
    id: "sort_type",
    title: "Sắp xếp",
  },
];
