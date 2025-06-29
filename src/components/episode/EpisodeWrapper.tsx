// "use client";

// import { AppDispatch, RootState } from "@/store/store";
// import { useDispatch, useSelector } from "react-redux";
// import EpisodesList from "./EpisodeList";

// interface EpisodeWrapperProps {
//   redirect: boolean;
//   elementScrollName?: string;
//   isScroll?: boolean;
//   currentEpisode?: any;
// }

// const EpisodeWrapper = ({
//   redirect = false,
//   elementScrollName = "",
//   isScroll = true,
//   currentEpisode,
// }: EpisodeWrapperProps) => {
//   const { selectedLanguage, groups } = useSelector(
//     (state: RootState) => state.movie.episode
//   );
//   const dispatch: AppDispatch = useDispatch();

//   return <EpisodesList isScroll elementScrollName="movie-main" redirect />;
// };

// export default EpisodeWrapper;
