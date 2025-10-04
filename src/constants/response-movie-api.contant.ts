export const MOVIE_DATA_DEFAULT = {
  actors: [],
  categories: [],
  countries: [],
  directors: [],
  episode_current: "0",
  imdb: { id: null },
  lang: "N/A",
  modified: { time: "N/A" },
  name: "N/A",
  origin_name: "N/A",
  poster_url: "/no-poster.png",
  slug: "N/A",
  thumb_url: "/no-poster.png",
  quality: "N/A",
  time: "N/A",
  trailer_url: null,
  year: "N/A",
  _id: "N/A",
  id: "N/A",
  sub_docquyen: false,
  tmdb: {
    id: null,
    vote_average: 0,
    vote_count: 0,
    season: null,
    type: null,
  },
  type: null,
  content: "N/A",
  createAt: "N/A",
};

export const RESPONSE_MOVIE = {
  INFO: {
    status: false,
    movie: MOVIE_DATA_DEFAULT,
    episodes: [],
  },
  SEARCH: {
    movies: [],
    seoOnPage: {},
    pagination: {},
    status: false,
  },
  DETAIL: {
    status: false,
    items: [],
    pagination: {},
    titlePage: "Danh sách phim",
    seoOnPage: {},
  },
  FILTER_MOVIES: {
    status: false,
    items: [],
    pagination: {},
    titlePage: "Danh sách phim",
  },
  NEWLY_UPDATED: {
    status: false,
    items: [],
    pagination: {},
  },
  POPULAR_MOVIES: {
    status: false,
    items: [],
    pagination: {
      totalPages: 0,
      totalResults: 0,
    },
  },
  ACTORS_BY_MOVIE: {
    status: false,
    actor: {
      cast: [],
      crew: [],
    },
  },
  ACTORS: {
    status: false,
    actors: [],
    pagination: {
      totalPages: 0,
      totalResults: 0,
    },
  },
  ACTOR_DETAIL: {
    status: false,
    data: {},
  },
  MOVIES_BY_ACTOR: {
    status: false,
    movie: {
      cast: [],
      crew: [],
    },
  },
};
