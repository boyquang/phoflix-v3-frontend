# Luồng hoạt động hàm highlightMultipleMatches

## Ví dụ minh họa chi tiết

**Input:**
- Text: `"Hello world programming"`
- SearchTerm: `"hello world"`

## Bước 1: Khởi tạo và chuẩn hóa dữ liệu
```
normalizedText = "hello world programming"
searchWords = ["hello", "world"]
```

## Bước 2: Duyệt từng ký tự trong text

### Quá trình duyệt:
- **i=0**: Kiểm tra "hello" → khớp 
  - Thêm `{text: "Hello", highlight: true}`
  - i = 5 (nhảy qua đoạn "Hello")

- **i=5**: Kiểm tra " " (khoảng trắng) → không khớp với bất kỳ từ khóa nào
  - Thêm `{text: " ", highlight: false}`
  - i = 6

- **i=6**: Kiểm tra "world" → khớp
  - Thêm `{text: "world", highlight: true}`
  - i = 11 (nhảy qua đoạn "world")

- **i=11-22**: Duyệt từng ký tự " programming" → không khớp với bất kỳ từ khóa nào
  - Thêm từng ký tự với `highlight: false`

## Bước 3: Gộp các phần liền kề cùng trạng thái

Các ký tự riêng lẻ " programming" được gộp thành 1 phần duy nhất:
`{text: " programming", highlight: false}`

## Kết quả cuối cùng:

```javascript
[
  {text: "Hello", highlight: true},
  {text: " ", highlight: false},
  {text: "world", highlight: true}, 
  {text: " programming", highlight: false}
]
```

## Giải thích logic:

1. **Chuẩn hóa**: Chuyển text về chữ thường để so sánh không phân biệt hoa/thường
2. **Tách từ khóa**: Chia searchTerm thành các từ riêng lẻ
3. **Duyệt tuần tự**: Kiểm tra từng vị trí xem có khớp với từ khóa nào không
4. **Ưu tiên khớp**: Khi tìm thấy khớp, nhảy qua toàn bộ đoạn khớp
5. **Tối ưu kết quả**: Gộp các phần liền kề có cùng trạng thái highlight