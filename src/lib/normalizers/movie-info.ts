export const normalizeMovieInfo = (
  data: Movie & {
    actor: string[];
    category: Categories[];
    country: Countries[];
    director: string[];
    chieurap: boolean;
  }
): Movie => {
  return {
    categories: data?.categories || data?.category || [],
    countries: data?.countries || data?.country || [],
    directors: data?.directors || data?.director || [],
    actors: data?.actors || data?.actor || [],
    episode_current: data?.episode_current || "0",
    imdb: data?.imdb || { id: null },
    lang: data?.lang || "N/A",
    modified: data?.modified || { time: "N/A" },
    name: data?.name || "N/A",
    origin_name: data?.origin_name || "N/A",
    poster_url: data?.poster_url || "/no-poster.png",
    slug: data?.slug || "N/A",
    thumb_url: data?.thumb_url || "/no-poster.png",
    quality: data?.quality || "N/A",
    time: data?.time || "N/A",
    trailer_url: data?.trailer_url || null,
    year: data?.year || "N/A",
    _id: data?._id || "N/A",
    id: data?.id || "N/A",
    is_cinema: data?.is_cinema || data?.chieurap || false,
    sub_docquyen: data?.sub_docquyen || false,
    tmdb: {
      id: data?.tmdb?.id || null,
      vote_average: data?.tmdb?.vote_average || 0,
      vote_count: data?.tmdb?.vote_count || 0,
      season: data?.tmdb?.season || null,
      type: data?.tmdb?.type || null,
    },
    type: data?.type || null,
    content: data?.content || null,
    createAt: data?.createAt || "N/A",
  };
};
