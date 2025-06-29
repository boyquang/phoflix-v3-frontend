type SlideItem = {
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
};

type Movies = {
  items: any;
  loading: boolean;
  error: boolean;
};

type Actor = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
};

type MovieSlice = {
  slideShows: {
    items: SlideItem[];
    loading: boolean;
    error: boolean;
  };
  movieData: Record<string, Movies>;
  actorsListByMovie: {
    items: Actor[];
    loading: boolean;
    error: boolean;
  };
  actorDetail: {
    filter: "all" | "time";
  };
  moviePopular: {
    items: any;
    loading: boolean;
    error: boolean;
    totalPages: number;
    totalResults: number;
  };
  movieEvent: Movies;
  searchMoviePreview: {
    items: any;
    loading: boolean;
    error: boolean;
    totalItems: number;
  };
  movieInfo: {
    movie: any;
    loading: boolean;
    error: boolean;
    episodes: any;
    currentEpisode: any;
  };
  movieDetail: {
    items: any;
    titlePage: string;
    pagination: {
      totalItems: number;
      totalItemsPerPage: number;
      currentPage: number;
      totalPages: number;
    } | null;
    loading: boolean;
    error: boolean;
    fetched: boolean;
  };
  movieSuggestion: {
    items: any;
    loading: boolean;
    error: boolean;
    fetched: boolean;
  };
  searchMovie: {
    items: any;
    loading: boolean;
    error: boolean;
    titlePage: string;
    pagination: {
      totalItems: number;
      totalItemsPerPage: number;
      currentPage: number;
      totalPages: number;
    } | null;
  };
  episode: {
    displayMode: "list" | "tab";
    selectedLanguage: string | null;
    groups: Record<string, { items: any[]; label: string }>;
  };
};

type Categories =
  | "hanh-dong"
  | "lich-su"
  | "co-trang"
  | "chien-tranh"
  | "vien-tuong"
  | "kinh-di"
  | "tai-lieu"
  | "bi-an"
  | "phim-18"
  | "tinh-cam"
  | "tam-ly"
  | "the-thao"
  | "phieu-luu"
  | "am-nhac"
  | "gia-dinh"
  | "hoc-duong"
  | "hai-huoc"
  | "hinh-su"
  | "vo-thuat"
  | "khoa-hoc"
  | "than-thoai"
  | "chinh-kich"
  | "kinh-dien";

type Countries =
  | "viet-nam"
  | "trung-quoc"
  | "thai-lan"
  | "hong-kong"
  | "phap"
  | "duc"
  | "ha-lan"
  | "mexico"
  | "thuy-dien"
  | "philippines"
  | "dan-mach"
  | "thuy-si"
  | "ukraina"
  | "han-quoc"
  | "au-my"
  | "an-do"
  | "canada"
  | "tay-ban-nha"
  | "indonesia"
  | "ba-lan"
  | "malaysia"
  | "bo-dao-nha"
  | "uae"
  | "chau-phi"
  | "a-rap-xe-ut"
  | "nhat-ban"
  | "dai-loan"
  | "anh"
  | "quoc-gia-khac"
  | "tho-nhi-ky"
  | "nga"
  | "uc"
  | "brazil"
  | "y"
  | "na-uy";

type Episode = {
  server_name: string;
  server_data: {
    name: string;
    slug: string;
    file_name: string;
    link_embed: string;
    link_m3u8: string;
  }[];
};

type EpisodeMerged = {
  name: string;
  slug: string;
  file_name: string;
  link_embed: string;
  link_m3u8: string;
};
