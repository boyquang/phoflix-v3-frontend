# 🎬 Chức năng “Xem phim cùng bạn bè”

Tính năng cho phép người dùng tạo phòng xem phim và mời bạn bè cùng tham gia, đồng bộ việc xem qua Socket.IO.

---

## 1. Tạo phòng

### API: `POST /watchingTogether/room`

#### Payload:

```json
{
  "userId": "123",
  "movieData": {
    "episodes": [...],
    "movieName": "Tên phim",
    "movieSlug": "slug-phim"
  }
}
```

#### Xử lý:

- Kiểm tra người dùng đã có phòng đang hoạt động chưa.
- Nếu chưa có:
  - Tạo phòng mới với dữ liệu:

```json
{
  "roomOwnerId": "userId",
  "users": [{ "id": "...", "name": "...", "avatar": "..." }],
  "movieData": {
    "movieName": "...",
    "movieSlug": "...",
    "episodes": [...]
  }
}
```

- Trả về:

```json
{
  "roomId": "abc123",
  "roomOwnerId": "userId"
}
```

### Socket:

- Emit: `room-created` → gửi về client tạo phòng.

---

## 2. Tham gia phòng

### API: `POST /watchingTogether/joinRoom`

#### Payload:

```json
{
  "roomId": "abc123",
  "user": {
    "id": "...",
    "name": "...",
    "avatar": "..."
  }
}
```

#### Xử lý:

- Kiểm tra phòng có tồn tại không.
- Nếu có:
  - Thêm người dùng vào danh sách nếu chưa có.
  - Trả về thông tin phòng.

### Socket:

- Emit: `user-joined` → gửi đến tất cả thành viên phòng.
- Emit: `joined-room-successfully` → gửi đến user vừa vào.
- Emit: `sync-video-state` → từ chủ phòng gửi trạng thái video hiện tại cho user mới.

---

## 3. Đồng bộ video (Từ chủ phòng)

### Các socket event:

| Event                  | Payload ví dụ                    |
| ---------------------- | -------------------------------- |
| `video-play`           | `{ roomId }`                     |
| `video-pause`          | `{ roomId }`                     |
| `video-seek`           | `{ roomId, currentTime: 120.5 }` |
| `video-change-episode` | `{ roomId, episodeId: "tap-2" }` |

#### Xử lý:

- Các sự kiện được emit từ chủ phòng.
- Server phát tán đến tất cả thành viên còn lại để đồng bộ.

---

## 4. Rời phòng

### API: `POST /watchingTogether/leaveRoom`

#### Payload:

```json
{
  "userId": "string",
  "roomId": "abc123"
}
```

#### Xử lý:

- Nếu `userId === roomOwnerId`:  
  → Xóa toàn bộ phòng, emit `room-closed` đến tất cả người dùng.
- Nếu là người dùng thường:  
  → Xóa user khỏi danh sách `users[]`, emit `user-left`.

---

## 5. Xóa người dùng khỏi phòng (Chủ phòng)

### API: `POST /watchingTogether/kickUserOutOfRoom`

#### Payload:

```json
{
  "userId": "id-của-người-bị-kick",
  "roomId": "abc123",
  "requesterId": "id-chủ-phòng"
}
```

#### Xử lý:

- Kiểm tra `requesterId` có phải chủ phòng không.
- Nếu hợp lệ:
  - Xóa user khỏi danh sách.
  - Emit `user-kicked` đến user bị xóa.
  - Emit `user-left` đến các thành viên còn lại.

---

## 6. Reconnect & Đồng bộ lại trạng thái

### Socket:

- Khi user reconnect:

```js
socket.emit("rejoin-room", { userId, roomId });
```

- Server xử lý:
  - Xác nhận user hợp lệ.
  - Gửi lại trạng thái video từ chủ phòng:

```js
socket.emit("sync-video-state", {
  currentTime: 134.2,
  episodeId: "tap-2",
  isPlaying: true,
});
```

---

## Tóm tắt các sự kiện Socket

| Sự kiện                      | Mô tả                        |
| ---------------------------- | ---------------------------- |
| `room-created`               | Phòng được tạo thành công    |
| `user-joined`                | Có người mới tham gia phòng  |
| `joined-room-successfully`   | Gửi riêng cho người vừa vào  |
| `video-play` / `video-pause` | Phát hoặc tạm dừng video     |
| `video-seek`                 | Chủ phòng tua video          |
| `video-change-episode`       | Đổi tập phim                 |
| `user-left`                  | Có người rời phòng           |
| `room-closed`                | Phòng bị giải tán            |
| `user-kicked`                | Người dùng bị xóa khỏi phòng |
| `sync-video-state`           | Gửi trạng thái video đồng bộ |
