/**
 * @description: Danh sách các sự kiện lịch sử quan trọng của Việt Nam
 * Sắp xếp theo thứ tự thời gian từ đầu năm đến cuối năm để hiển thị đúng thứ tự
 */
  
export const eventConfig = [
  {
    name: "Lễ Tình nhân",
    date: "25/6",
    description:
      "Ngày 14/02 là dịp để các cặp đôi thể hiện tình yêu và sự quan tâm dành cho nhau. Lễ Tình nhân, hay còn gọi là Valentine, được xem là ngày đặc biệt để tặng quà, hoa và những lời yêu thương ngọt ngào.",
    slug: "tinh-cam",
    country: "",
    describe: "the-loai",
    isLunar: false,
  },
  {
    name: "Quốc tế Phụ nữ",
    date: "08/03",
    description:
      "Ngày Quốc tế Phụ nữ 8/3 là dịp tôn vinh những đóng góp to lớn của phụ nữ trong gia đình và xã hội. Đây cũng là ngày để thể hiện sự trân trọng, yêu thương đối với những người mẹ, người chị và người vợ.",
    slug: "gia-dinh",
    country: "",
    describe: "the-loai",
    isLunar: false,
  },
  {
    name: "Giải phóng Miền Nam",
    date: "30/04",
    description:
      "Ngày Giải phóng miền Nam, thống nhất đất nước (30/4) là một trong những cột mốc lịch sử vô cùng quan trọng và thiêng liêng trong lòng mỗi người dân Việt Nam. Vào ngày 30 tháng 4 năm 1975, chiến dịch Hồ Chí Minh lịch sử đã kết thúc thắng lợi, dẫn đến sự sụp đổ hoàn toàn của chính quyền Sài Gòn và mở ra một kỷ nguyên mới – kỷ nguyên độc lập, tự do và thống nhất đất nước sau hơn 20 năm chia cắt.",
    slug: "lich-su",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: false,
  },
  {
    name: "Chiến thắng Điện Biên Phủ",
    date: "07/05",
    description:
      "Chiến thắng Điện Biên Phủ là một trong những chiến công lừng lẫy trong lịch sử dân tộc Việt Nam, diễn ra từ ngày 13 tháng 3 đến ngày 7 tháng 5 năm 1954. Đây là trận quyết chiến chiến lược giữa Quân đội Nhân dân Việt Nam, dưới sự chỉ huy của Đại tướng Võ Nguyên Giáp, với quân đội thực dân Pháp tại lòng chảo Điện Biên Phủ. Sau 56 ngày đêm chiến đấu anh dũng, quân và dân ta đã giành thắng lợi hoàn toàn, tiêu diệt và bắt sống toàn bộ tập đoàn cứ điểm mạnh nhất của Pháp ở Đông Dương. Chiến thắng này đã buộc Pháp phải ký Hiệp định Genève, chấm dứt chiến tranh xâm lược ở Việt Nam và mở ra một thời kỳ mới cho công cuộc đấu tranh giành độc lập dân tộc.",
    slug: "lich-su",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: false,
  },
  {
    name: "Quốc khánh Việt Nam",
    date: "02/09",
    description:
      "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình, chính thức khai sinh nước Việt Nam Dân chủ Cộng hòa. Đây là ngày lễ lớn của cả nước, đánh dấu sự ra đời của quốc gia độc lập và có chủ quyền.",
    slug: "lich-su",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: false,
  },
  {
    name: "Phụ nữ Việt Nam",
    date: "20/10",
    description:
      "Ngày Phụ nữ Việt Nam 20/10 là dịp để tri ân và tôn vinh vai trò quan trọng của phụ nữ Việt trong mọi lĩnh vực của đời sống xã hội, từ gia đình đến công việc và cộng đồng.",
    slug: "gia-dinh",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: false,
  },
  {
    name: "Lễ Giáng sinh",
    date: "24/12",
    description:
      "Lễ Giáng sinh là một ngày lễ lớn, đặc biệt đối với cộng đồng Công giáo và Kitô hữu. Tại Việt Nam, Giáng sinh cũng trở thành dịp lễ hội phổ biến với không khí ấm áp, đèn trang trí rực rỡ và các hoạt động vui chơi đặc sắc.",
    slug: "tinh-cam",
    country: "",
    describe: "the-loai",
    isLunar: false,
  },

  // Các lễ âm lịch
  {
    name: "Tết Nguyên Đán",
    date: "01/01", // mùng 1 Tết Âm lịch
    description:
      "Tết Nguyên Đán là ngày lễ lớn nhất trong năm của người Việt, đánh dấu sự khởi đầu của một năm mới theo lịch Âm. Đây là dịp để các gia đình sum vầy, tưởng nhớ tổ tiên và chúc tụng cho nhau những điều tốt đẹp.",
    slug: "gia-dinh",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: true,
  },
  {
    name: "Giỗ Tổ Hùng Vương",
    date: "10/03",
    description:
      "Giỗ Tổ Hùng Vương là ngày lễ lớn của dân tộc Việt Nam nhằm tưởng nhớ công lao dựng nước của các vua Hùng. Diễn ra vào mùng 10 tháng 3 âm lịch, đây là dịp để người dân hành hương về đất tổ Phú Thọ.",
    slug: "lich-su",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: true,
  },
  {
    name: "Lễ Vu Lan",
    date: "15/07",
    description:
      "Lễ Vu Lan là một trong những lễ hội quan trọng trong văn hóa Phật giáo, được tổ chức vào ngày rằm tháng 7 âm lịch hàng năm. Lễ Vu Lan mang ý nghĩa tưởng nhớ, báo hiếu cha mẹ, thể hiện lòng biết ơn và tri ân đối với công ơn sinh thành, nuôi dưỡng của cha mẹ. Theo truyền thống, vào ngày này, Phật tử sẽ cúng dường, cầu nguyện cho cha mẹ còn sống được khỏe mạnh, bình an, và hồi hướng công đức cho những người đã khuất.",
    slug: "gia-dinh",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: true,
  },
  {
    name: "Tết Trung thu",
    date: "15/08",
    description:
      "Tết Trung thu, hay còn gọi là Tết Thiếu nhi, là dịp để các gia đình tụ tập và chúc mừng cho các em nhỏ. Đặc biệt là trong các khu phố, phố xá sẽ được trang hoàng với đèn lồng rực rỡ, các em nhỏ sẽ được thưởng thức các loại bánh Trung thu ngon miệng.",
    slug: "gia-dinh",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: true,
  },
];
