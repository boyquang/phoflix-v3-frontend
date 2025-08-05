/*
  Bỏ chú thích các phần tử trong CountriesConfig và CategoriesConfig nếu muốn hiển thị
  các mục này trong giao diện người dùng.
  Nếu không, chỉ cần giữ lại các phần tử trong initialMovieConfig mà bạn muốn hiển thị.
*/

// Số lượng hiển thị phim khi load thêm
export const quantitySectionMovie = 3;
export const initShowMovieSSR = 3;

export interface MovieConfigItem {
  index: number;
  title: string;
  link: string;
  type:
    | "phim-le"
    | "phim-bo"
    | "tv-shows"
    | "hoat-hinh"
    | "phim-vietsub"
    | "phim-thuyet-minh"
    | "phim-long-tieng"
    | Categories
    | Countries;
  describe: "danh-sach" | "quoc-gia" | "the-loai";
  orientation: "horizontal" | "vertical";
}

const CountriesConfig: MovieConfigItem[] = [
  {
    index: 0,
    title: "Phim Việt Nam",
    link: "/chi-tiet/quoc-gia/viet-nam",
    type: "viet-nam",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  {
    index: 1,
    title: "Phim Trung Quốc",
    link: "/chi-tiet/quoc-gia/trung-quoc",
    type: "trung-quoc",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  {
    index: 2,
    title: "Phim Hàn Quốc",
    link: "/chi-tiet/quoc-gia/han-quoc",
    type: "han-quoc",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  // {
  //   index: 3,
  //   title: "Siêu phẩm Thái Lan",
  //   link: "/chi-tiet/quoc-gia/thai-lan",
  //   type: "thai-lan",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 4,
  //   title: "Huyền thoại Hồng Kông",
  //   link: "/chi-tiet/quoc-gia/hong-kong",
  //   type: "hong-kong",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 5,
  //   title: "Tuyệt tác điện ảnh Pháp",
  //   link: "/chi-tiet/quoc-gia/phap",
  //   type: "phap",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 6,
  //   title: "Điện ảnh Đức đỉnh cao",
  //   link: "/chi-tiet/quoc-gia/duc",
  //   type: "duc",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 7,
  //   title: "Phim Hà Lan đầy sáng tạo",
  //   link: "/chi-tiet/quoc-gia/ha-lan",
  //   type: "ha-lan",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 8,
  //   title: "Tinh hoa Mexico",
  //   link: "/chi-tiet/quoc-gia/mexico",
  //   type: "mexico",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 9,
  //   title: "Phim Thụy Điển độc đáo",
  //   link: "/chi-tiet/quoc-gia/thuy-dien",
  //   type: "thuy-dien",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 10,
  //   title: "Điện ảnh Philippines mãn nhãn",
  //   link: "/chi-tiet/quoc-gia/philippines",
  //   type: "philippines",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 11,
  //   title: "Siêu phẩm Đan Mạch",
  //   link: "/chi-tiet/quoc-gia/dan-mach",
  //   type: "dan-mach",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 12,
  //   title: "Tuyệt tác Thụy Sĩ",
  //   link: "/chi-tiet/quoc-gia/thuy-si",
  //   type: "thuy-si",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 13,
  //   title: "Điện ảnh Ukraina bùng nổ",
  //   link: "/chi-tiet/quoc-gia/ukraina",
  //   type: "ukraina",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 14,
  //   title: "Tuyệt tác Âu - Mỹ",
  //   link: "/chi-tiet/quoc-gia/au-my",
  //   type: "au-my",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 15,
  //   title: "Điện ảnh Ấn Độ hoành tráng",
  //   link: "/chi-tiet/quoc-gia/an-do",
  //   type: "an-do",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 16,
  //   title: "Phim Canada ấn tượng",
  //   link: "/chi-tiet/quoc-gia/canada",
  //   type: "canada",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 17,
  //   title: "Điện ảnh Tây Ban Nha",
  //   link: "/chi-tiet/quoc-gia/tay-ban-nha",
  //   type: "tay-ban-nha",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 18,
  //   title: "Siêu phẩm Indonesia",
  //   link: "/chi-tiet/quoc-gia/indonesia",
  //   type: "indonesia",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 19,
  //   title: "Điện ảnh Ba Lan",
  //   link: "/chi-tiet/quoc-gia/ba-lan",
  //   type: "ba-lan",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 20,
  //   title: "Phim Malaysia đặc sắc",
  //   link: "/chi-tiet/quoc-gia/malaysia",
  //   type: "malaysia",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 21,
  //   title: "Huyền thoại Bồ Đào Nha",
  //   link: "/chi-tiet/quoc-gia/bo-dao-nha",
  //   type: "bo-dao-nha",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 22,
  //   title: "Điện ảnh UAE",
  //   link: "/chi-tiet/quoc-gia/uae",
  //   type: "uae",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 23,
  //   title: "Phim châu Phi độc đáo",
  //   link: "/chi-tiet/quoc-gia/chau-phi",
  //   type: "chau-phi",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 24,
  //   title: "Siêu phẩm Ả Rập Xê Út",
  //   link: "/chi-tiet/quoc-gia/a-rap-xe-ut",
  //   type: "a-rap-xe-ut",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 25,
  //   title: "Điện ảnh Nhật Bản",
  //   link: "/chi-tiet/quoc-gia/nhat-ban",
  //   type: "nhat-ban",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 26,
  //   title: "Phim Đài Loan hấp dẫn",
  //   link: "/chi-tiet/quoc-gia/dai-loan",
  //   type: "dai-loan",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 27,
  //   title: "Điện ảnh Anh quốc",
  //   link: "/chi-tiet/quoc-gia/anh",
  //   type: "anh",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 28,
  //   title: "Siêu phẩm từ nhiều quốc gia",
  //   link: "/chi-tiet/quoc-gia/quoc-gia-khac",
  //   type: "quoc-gia-khac",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 29,
  //   title: "Phim Thổ Nhĩ Kỳ đặc sắc",
  //   link: "/chi-tiet/quoc-gia/tho-nhi-ky",
  //   type: "tho-nhi-ky",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 30,
  //   title: "Điện ảnh Nga",
  //   link: "/chi-tiet/quoc-gia/nga",
  //   type: "nga",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 31,
  //   title: "Phim Úc cực hay",
  //   link: "/chi-tiet/quoc-gia/uc",
  //   type: "uc",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 32,
  //   title: "Điện ảnh Brazil",
  //   link: "/chi-tiet/quoc-gia/brazil",
  //   type: "brazil",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 33,
  //   title: "Huyền thoại điện ảnh Ý",
  //   link: "/chi-tiet/quoc-gia/y",
  //   type: "y",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
  // {
  //   index: 34,
  //   title: "Phim Na Uy đầy cảm xúc",
  //   link: "/chi-tiet/quoc-gia/na-uy",
  //   type: "na-uy",
  //   describe: "quoc-gia",
  //   orientation: "horizontal",
  // },
];

const CategoriesConfig: MovieConfigItem[] = [
  {
    index: 35,
    title: "Hành động đỉnh cao",
    link: "/chi-tiet/the-loai/hanh-dong",
    type: "hanh-dong",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 36,
    title: "Rùng rợn đến tột cùng",
    link: "/chi-tiet/the-loai/kinh-di",
    type: "kinh-di",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 37,
    title: "Cảm xúc dâng trào",
    link: "/chi-tiet/the-loai/tinh-cam",
    type: "tinh-cam",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 38,
    title: "Khoảnh khắc gia đình",
    link: "/chi-tiet/the-loai/gia-dinh",
    type: "gia-dinh",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 39,
    title: "Cổ trang kinh điển",
    link: "/chi-tiet/the-loai/co-trang",
    type: "co-trang",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 40,
    title: "Khoa học viễn tưởng",
    link: "/chi-tiet/the-loai/vien-tuong",
    type: "vien-tuong",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 41,
    title: "Phiêu lưu kỳ thú",
    link: "/chi-tiet/the-loai/phieu-luu",
    type: "phieu-luu",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 42,
    title: "Cười không nhặt được mồm",
    link: "/chi-tiet/the-loai/hai-huoc",
    type: "hai-huoc",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 43,
    title: "Nhạc là chân ái",
    link: "/chi-tiet/the-loai/am-nhac",
    type: "am-nhac",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 44,
    title: "Bí ẩn đầy kịch tính",
    link: "/chi-tiet/the-loai/bi-an",
    type: "bi-an",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 45,
    title: "Chiến tranh khốc liệt",
    link: "/chi-tiet/the-loai/chien-tranh",
    type: "chien-tranh",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 46,
    title: "Drama học đường",
    link: "/chi-tiet/the-loai/hoc-duong",
    type: "hoc-duong",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 47,
    title: "Thần thoại huyền bí",
    link: "/chi-tiet/the-loai/than-thoai",
    type: "than-thoai",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 48,
    title: "Hình sự gay cấn",
    link: "/chi-tiet/the-loai/hinh-su",
    type: "hinh-su",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 49,
    title: "Khoa học kỳ thú",
    link: "/chi-tiet/the-loai/khoa-hoc",
    type: "khoa-hoc",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 50,
    title: "Chính kịch cuốn hút",
    link: "/chi-tiet/the-loai/chinh-kich",
    type: "chinh-kich",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 51,
    title: "Tài liệu khám phá",
    link: "/chi-tiet/the-loai/tai-lieu",
    type: "tai-lieu",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 52,
    title: "Võ thuật mãn nhãn",
    link: "/chi-tiet/the-loai/vo-thuat",
    type: "vo-thuat",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 53,
    title: "Tâm lý sâu sắc",
    link: "/chi-tiet/the-loai/tam-ly",
    type: "tam-ly",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    index: 54,
    title: "Lịch sử hào hùng",
    link: "/chi-tiet/the-loai/lich-su",
    type: "lich-su",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    index: 55,
    title: "Kinh điển bất hủ",
    link: "/chi-tiet/the-loai/kinh-dien",
    type: "kinh-dien",
    describe: "the-loai",
    orientation: "vertical",
  },
  // {
  //   index: 56,
  //   title: "Giải trí người lớn 18+",
  //   link: "/chi-tiet/the-loai/phim-18",
  //   type: "phim-18",
  //   describe: "the-loai",
  //   orientation: "vertical",
  // },
];

export const initialMovieConfig: MovieConfigItem[] = [
  ...CountriesConfig,
  ...CategoriesConfig,
];

//////////////////////////////////////////////////////////////////

export const categories = [
  {
    _id: "9822be111d2ccc29c7172c78b8af8ff5",
    name: "Hành Động",
    slug: "hanh-dong",
  },
  {
    _id: "3a17c7283b71fa84e5a8d76fb790ed3e",
    name: "Cổ Trang",
    slug: "co-trang",
  },
  {
    _id: "1bae5183d681b7649f9bf349177f7123",
    name: "Chiến Tranh",
    slug: "chien-tranh",
  },
  {
    _id: "68564911f00849030f9c9c144ea1b931",
    name: "Viễn Tưởng",
    slug: "vien-tuong",
  },
  {
    _id: "4db8d7d4b9873981e3eeb76d02997d58",
    name: "Kinh Dị",
    slug: "kinh-di",
  },
  {
    _id: "1645fa23fa33651cef84428b0dcc2130",
    name: "Tài Liệu",
    slug: "tai-lieu",
  },
  {
    _id: "0c853f6238e0997ee318b646bb1978bc",
    name: "Trẻ Em",
    slug: "tre-em",
  },
  {
    _id: "f8ec3e9b77c509fdf64f0c387119b916",
    name: "Lịch Sử",
    slug: "lich-su",
  },
  {
    _id: "2fb53017b3be83cd754a08adab3e916c",
    name: "Bí Ẩn",
    slug: "bi-an",
  },
  {
    _id: "4b4457a1af8554c282dc8ac41fd7b4a1",
    name: "Phim 18+",
    slug: "phim-18",
  },
  {
    _id: "bb2b4b030608ca5984c8dd0770f5b40b",
    name: "Tình Cảm",
    slug: "tinh-cam",
  },
  {
    _id: "a7b065b92ad356387ef2e075dee66529",
    name: "Tâm Lý",
    slug: "tam-ly",
  },
  {
    _id: "591bbb2abfe03f5aa13c08f16dfb69a2",
    name: "Thể Thao",
    slug: "the-thao",
  },
  {
    _id: "66c78b23908113d478d8d85390a244b4",
    name: "Phiêu Lưu",
    slug: "phieu-luu",
  },
  {
    _id: "252e74b4c832ddb4233d7499f5ed122e",
    name: "Âm Nhạc",
    slug: "am-nhac",
  },
  {
    _id: "a2492d6cbc4d58f115406ca14e5ec7b6",
    name: "Gia Đình",
    slug: "gia-dinh",
  },
  {
    _id: "01c8abbb7796a1cf1989616ca5c175e6",
    name: "Học Đường",
    slug: "hoc-duong",
  },
  {
    _id: "ba6fd52e5a3aca80eaaf1a3b50a182db",
    name: "Hài Hước",
    slug: "hai-huoc",
  },
  {
    _id: "7a035ac0b37f5854f0f6979260899c90",
    name: "Hình Sự",
    slug: "hinh-su",
  },
  {
    _id: "578f80eb493b08d175c7a0c29687cbdf",
    name: "Võ Thuật",
    slug: "vo-thuat",
  },
  {
    _id: "0bcf4077916678de9b48c89221fcf8ae",
    name: "Khoa Học",
    slug: "khoa-hoc",
  },
  {
    _id: "2276b29204c46f75064735477890afd6",
    name: "Thần Thoại",
    slug: "than-thoai",
  },
  {
    _id: "37a7b38b6184a5ebd3c43015aa20709d",
    name: "Chính Kịch",
    slug: "chinh-kich",
  },
  {
    _id: "268385d0de78827ff7bb25c35036ee2a",
    name: "Kinh Điển",
    slug: "kinh-dien",
  },
];

export const countries = [
  {
    _id: "f6ce1ae8b39af9d38d653b8a0890adb8",
    name: "Việt Nam",
    slug: "viet-nam",
  },
  {
    _id: "3e075636c731fe0f889c69e0bf82c083",
    name: "Trung Quốc",
    slug: "trung-quoc",
  },
  {
    _id: "cefbf1640a17bad1e13c2f6f2a811a2d",
    name: "Thái Lan",
    slug: "thai-lan",
  },
  {
    _id: "dcd5551cbd22ea2372726daafcd679c1",
    name: "Hồng Kông",
    slug: "hong-kong",
  },
  {
    _id: "92f688188aa938a03a61a786d6616dcb",
    name: "Pháp",
    slug: "phap",
  },
  {
    _id: "24a5bf049aeef94ab79bad1f73f16b92",
    name: "Đức",
    slug: "duc",
  },
  {
    _id: "41487913363f08e29ea07f6fdfb49a41",
    name: "Hà Lan",
    slug: "ha-lan",
  },
  {
    _id: "8dbb07a18d46f63d8b3c8994d5ccc351",
    name: "Mexico",
    slug: "mexico",
  },
  {
    _id: "61709e9e6ca6ca8245bc851c0b781673",
    name: "Thụy Điển",
    slug: "thuy-dien",
  },
  {
    _id: "77dab2f81a6c8c9136efba7ab2c4c0f2",
    name: "Philippines",
    slug: "philippines",
  },
  {
    _id: "208c51751eff7e1480052cdb4e26176a",
    name: "Đan Mạch",
    slug: "dan-mach",
  },
  {
    _id: "69e561770d6094af667b9361f58f39bd",
    name: "Thụy Sĩ",
    slug: "thuy-si",
  },
  {
    _id: "c338f80e38dd2381f8faf9eccb6e6c1c",
    name: "Ukraina",
    slug: "ukraina",
  },
  {
    _id: "05de95be5fc404da9680bbb3dd8262e6",
    name: "Hàn Quốc",
    slug: "han-quoc",
  },
  {
    _id: "74d9fa92f4dea9ecea8fc2233dc7921a",
    name: "Âu Mỹ",
    slug: "au-my",
  },
  {
    _id: "aadd510492662beef1a980624b26c685",
    name: "Ấn Độ",
    slug: "an-do",
  },
  {
    _id: "445d337b5cd5de476f99333df6b0c2a7",
    name: "Canada",
    slug: "canada",
  },
  {
    _id: "8a40abac202ab3659bb98f71f05458d1",
    name: "Tây Ban Nha",
    slug: "tay-ban-nha",
  },
  {
    _id: "4647d00cf81f8fb0ab80f753320d0fc9",
    name: "Indonesia",
    slug: "indonesia",
  },
  {
    _id: "59317f665349487a74856ac3e37b35b5",
    name: "Ba Lan",
    slug: "ba-lan",
  },
  {
    _id: "3f0e49c46cbde0c7adf5ea04a97ab261",
    name: "Malaysia",
    slug: "malaysia",
  },
  {
    _id: "fcd5da8ea7e4bf894692933ee3677967",
    name: "Bồ Đào Nha",
    slug: "bo-dao-nha",
  },
  {
    _id: "b6ae56d2d40c99fc293aefe45dcb3b3d",
    name: "UAE",
    slug: "uae",
  },
  {
    _id: "471cdb11e01cf8fcdafd3ab5cd7b4241",
    name: "Châu Phi",
    slug: "chau-phi",
  },
  {
    _id: "cc85d02a69f06f7b43ab67f5673604a3",
    name: "Ả Rập Xê Út",
    slug: "a-rap-xe-ut",
  },
  {
    _id: "d4097fbffa8f7149a61281437171eb83",
    name: "Nhật Bản",
    slug: "nhat-ban",
  },
  {
    _id: "559fea9881e3a6a3e374b860fa8fb782",
    name: "Đài Loan",
    slug: "dai-loan",
  },
  {
    _id: "932bbaca386ee0436ad0159117eabae4",
    name: "Anh",
    slug: "anh",
  },
  {
    _id: "45a260effdd4ba38e861092ae2a1b96a",
    name: "Quốc Gia Khác",
    slug: "quoc-gia-khac",
  },
  {
    _id: "8931caa7f43ee5b07bf046c8300f4eba",
    name: "Thổ Nhĩ Kỳ",
    slug: "tho-nhi-ky",
  },
  {
    _id: "2dbf49dd0884691f87e44769a3a3a29e",
    name: "Nga",
    slug: "nga",
  },
  {
    _id: "435a85571578e419ed511257881a1e75",
    name: "Úc",
    slug: "uc",
  },
  {
    _id: "42537f0fb56e31e20ab9c2305752087d",
    name: "Brazil",
    slug: "brazil",
  },
  {
    _id: "a30878a7fdb6a94348fce16d362edb11",
    name: "Ý",
    slug: "y",
  },
  {
    _id: "638f494a6d33cf5760f6e95c8beb612a",
    name: "Na Uy",
    slug: "na-uy",
  },
];

export const movieCatalog: TypeMovie[] = [
  { _id: "1", name: "Phim Lẻ", slug: "phim-le", type: "danh-sach" },
  { _id: "2", name: "Phim Bộ", slug: "phim-bo", type: "danh-sach" },
  {
    _id: "3",
    name: "Phim Hoạt Hình",
    slug: "hoat-hinh",
    type: "danh-sach",
  },
  {
    _id: "4",
    name: "Phim Truyền Hình",
    slug: "tv-shows",
    type: "danh-sach",
  },
  {
    _id: "5",
    name: "Phim Phụ Đề",
    slug: "phim-vietsub",
    type: "danh-sach",
  },
  {
    _id: "6",
    name: "Phim Lồng Tiếng",
    slug: "phim-long-tieng",
    type: "danh-sach",
  },
  {
    _id: "7",
    name: "Phim Thuyết Minh",
    slug: "phim-thuyet-minh",
    type: "danh-sach",
  },
  {
    _id: "8",
    name: "Phim Chiếu Rạp",
    slug: "phim-chieu-rap",
    type: "danh-sach",
  },
  { _id: "9", name: "Phim Độc Quyền", slug: "subteam", type: "danh-sach" },
];
