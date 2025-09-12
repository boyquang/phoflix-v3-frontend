/**
 *  Hàm appendParams thêm các tham số từ một đối tượng vào một URL.
 * @param url là một đối tượng URL.
 * @param params là một đối tượng chứa các cặp key-value.
 * Hàm này sẽ thêm các tham số từ params vào url nếu giá trị của chúng không phải là undefined hoặc rỗng.
 * Nếu giá trị là undefined hoặc rỗng, tham số đó sẽ bị bỏ qua.
 * Ví dụ:
 * const url = new URL("https://example.com");
 * appendParams(url, { foo: "bar", baz: undefined, qux: "" });
 * console.log(url.toString()); // Kết quả: "https://example.com/?foo=bar"
 * 
 * Lưu ý: Hàm này sẽ sửa đổi trực tiếp đối tượng URL được truyền vào.
 */

export function appendParams(
  url: URL,
  params: Record<string, string | undefined>
) {
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
}
