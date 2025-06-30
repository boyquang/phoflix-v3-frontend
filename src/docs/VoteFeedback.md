
# 🗳️ Giải thích luồng hoạt động của hành động addVote.fulfilled

Đây là luồng xử lý logic trong Redux Toolkit khi người dùng thực hiện thao tác vote (like hoặc dislike) cho một phản hồi (feedback).

---

## 1. Nhận dữ liệu đầu vào

Hệ thống nhận các thông tin:
- `userId`: ID của người thực hiện vote.
- `feedbackId`: ID của phản hồi mà người dùng tương tác.
- `voteType`: Loại vote người dùng thực hiện, có thể là `"like"` hoặc `"dislike"`.

---

## 2. Đảm bảo mảng vote tồn tại

Trước khi xử lý, hệ thống kiểm tra xem phản hồi này đã từng có người like/dislike chưa. Nếu chưa, nó sẽ khởi tạo mảng rỗng để lưu userId tương ứng.

---

## 3. Kiểm tra trạng thái hiện tại của người dùng

Hệ thống xác định xem người dùng đã like hoặc dislike phản hồi này trước đó hay chưa. Điều này giúp xác định hành vi tiếp theo:
- Gỡ vote cũ
- Chuyển đổi vote
- Vote lần đầu

---

## 4. Xử lý theo loại vote

### Trường hợp người dùng chọn "like":
- Nếu trước đó đã **dislike**, hệ thống:
  - Xóa `userId` khỏi danh sách dislike.
  - Thêm `userId` vào danh sách like.
- Nếu trước đó đã **like**, hệ thống sẽ:
  - Gỡ like (xóa khỏi danh sách like).
- Nếu chưa từng vote, hệ thống:
  - Thêm `userId` vào danh sách like.

### Trường hợp người dùng chọn "dislike":
- Nếu trước đó đã **like**, hệ thống:
  - Xóa `userId` khỏi danh sách like.
  - Thêm `userId` vào danh sách dislike.
- Nếu trước đó đã **dislike**, hệ thống sẽ:
  - Gỡ dislike (xóa khỏi danh sách dislike).
- Nếu chưa từng vote, hệ thống:
  - Thêm `userId` vào danh sách dislike.

---

## 5. Tổng quan hành vi xử lý

Hệ thống đảm bảo chỉ có một trong hai trạng thái: đã like hoặc đã dislike, hoặc không có gì cả. Người dùng có thể:
- Vote lần đầu.
- Gỡ vote.
- Chuyển đổi giữa like ↔ dislike.

---

## 6. Mục tiêu của luồng xử lý

- Đảm bảo dữ liệu vote luôn nhất quán.
- Tránh trùng lặp vote.
- Hỗ trợ chuyển đổi vote linh hoạt.
- Trực quan và dễ mở rộng nếu cần thêm loại vote trong tương lai.
