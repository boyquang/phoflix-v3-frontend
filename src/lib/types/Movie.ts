type TMovieRanking = {
  name: string;
  slug: string;
  thumb: string;
  poster: string;
  total: number;
};

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
  quality: string;
  lang: string;
  time: string;
  episode_current: string;
  category: CategoryMovie[];
};

type MovieDB = {
  id: string;
  created_at: string;
  updated_at: string;
  movie_slug: string;
  playlist_id: string | null;
  movie_data: Movie;
  type: "favorite" | "history" | "playlist";
  user_id: string;
};

type DescribeType =
  | "phim-le"
  | "phim-bo"
  | "tv-shows"
  | "hoat-hinh"
  | "phim-vietsub"
  | "phim-thuyet-minh"
  | "phim-long-tieng"
  | "subteam"
  | "phim-chieu-rap";

type TypeMovie = {
  name: string;
  slug: DescribeType;
  type: string;
  _id: string;
};

type CountryMovie = {
  id: string;
  name: string;
  slug: string;
  _id: string;
};

type CategoryMovie = {
  id: string;
  name: string;
  slug: string;
  _id: string;
};

type Movie = {
  categories: CategoryMovie[];
  countries: CountryMovie[];
  directors: string[];
  actors: string[];
  episode_current: string;
  imdb: {
    id: string | null;
  };
  lang: string;
  modified: {
    time: string;
  };
  name: string;
  origin_name: string;
  poster_url: string;
  slug: string;
  thumb_url: string;
  quality: string;
  time: string;
  trailer_url: string | null;
  year: number | string;
  _id: string;
  id: string;
  sub_docquyen: boolean;
  is_cinema: boolean;
  tmdb: {
    id: null | number | string;
    season: null | string;
    type: "movie" | "tv" | null;
    vote_average: number;
    vote_count: number;
  };
  type: "hoathinh" | "single" | "series" | "tvshows" | null;
  content: string | null;
  episodes?: Episode[];
  currentTime?: number;
  duration?: number;
  createdAt?: string;
  updatedAt?: string;
  currentEpisode?: {
    episodeId?: string;
    name?: string;
  };
  episodes_statistics?: {
    text: "Vietsub" | "Thuyet Minh" | "Long Tieng";
    count: number;
  }[];
};

type Movies = {
  items: Movie[];
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
  known_for?: KnownFor[];
};

type LanguageType = "vietsub" | "thuyet-minh" | "long-tieng";

type MovieSlice = {
  slideShows: {
    items: SlideItem[];
    loading: boolean;
    error: boolean;
  };
  movieData: {
    data: Record<string, Movies>;
    fetched: boolean;
    quantityFetched: number;
  };
  actorsListByMovie: {
    items: Actor[];
    loading: boolean;
    error: boolean;
  };
  actorDetail: {
    filter: "all" | "time";
  };
  moviePopular: {
    items: MoviesByActor[];
    loading: boolean;
    error: boolean;
    totalPages: number;
    totalResults: number;
  };
  movieEvent: Movies & {
    fetched: boolean;
  };
  searchMoviePreview: {
    items: Movie[];
    loading: boolean;
    error: boolean;
    totalItems: number;
  };
  movieInfo: {
    movie: Movie | null;
    loading: boolean;
    error: boolean;
    episodes: Episode[] | null;
    currentEpisode: EpisodeMerged | null;
    isLongSeries: boolean;
    isValidEpisodes: boolean;
  };
  movieDetail: {
    items: Movie[] | null;
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
    items: Movie[];
    loading: boolean;
    error: boolean;
    fetched: boolean;
  };
  searchMovie: {
    items: Movie[];
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
    selectedLanguage: LanguageType | null;
    groups: Partial<
      Record<LanguageType, { items: EpisodeMerged[]; label: string }>
    >;
  };
};

type Categories =
  | "tre-em"
  | "hanh-dong"
  | "lich-su"
  | "co-trang"
  | "chien-tranh"
  | "vien-tuong"
  | "kinh-di"
  | "tai-lieu"
  | "bi-an"
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

type CountriesWithAll = {
  _id: string;
  name: string;
  slug: Countries;
};

type CategoryWithAll = {
  _id: string;
  name: string;
  slug: Categories;
};

type Episode = {
  server_name: string | LanguageType;
  server_data: EpisodeMerged[];
};

type EpisodeMerged = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

type MoviesByActor = {
  adult: boolean | null;
  backdrop_path: string | null;
  character: string | null;
  credit_id: string | null;
  episode_count: number | null;
  first_air_date: string | null;
  first_credit_air_date: string | null;
  genre_ids: number[] | null;
  id: number;
  media_type: "movie" | "tv";
  name: string | null;
  title: string | null;
  origin_country: string[] | null;
  original_language: string | null;
  original_name: string | null;
  overview: string | null;
  release_date: string | null;
  original_title: string | null;
  popularity: number | null;
  poster_path: string | null;
  vote_average: number | null;
  vote_count: number | null;
};

type KnownFor = {
  adult: string;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type: "movie" | "tv";
  original_language: string | null;
  original_name: string | null;
  original_title: string | null;
  overview: string | null;
  poster_path: string | null;
  release_date: string | null;
  title: string | null;
  name: string | null;
  video: boolean;
  vote_average: number | null;
  vote_count: number | null;
};

type SeasonEpisode = {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  air_date: string;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
};

type SeasonEpisodes = {
  episodes: SeasonEpisode[];
};
