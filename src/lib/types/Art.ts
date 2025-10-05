type ArtPlayerEvent =
  | "ready" // player load xong
  | "play" // video bắt đầu chạy
  | "pause" // video dừng
  | "playing" // video đang chạy
  | "video:ended" // video kết thúc
  | "video:timeupdate" // cập nhật thời gian hiện tại
  | "video:loadedmetadata" // metadata video load xong
  | "video:seeking" // bắt đầu tua
  | "video:seeked" // tua xong
  | "fullscreen" // bật/tắt fullscreen
  | "fullscreenWeb" // fullscreen trình duyệt
  | "pip" // bật/tắt picture-in-picture
  | "setVolume" // thay đổi âm lượng
  | "setCurrentTime" // tua bằng code
  | "setPlaybackRate" // thay đổi tốc độ phát
  | "destroy" // player bị hủy
  | "mounted" // player được khởi tạo xong
  | "video:canplaythrough"; // video có thể phát mà không bị gián đoạn
