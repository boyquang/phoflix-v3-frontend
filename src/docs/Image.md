# Giải thích chi tiết hàm `handleUnoptimizedImage`

**Cập nhật: 2025-08-03 13:00:22**

## Mục đích

Hàm `handleUnoptimizedImage(src: string)` dùng để kiểm tra một ảnh từ `src` có tải được hay không. Nếu ảnh lỗi, hàm sẽ thử **fallback** sang ảnh gốc (bỏ qua proxy `?url=`) và **thêm cache-busting** để tránh trình duyệt dùng ảnh đã lỗi.

---

## Giải thích chi tiết các bước

```ts
const handleUnoptimizedImage = (src: string) => {
  const img = new window.Image();

  img.onload = () => setStatus("success");

  img.onerror = () => {
    if (src.includes("?url=")) {
      let fallbackSrc = src.split("?url=")[1];

      // Cache-busting để tránh trình duyệt dùng lại ảnh lỗi
      fallbackSrc +=
        (fallbackSrc.includes("?") ? "&" : "?") + `fallback=${Date.now()}`;

      const fallbackImg = new window.Image();

      fallbackImg.onload = () => {
        setStatus("success");
        setCurrentSrc(fallbackSrc); // cập nhật state để trigger re-render
      };

      fallbackImg.onerror = () => {
        setStatus("error");
      };

      fallbackImg.src = fallbackSrc;
    } else {
      setStatus("error");
    }
  };

  img.src = src;
}
```

---

## Giải thích

### Bước 1: Tạo ảnh và kiểm tra tải thành công

- Dùng `new window.Image()` để tạo một đối tượng ảnh không gắn vào DOM.
- Gán `onload` để biết khi ảnh tải xong thành công.
- Gán `onerror` để xử lý khi ảnh bị lỗi.

### Bước 2: Nếu lỗi và có `?url=`, fallback sang ảnh gốc

- Nếu ảnh tải qua proxy `?url=`, tách lấy URL gốc.
- Thêm đoạn `?fallback=timestamp` để tránh dùng cache ảnh lỗi.
- Tạo ảnh mới, kiểm tra xem ảnh gốc có tải được không.

### Bước 3: Nếu fallback thành công

- Gọi `setCurrentSrc` để cập nhật ảnh mới (ảnh gốc).
- Gọi `setStatus("success")` để cập nhật trạng thái ảnh thành công.

### Bước 4: Nếu fallback cũng lỗi

- Gọi `setStatus("error")` để đánh dấu ảnh lỗi toàn bộ.

### Bước 5: Nếu `src` không có `?url=`

- Không có fallback, đánh dấu ảnh lỗi luôn.

---

## Ví dụ minh họa

Giả sử:

```ts
src = "https://proxy.com/image?url=https://real.com/photo.jpg"
```

- Nếu ảnh qua proxy lỗi → fallback thử lại `https://real.com/photo.jpg?fallback=1691100000000`.

---

## Tổng kết

| Tình huống                 | Kết quả                             |
|---------------------------|--------------------------------------|
| Ảnh chính tải được        | Hiển thị ảnh, setStatus("success")   |
| Ảnh chính lỗi + có `?url=`| Thử lại với ảnh gốc đã thêm timestamp|
| Ảnh fallback thành công   | Cập nhật ảnh gốc                     |
| Ảnh fallback lỗi          | setStatus("error")                   |
| Ảnh không có `?url=`      | setStatus("error")                   |
