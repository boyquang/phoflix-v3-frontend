type ServerData = {
  name: string | null;
  link_m3u8: string | null;
};

type EpisodesMovie = {
  server_name: string | null;
  server_data: ServerData[];
}

type MovieDetail = {
  actors: string[];
  directors: string[];
  countries: string[];
  categories: string[];
  content: string | null;
  episode_current: string | null;
  episode_total: string | null;
  is_cinema: boolean;
  lang: string | null;
  name: string | null;
  origin_name: string | null;
  poster_url: string | null;
  thumb_url: string | null;
  quality: string | null;
  slug: string | null;
  sub_docquyen: boolean;
  time: string | null;
  tmdb: {
    type: string | null;
    id: number | null;
    season: number | null;
    vote_average: number | null;
    vote_count: number | null;
  };
  trailer_url: string | null;
  type: string | null;
  year: number | null;
  episodes: EpisodesMovie[];
};

type PayloadSetEpisode = {
  serverIndex: number;
  episodeIndex: number;
  field: keyof ServerData;
  value: string;
};
