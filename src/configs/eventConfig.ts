/**
 * @description: Danh sách các sự kiện lịch sử quan trọng của Việt Nam
 * Sắp xếp theo thứ tự thời gian từ đầu năm đến cuối năm để hiển thị đúng thứ tự
 */

export type DateEvent = `${number}/${number}`;

interface Event {
  name: string;
  date: DateEvent;
  description: string;
  slug: string;
  country: string;
  describe: string;
  isLunar: boolean;
  icon: string;
}

export const eventConfig: Event[] = [
  {
    name: "Lễ Tình nhân",
    date: "14/02",
    description: `
        Ngày 14/02 hằng năm, Lễ Tình nhân – hay còn gọi là Valentine – là dịp đặc biệt để những người đang yêu bày tỏ tình cảm và sự quan tâm dành cho nhau. Đây không chỉ là ngày của những cặp đôi, mà còn là cơ hội để bất kỳ ai thể hiện tình yêu thương chân thành đến với người mình quý mến, dù là gia đình, bạn bè hay người thầm thương trộm nhớ.
        Vào ngày này, người ta thường tặng nhau những đóa hoa hồng, thanh socola ngọt ngào, những tấm thiệp viết tay cùng những lời chúc đầy cảm xúc. Những món quà tuy nhỏ bé nhưng lại mang ý nghĩa lớn lao, bởi chúng chứa đựng tình cảm chân thành và sự thấu hiểu giữa hai trái tim.
        Lễ Tình nhân không chỉ là dịp để hâm nóng tình yêu mà còn là cơ hội để mỗi người dừng lại giữa guồng quay cuộc sống, lắng nghe trái tim mình và trân trọng hơn những người thân yêu đang ở bên. Đó là một ngày của sự gắn kết, sẻ chia và hy vọng vào những điều tốt đẹp trong tình yêu.
      `,
    slug: "tinh-cam",
    country: "",
    describe: "the-loai",
    isLunar: false,
    icon: "💖",
  },
  {
    name: "Quốc tế Phụ nữ",
    date: "08/03",
    description: `
        Ngày 8/3 hằng năm là dịp đặc biệt để cả thế giới cùng hướng về những người phụ nữ – những người luôn âm thầm hy sinh, cống hiến và góp phần không nhỏ vào sự phát triển của gia đình cũng như xã hội. Đây là ngày để tôn vinh vẻ đẹp, sự kiên cường và những đóng góp thầm lặng của mẹ, chị, vợ hay bất kỳ người phụ nữ nào đã và đang hiện diện trong cuộc sống mỗi người.
        Không chỉ là ngày để trao tặng hoa, quà hay những lời chúc tốt đẹp, 8/3 còn là cơ hội để mỗi người bày tỏ lòng biết ơn, sự yêu thương chân thành đối với phái đẹp. Họ xứng đáng được trân trọng không chỉ trong một ngày, mà trong mọi khoảnh khắc của cuộc sống.
        Ngày Quốc tế Phụ nữ là lời nhắc nhở về bình đẳng giới, về quyền được yêu thương và tôn trọng. Đó là ngày để khơi dậy lòng tri ân và lan tỏa yêu thương đến một nửa dịu dàng và mạnh mẽ của thế giới.
      `,
    slug: "gia-dinh",
    country: "",
    describe: "the-loai",
    isLunar: false,
    icon: "👩",
  },
  {
    name: "Giải phóng Miền Nam",
    date: "30/04",
    description: `
        Ngày 30/4/1975 là một dấu son chói lọi trong lịch sử dựng nước và giữ nước của dân tộc Việt Nam. Với chiến thắng vang dội của Chiến dịch Hồ Chí Minh lịch sử, quân và dân ta đã chính thức kết thúc cuộc kháng chiến chống Mỹ cứu nước đầy gian khổ, đưa miền Nam hoàn toàn giải phóng và đất nước bước vào kỷ nguyên mới – kỷ nguyên của hòa bình, thống nhất và độc lập tự do.
        Chiến thắng 30/4 không chỉ thể hiện ý chí kiên cường, lòng quả cảm của toàn dân tộc mà còn là minh chứng cho khát vọng hòa bình, khát vọng được sống trong một đất nước thống nhất, không còn chia cắt. Đây là ngày hội non sông, là niềm tự hào lớn lao khắc sâu trong trái tim mỗi người con đất Việt.
        Mỗi dịp 30/4 trở về, lòng người lại rạo rực nhớ về một thời lửa đạn, nhớ về những người đã ngã xuống cho màu cờ Tổ quốc mãi tung bay. Đó không chỉ là một ngày lễ, mà là biểu tượng thiêng liêng của sức mạnh đại đoàn kết toàn dân tộc.
      `,
    slug: "lich-su",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: false,
    icon: "🇻🇳",
  },
  {
    name: "Chiến thắng Điện Biên Phủ",
    date: "07/05",
    description: `
        Chiến thắng Điện Biên Phủ (13/3 – 7/5/1954) là một trong những chiến công vang dội nhất trong lịch sử dân tộc Việt Nam và là biểu tượng sáng ngời của tinh thần yêu nước, ý chí độc lập và lòng quả cảm bất khuất. Dưới sự lãnh đạo tài tình của Đại tướng Võ Nguyên Giáp, Quân đội Nhân dân Việt Nam đã làm nên một chiến thắng “lừng lẫy năm châu, chấn động địa cầu” trước đội quân viễn chinh hùng mạnh của thực dân Pháp tại tập đoàn cứ điểm Điện Biên Phủ.
        Suốt 56 ngày đêm chiến đấu gian khổ trong điều kiện hết sức khắc nghiệt, quân và dân ta đã kiên cường bao vây, tiến công và cuối cùng tiêu diệt hoàn toàn tập đoàn cứ điểm mạnh nhất của Pháp ở Đông Dương. Chiến thắng này đã buộc Pháp phải ký Hiệp định Genève, chấm dứt cuộc chiến tranh xâm lược tại Việt Nam và đánh dấu một bước ngoặt lớn trong tiến trình giành độc lập dân tộc.
        Điện Biên Phủ không chỉ là niềm tự hào của dân tộc, mà còn là biểu tượng của lẽ phải, chính nghĩa và khát vọng tự do của các dân tộc bị áp bức trên toàn thế giới.
      `,
    slug: "lich-su",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: false,
    icon: "🇻🇳",
  },
  {
    name: "Quốc khánh Việt Nam",
    date: "02/09",
    description: `
        Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, trước hàng chục vạn đồng bào, Chủ tịch Hồ Chí Minh đã trịnh trọng đọc bản Tuyên ngôn Độc lập, long trọng tuyên bố sự ra đời của nước Việt Nam Dân chủ Cộng hòa – nay là nước Cộng hòa xã hội chủ nghĩa Việt Nam. Sự kiện trọng đại này không chỉ chấm dứt ách đô hộ kéo dài hàng thế kỷ của thực dân, đế quốc, mà còn mở ra một kỷ nguyên mới – kỷ nguyên của tự do, độc lập và quyền làm chủ của nhân dân Việt Nam.
        Ngày 2/9 đã trở thành Quốc khánh – ngày lễ trọng đại của cả dân tộc, là dịp để người dân cả nước tưởng nhớ công ơn trời biển của Chủ tịch Hồ Chí Minh và lớp lớp anh hùng liệt sĩ đã hy sinh vì nền độc lập dân tộc. Đây cũng là ngày để khơi dậy lòng yêu nước, tự hào dân tộc và tinh thần đoàn kết vững bền trong sự nghiệp xây dựng và bảo vệ Tổ quốc.
        Quốc khánh 2/9 mãi mãi là biểu tượng thiêng liêng của ý chí kiên cường và khát vọng độc lập, tự do của dân tộc Việt Nam.
      `,
    slug: "lich-su",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: false,
    icon: "🇻🇳",
  },
  {
    name: "Phụ nữ Việt Nam",
    date: "20/10",
    description: `
        Ngày 20/10 hằng năm là dịp đặc biệt để cả nước bày tỏ lòng tri ân và tôn vinh những người phụ nữ Việt Nam – những con người thầm lặng nhưng mạnh mẽ, luôn giữ vai trò quan trọng trong mọi lĩnh vực của đời sống, từ gia đình, công việc đến các hoạt động xã hội và cộng đồng.
        Từ bao đời nay, hình ảnh người phụ nữ Việt Nam đã trở thành biểu tượng của sự hy sinh, kiên cường, dịu dàng mà đầy bản lĩnh. Dù là người mẹ tảo tần, người vợ đảm đang hay người chiến sĩ, trí thức nơi tuyến đầu, họ đều góp phần làm nên vẻ đẹp rạng ngời cho đất nước.
        Ngày 20/10 không chỉ là ngày để trao gửi những lời chúc tốt đẹp, những bông hoa tươi thắm, mà còn là dịp để nhắc nhớ và trân trọng những đóng góp to lớn của phụ nữ trong hành trình dựng xây và phát triển đất nước. Đó là ngày của lòng biết ơn, của sự ngưỡng mộ và của tình yêu thương lan tỏa từ trái tim đến trái tim.
      `,
    slug: "gia-dinh",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: false,
    icon: "👩",
  },
  {
    name: "Lễ Giáng sinh",
    date: "24/12",
    description: `
        Lễ Giáng sinh, diễn ra vào ngày 25/12 hằng năm, là một trong những ngày lễ quan trọng nhất đối với cộng đồng Công giáo và Kitô hữu trên toàn thế giới. Đây là dịp kỷ niệm ngày Chúa Giê-su ra đời, mang thông điệp về tình yêu thương, sự hy sinh và lòng vị tha.
        Tại Việt Nam, Giáng sinh dần trở thành một lễ hội văn hóa được đông đảo người dân hưởng ứng, bất kể tôn giáo. Khi tháng 12 về, khắp phố phường lại rực rỡ ánh đèn, cây thông Noel được trang hoàng lộng lẫy, và những giai điệu Giáng sinh ngân vang khắp nơi, tạo nên một bầu không khí ấm áp và vui tươi lan tỏa.
        Đây không chỉ là dịp để các tín hữu thể hiện đức tin, mà còn là thời điểm để mọi người sum họp, trao nhau những món quà nhỏ, những lời chúc an lành và sẻ chia yêu thương. Giáng sinh tại Việt Nam mang màu sắc giao thoa giữa tôn giáo và văn hóa, trở thành một mùa lễ hội được mong đợi nhất trong năm – nơi tình thân và niềm vui được thắp sáng trong từng ánh mắt, nụ cười.
      `,
    slug: "tinh-cam",
    country: "",
    describe: "the-loai",
    isLunar: false,
    icon: "🎄",
  },

  // Các lễ âm lịch
  {
    name: "Tết Nguyên Đán",
    date: "01/01", // mùng 1 Tết Âm lịch
    description: `
        Tết Nguyên Đán, hay còn gọi là Tết cổ truyền, là ngày lễ lớn và thiêng liêng nhất trong năm đối với người Việt Nam. Diễn ra vào thời khắc chuyển giao giữa năm cũ và năm mới âm lịch, Tết không chỉ đánh dấu một chu kỳ thời gian mới mà còn mang theo bao kỳ vọng, niềm tin và ước nguyện cho một năm an lành, sung túc.
        Đây là dịp để các gia đình sum họp, quây quần bên nhau sau một năm bôn ba, vất vả. Những phong tục truyền thống như dọn dẹp nhà cửa, cúng ông Công ông Táo, gói bánh chưng, chúc Tết, lì xì hay lễ gia tiên… đều thể hiện sâu sắc đạo lý “uống nước nhớ nguồn” và nét đẹp văn hóa lâu đời của dân tộc.
        Không khí Tết tràn ngập khắp mọi nẻo đường với sắc đỏ rực rỡ, hương trầm ấm áp, tiếng pháo hoa rộn ràng và những nụ cười đong đầy hy vọng. Tết không chỉ là thời điểm khởi đầu, mà còn là khoảnh khắc gắn kết thiêng liêng giữa quá khứ, hiện tại và tương lai trong lòng mỗi người con đất Việt.
      `,
    slug: "gia-dinh",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: true,
    icon: "🎉",
  },
  {
    name: "Giỗ Tổ Hùng Vương",
    date: "10/03",
    description: `
        Giỗ Tổ Hùng Vương, diễn ra vào ngày mùng 10 tháng 3 âm lịch hằng năm, là một trong những ngày lễ lớn và thiêng liêng nhất của dân tộc Việt Nam. Đây là dịp để toàn thể người dân tưởng nhớ và tri ân công lao to lớn của các Vua Hùng – những vị vua đầu tiên đã có công dựng nước Văn Lang, đặt nền móng cho quốc gia và dân tộc Việt từ buổi sơ khai.
        Vào ngày này, hàng vạn người dân từ khắp mọi miền đất nước hành hương về Đền Hùng, thuộc tỉnh Phú Thọ – vùng đất tổ linh thiêng – để dâng hương, bày tỏ lòng thành kính. Lễ hội Giỗ Tổ không chỉ mang ý nghĩa tâm linh sâu sắc, mà còn thể hiện truyền thống “uống nước nhớ nguồn”, gắn kết cộng đồng và hun đúc tinh thần dân tộc.
        Giỗ Tổ Hùng Vương không chỉ là ngày để tưởng nhớ tổ tiên, mà còn là dịp để khơi dậy lòng tự hào và ý thức gìn giữ bản sắc văn hóa dân tộc trong mỗi người Việt Nam, dù ở trong nước hay phương xa.
      `,
    slug: "lich-su",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: true,
    icon: "🇻🇳",
  },
  {
    name: "Lễ Vu Lan",
    date: "15/07",
    description: `
        Lễ Vu Lan, diễn ra vào ngày rằm tháng 7 âm lịch hằng năm, là một trong những lễ hội thiêng liêng và giàu ý nghĩa nhất trong văn hóa Phật giáo Việt Nam. Đây là dịp để mỗi người con thể hiện lòng biết ơn sâu sắc đối với đấng sinh thành, nuôi dưỡng – những người đã dành cả cuộc đời âm thầm hy sinh vì con cái.
        Nguồn gốc của Lễ Vu Lan bắt nguồn từ tích truyện về Bồ Tát Mục Kiền Liên – người đã vượt qua muôn vàn gian khổ để cứu mẹ mình thoát khỏi cảnh khổ nơi địa ngục. Từ đó, Vu Lan trở thành mùa của lòng hiếu hạnh, nhắc nhở mỗi người sống trọn đạo làm con, biết yêu thương và đền đáp công ơn cha mẹ.
        Vào dịp này, các Phật tử thường đến chùa tụng kinh, cúng dường Tam bảo, cầu nguyện cho cha mẹ hiện tiền được mạnh khỏe, an lạc, và hồi hướng công đức cho cha mẹ đã quá vãng được siêu sinh tịnh độ. Lễ Vu Lan không chỉ là nghi lễ tôn giáo, mà còn là dịp để vun bồi đạo lý, khơi dậy tinh thần yêu thương và trách nhiệm trong từng gia đình Việt.
      `,
    slug: "gia-dinh",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: true,
    icon: "👪",
  },
  {
    name: "Tết Trung thu",
    date: "15/08",
    description: `
        Tết Trung thu, còn gọi là Tết Thiếu nhi hay Tết Trông Trăng, diễn ra vào ngày rằm tháng 8 âm lịch, là dịp đặc biệt dành riêng cho trẻ em – những “mầm non” tương lai của đất nước. Đây không chỉ là ngày lễ truyền thống mang đậm bản sắc văn hóa dân tộc, mà còn là thời điểm sum vầy, gắn kết yêu thương trong mỗi gia đình.
        Vào dịp này, khắp các con phố, ngõ nhỏ đều rực rỡ ánh đèn lồng, những chiếc mặt nạ, đầu lân sặc sỡ và tiếng trống múa lân rộn ràng vang vọng. Trẻ em háo hức rước đèn ông sao, phá cỗ dưới ánh trăng tròn vằng vặc, cùng nhau thưởng thức bánh nướng, bánh dẻo thơm ngon – những hương vị ngọt ngào gắn liền với ký ức tuổi thơ bao thế hệ.
        Tết Trung thu không chỉ mang đến niềm vui, tiếng cười cho các em nhỏ mà còn là dịp để người lớn bày tỏ tình yêu thương, sự quan tâm và chăm sóc. Đó là đêm hội của ánh sáng, tình thân và ước vọng cho một tuổi thơ tròn đầy hạnh phúc.
      `,
    slug: "gia-dinh",
    country: "viet-nam",
    describe: "the-loai",
    isLunar: true,
    icon: "🏮",
  },
];
