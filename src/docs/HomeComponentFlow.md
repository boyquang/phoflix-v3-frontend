
# 📄 Luồng hoạt động của Component `Home`

## 1. Giới thiệu
File `Home.tsx` là thành phần chính của trang chủ. Nó thực hiện các tác vụ sau:
- Fetch dữ liệu slideshow và danh sách phim từ `Redux Thunk`.
- Hiển thị các phim theo từng phần (section) tương ứng với cấu hình.
- Tải thêm dữ liệu khi cuộn xuống cuối trang.
- Cập nhật trạng thái `fetched` để tránh gọi lại API không cần thiết.

---

## 2. Các Hook và biến chính

| Biến | Mô tả |
|------|------|
| `dispatch` | Dùng để gọi các async thunk hoặc cập nhật state Redux |
| `data` | Dữ liệu phim đã fetch từ store |
| `fetched` | Trạng thái đã fetch xong toàn bộ dữ liệu chưa |
| `scrollableDivRef` | Dùng để theo dõi khi nào người dùng cuộn đến cuối |
| `hasFetchedMoreData` | Tránh gọi fetch lại nếu đang gọi |
| `quantityFetchedData` | Theo dõi số lượng dữ liệu phim đã lấy |
| `loadingMoreData` | Hiển thị loading khi đang tải thêm |

---

## 3. useEffect - Khởi tạo và load dữ liệu ban đầu

```ts
useEffect(() => {
  const fetchInitialData = async () => {
    const fetchPromises = initialMovieConfig.slice(0, quantitySectionMovie)
      .map((configItem) => dispatch(fetchDataMovie({...})));
    
    await Promise.all([dispatch(fetchDataSlideShow()), ...fetchPromises]);
  };

  if (!fetched) fetchInitialData();
}, [dispatch]);
```

- Gọi dữ liệu slideshow và các phim ban đầu (theo `quantitySectionMovie`).
- Không gọi lại nếu `fetched = true`.

---

## 4. useEffect - Xử lý cuộn trang

```ts
useEffect(() => {
  const handleScroll = () => {
    if (fetched) return;

    if (scrollableDivRef.current && !hasFetchedMoreData.current) {
      const rect = scrollableDivRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 100) {
        if (quantityFetchedData.current < initialMovieConfig.length) {
          fetchMoreData();
          hasFetchedMoreData.current = true;
        } else {
          dispatch(setFetchedMovieDataHomePage(true));
          window.removeEventListener("scroll", handleScroll);
        }
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

- Theo dõi cuộn trang để tải thêm dữ liệu.
- Khi tải hết toàn bộ sections, gọi `setFetchedMovieDataHomePage(true)` để cập nhật state.

---

## 5. fetchMoreData

```ts
const fetchMoreData = async () => {
  const start = quantityFetchedData.current;
  const end = start + quantitySectionMovie;
  const fetchPromises = initialMovieConfig.slice(start, end)
    .map((configItem) => dispatch(fetchDataMovie({...})));
  
  setLoadingMoreData(true);
  await Promise.all(fetchPromises);
  setLoadingMoreData(false);

  quantityFetchedData.current = end;
  hasFetchedMoreData.current = false;
};
```

- Gọi API để lấy thêm section phim (mỗi lần lấy `quantitySectionMovie` phần).
- Cập nhật biến đếm `quantityFetchedData` và trạng thái loading.

---

## 6. Xử lý render dữ liệu phim

```ts
const finalData = initialMovieConfig.filter(...).map((configItem) => {...});
```

- Lọc các config đã có dữ liệu từ Redux để hiển thị.

---

## 7. Kết luận

Trang Home được tối ưu để:
- Không gọi lại dữ liệu đã có (`fetched`).
- Load thêm khi cuộn để giảm thời gian chờ.
- Phân chia UI rõ ràng với các thành phần như: `SlideShow`, `TopicCards`, `MovieSection`, `Loading`, ...
