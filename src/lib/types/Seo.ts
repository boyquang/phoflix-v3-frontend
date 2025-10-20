type TypeSeoMetadata =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

type ResponseSeoMetadata = {
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
    posterUrls: string[];
    type: TypeSeoMetadata;
  };
};
