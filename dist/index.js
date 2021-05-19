let cp = new cPlayer({
    "element": document.getElementById("cplayer"),
    autoplay: true,
    "list": [
        //Sync
        {
            "name": "Nụ Cười 18 20", //The Music's Name
            "artist": "Doãn Hiếu", //The Music's Artist
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/0/f/e/90fe14198ba6906f8fd2fb211c86ac01.jpg", //The Music's Cover
            "url": "https://dl.dropboxusercontent.com/s/fovzmhtf3flfek0/Doan.Hieu-Nu.Cuoi.18.20.mp3", //The Music's URL
            "loop": false, //If loop === true,the Music will be played again and again.
            "lyric": "[00:00.00]Bài hát: Nụ Cười 18 20\n[00:02.00]Ca sĩ: Doãn Hiếu\n[00:04.00]\n[00:19.32]Những năm tháng ấy mình đã đi qua\n[00:23.19]Những đôi mắt ấy nhìn về phương xa\n[00:27.64]Dù có bao gian khó hãy nhớ\n[00:29.76]Nụ cười là món quà\n[00:32.26]Là la la lá la la\n[00:35.57]Đời đổi thay thế giới vẫn quay\n[00:39.69]Tuổi thanh xuân như gió như mây\n[00:43.64]Cười thật tươi lên\n[00:44.95]Khi đôi môi ta còn đỏ mọng\n[00:48.32]Năm tháng ấy quay lại được không?\n[00:54.20]Những tháng ngày năm đó\n[00:55.64]Ta đã cười thật tươi\n[00:57.95]Mười tám đôi mươi\n[00:59.70]Những nụ cười đẹp nhất đời\n[01:02.13]Dẫu gian khó dẫu phong ba\n[01:06.20]Hiên ngang bước sóng gió sẽ qua\n[01:10.39]Những tháng ngày năm đó\n[01:11.95]Anh cũng cười thật tươi\n[01:14.82]Có đôi lời yêu em anh\n[01:16.45]Vẫn chưa dám ngỏ lời\n[01:18.51]Yêu bầu trời năm ấy\n[01:20.14]Cùng ngàn vệt nắng ở cuối trời\n[01:23.64]Vẫn nhớ bóng dáng đôi mươi\n[01:26.51]Nhớ nụ cười xuân thời\n[01:28.76]\n[01:31.39]Thích thì cứ bước chẳng sợ ai chê\n[01:35.11]Đam mê phía trước đừng đợi chờ lê thê\n[01:39.24]Mơ và hãy cứ ước\n[01:40.99]Thanh xuân cùng làm điều phi thường\n[01:43.99]Hẹn gặp nhau ở cuối con đường\n[01:47.43]Đời đổi thay thế giới vẫn quay\n[01:51.43]Tuổi thanh xuân như gió như mây\n[01:55.55]Cười thật tươi lên\n[01:56.80]Khi đôi môi ta còn đỏ mọng\n[02:00.24]Năm tháng ấy quay lại được không?\n[02:05.80]Những tháng ngày năm đó\n[02:07.43]Ta đã cười thật tươi\n[02:09.74]Mười tám đôi mươi\n[02:11.49]Những nụ cười đẹp nhất đời\n[02:13.74]Dẫu gian khó dẫu phong ba\n[02:18.12]Hiên ngang bước sóng gió sẽ qua\n[02:22.18]Những tháng ngày năm đó\n[02:23.80]Anh cũng cười thật tươi\n[02:26.24]Có đôi lời yêu em anh\n[02:27.93]Vẫn chưa dám ngỏ lời\n[02:30.24]Yêu bầu trời năm ấy\n[02:31.93]Cùng ngàn vệt nắng ở cuối trời\n[02:35.37]Vẫn nhớ bóng dáng đôi mươi\n[02:38.43]Nhớ nụ cười xuân thời\n[02:41.12]\n[02:57.49]Đã mãi xa rồi\n[02:58.74]Thời thanh xuân tươi nồng của tôi\n[03:01.99]Phải sống hạnh phúc\n[03:03.99]Nước mắt không rơi\n[03:06.37]Sau này ta sẽ có tất cả\n[03:10.59]Nhưng không có chúng ta\n[03:14.74]Oh oh oh\n[03:17.91]Những tháng ngày sau đó\n[03:19.79]Cũng phải cười thật tươi\n[03:21.98]Còn nhớ hay không\n[03:23.41]Những nụ cười đẹp nhất đời\n[03:25.91]Yêu bầu trời năm ấy\n[03:27.42]Cùng ngàn vệt nắng ở cuối trời\n[03:31.04]Vẫn nhớ bóng dáng đôi mươi\n[03:33.79]Nhớ nụ cười xuân thời\n[03:36.48]Na na na na\n[03:38.41]Oh oh oh\n[03:41.11]Yeah yeah Eh eh eh oh oh oh\n[03:48.91]Đưa tay đây nào\n[03:50.10]Mãi bên nhau bạn nhá\n[03:53.79]", //The Lyric(Extra)
            "transLyric": ""
        },
        {

            "name": "Em Chỉ Cần Nói Có", //The Music's Name
            "artist": "Doãn Hiếu", //The Music's Artist
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/3/d/e/2/3de225dff8e100f27e3ae4c767207ff0.jpg", //The Music's Cover
            "url": "https://dl.dropboxusercontent.com/s/e3tstvmw32cr4sp/Doan.Hieu-Em.Chi.Can.Noi.Co.mp3", //The Music's URL
            "loop": false, //If loop === true,the Music will be played again and again.
            "lyric": "[00:00.00]Bài hát: Em Chỉ Cần Nói Có\n[00:02.00]Ca sĩ: Doãn Hiếu\n[00:04.00]\n[00:20.29]Lại 1 đêm mơ thấy em\n[00:23.52]Ta về chung trên phố quen\n[00:27.46]Khuôn mặt em vẫn xinh như thường\n[00:31.27]Khuôn mặt anh vẫn hãm như cũ\n[00:36.58]Anh quay sang hỏi em yêu anh không\n[00:40.34]Em nói có i love you\n[00:44.46]Ôi thật phê biết mấy lần đầu tiên\n[00:46.77]Anh được nghe câu nói này\n[00:48.77]Vậy là thoát kiếp FA từ ngày hôm nay\n[00:53.52]Ôi tỉnh giấc mất rồi lại ôm đơn côi\n[00:57.58]Nhìn cơn mưa thấm nỗi sầu\n[01:01.52]Quyết định ngày hôm nay\n[01:03.33]Sẽ phải tỏ tình thật ngầu\n[01:05.52]Friendzone kia rồi sẽ về đâu\n[01:11.30]Anh không ngại gian khó\n[01:13.27]Anh chỉ cần lí do\n[01:15.09]Em chỉ cần nói có\n[01:16.52]Anh sẽ yêu em chẳng đắn đo\n[01:18.71]Tiền thì anh không có\n[01:20.58]Chung thủy thì không phải lo\n[01:22.58]Em chỉ cần nói có phần còn lại anh lo\n[01:26.46]Em chỉ cần nói có\n[01:28.02]Ngày mai đi học anh chở luôn\n[01:30.27]Dream còn bon lắm\n[01:32.15]Em không ngồi sau anh rất buồn\n[01:34.02]Anh đã có bằng lái vào trái tim em\n[01:37.77]Em chỉ cần nói có ngày mai\n[01:40.16]Anh mua nhẫn fake cho\n[01:41.98]Yeah yeah\n[01:44.16]\n[01:46.10]Do you biết me?\n[01:46.88]My name là Doãn Hiếu\n[01:48.50]Nếu em có hiểu được\n[01:49.92]Tấm chân tình này\n[01:50.85]Thì điền vào chỗ thiếu\n[01:52.47]Every lúc you, I look you so cute\n[01:56.28]Chiếc nhẫn của anh là fake\n[01:57.79]Nhưng mà tình cảm của anh là real\n[01:59.85]Giày họ Gucci, túi họ channel\n[02:03.91]Nhưng em đừng lo em ơi\n[02:05.35]Vì anh đây đã có cả mấy đàn heo\n[02:07.60]Yêu anh đi không chết đói đâu em à\n[02:10.82]Vàng bạc anh không có\n[02:12.01]Nhưng được cái về lúa\n[02:13.32]Thì anh lại chất cả đầy nhà\n[02:15.32]\n[02:16.82]Anh biết nhà anh nỏ giàu\n[02:18.44]Iphone nỏ có mà tặng đâu\n[02:20.57]Anh chỉ có món quà vô giá\n[02:22.32]Là tình yêu trao cho em đến bền lâu\n[02:24.51]Người ta có ô tô đưa em đi đây đi đó\n[02:27.02]Đi Vũng Tàu Nha Trang\n[02:27.94]Anh đây chỉ có con Dream\n[02:29.66]Đưa nàng đi dạo bên bờ sông Lam\n[02:32.16]Nấu ăn thì anh cũng nỏ giỏi\n[02:33.91]Cơm với trứng cũng đủ ngày 3 bữa\n[02:35.91]Nhưng mà nếu chỉ cần em nói có\n[02:37.60]Anh sẽ nấu bất kể nắng hay mưa\n[02:39.66]Và thơ anh không hay\n[02:41.22]Anh cũng nỏ phải Xuân Diệu\n[02:43.34]Nhưng mà nếu chỉ cần em nói có\n[02:45.27]Thì ngại gì mà không yêu\n[02:47.85]\n[02:48.18]Anh quay sang hỏi em yêu anh không\n[02:51.94]Em nói có i love you\n[02:56.06]Ôi thật phê biết mấy lần đầu tiên\n[02:58.37]Anh được nghe câu nói này\n[03:00.37]Vậy là thoát kiếp FA từ ngày hôm nay\n[03:05.12]Ôi tỉnh giấc mất rồi lại ôm đơn côi\n[03:09.18]Nhìn cơn mưa thấm nỗi sầu\n[03:13.12]Quyết định ngày hôm nay\n[03:14.93]Sẽ phải tỏ tình thật ngầu\n[03:17.12]Friendzone kia rồi sẽ về đâu\n[03:22.90]Anh không ngại gian khó\n[03:24.87]Anh chỉ cần lí do\n[03:26.69]Em chỉ cần nói có\n[03:28.12]Anh sẽ yêu em chẳng đắn đo\n[03:30.31]Tiền thì anh không có\n[03:32.18]Chung thủy thì không phải lo\n[03:34.18]Em chỉ cần nói có phần còn lại anh lo\n[03:38.06]Em chỉ cần nói có\n[03:39.62]Ngày mai đi học anh chở luôn\n[03:41.87]Dream còn bon lắm\n[03:43.75]Em không ngồi sau anh rất buồn\n[03:45.62]Anh đã có bằng lái vào trái tim em\n[03:49.37]Em chỉ cần nói có ngày mai\n[03:51.76]Anh mua nhẫn fake cho\n[03:53.58]Yeah yeah\n[03:55.76] ", //The Lyric(Extra)
            "transLyric": ""

        },
        {
            "name": "Hoa Hải Đường",
            "artist": "Jack",
            "image": "https://photo-resize-zmp3.zadn.vn/w360_r1x1_jpeg/avatars/5/1/5/c/515c86b8f10cd8e44fa77f195d0c286f.jpg",
            "url": "https://dl.dropboxusercontent.com/s/dle05qjk3nidc83/Jack-Hoa.Hai.Duong.mp3",
            "album": "The Best Of Jack",
            "time": "03:49",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/e/6/a/6/e6a6be98fb0201dd9f99db41d6ceee9a.lrc"
        },
        {
            "name": "万爱千恩 (Vạn Yêu Ngàn Ơn)",
            "artist": "王琪 (Vương Kỳ)",
            "image": "https://dl.dropboxusercontent.com/s/pz24y5l3p0gp5yq/%E7%8E%8B%E7%90%AA-Avatar.jpg?dl=0g",
            "url": "https://dl.dropboxusercontent.com/s/8vn0n71rby6iysc/%E7%8E%8B%E7%90%AA-%E4%B8%87%E7%88%B1%E5%8D%83%E6%81%A9%28Vuong.Ky-Van.Yeu.Ngan.On%29.mp3?dl=0",
            "album": "The Best Of 王琪 (Vương Kỳ)",
            "time": "05:22",
            "lyric": "[00:00.00]万爱千恩 - 王琪\n[00:06.65]词：王琪\n[00:08.70]曲：王琪\n[00:10.09]后期：文克津\n[00:12.17]编曲：达吾然\n[00:15.34]\n[00:18.61]你说最近常想起\n[00:22.00]\n[00:22.93]我的小手和小脚\n[00:26.21]\n[00:26.92]小手长大后\n[00:29.00]再没有跟你要过拥抱\n[00:33.92]\n[00:34.94]年幼的我\n[00:36.69]在你背上留下多少欢笑\n[00:41.48]\n[00:42.13]可现在回家才发现\n[00:46.10]你们悄悄累弯的腰\n[00:49.45]多少次把我扶起\n[00:53.58]转身又摔了一跤\n[00:56.91]\n[00:57.83]抬头的一瞬间总看到\n[01:01.55]你疼爱的微笑\n[01:04.96]\n[01:05.79]如今不在你身边\n[01:09.34]你千万可别摔倒\n[01:12.97]叫一声爸妈能有人回答\n[01:17.13]比啥都重要\n[01:21.03]都说养儿养女为了防老\n[01:24.49]可你总说自己过的挺好\n[01:28.39]辛辛苦苦把我养大\n[01:32.63]我却没在你身边尽孝\n[01:36.28]你们一定要把自己照顾好\n[01:39.88]等我成为你们的骄傲\n[01:43.37]\n[01:44.08]看着你们黑发变白发\n[01:48.04]我怕你们再等不了\n[01:51.28]\n[01:52.04]是不是我们都不长大\n[01:55.43]你们就不会变老\n[01:59.46]是不是我们再撒撒娇\n[02:03.10]你们还能把我举高高\n[02:06.91]\n[02:07.46]是不是这辈子不放手\n[02:10.79]下辈子我们还能遇到\n[02:14.47]\n[02:15.01]下辈子我一定好好听话\n[02:19.09]不再让你们操劳\n[02:22.61]\n[02:53.50]多少次把我扶起\n[02:57.05]\n[02:57.58]转身又摔了一跤\n[03:01.01]\n[03:01.53]抬头的一瞬间总看到\n[03:05.55]你疼爱的微笑\n[03:08.66]\n[03:09.52]如今不在你身边\n[03:13.05]你千万可别摔倒\n[03:16.83]叫一声爸妈能有人回答\n[03:20.96]比啥都重要\n[03:24.80]都说养儿养女为了防老\n[03:28.39]可你总说自己过的挺好\n[03:31.91]\n[03:32.67]辛辛苦苦把我养大\n[03:36.40]我却没在你身边尽孝\n[03:40.01]你们一定要把自己照顾好\n[03:43.64]等我成为你们的骄傲\n[03:47.14]\n[03:48.05]看着你们黑发变白发\n[03:51.82]我怕你们再等不了\n[03:55.19]\n[03:55.87]是不是我们都不长大\n[03:59.24]你们就不会变老\n[04:02.94]\n[04:03.64]是不是我们再撒撒娇\n[04:06.95]你们还能把我举高高\n[04:10.70]\n[04:11.30]是不是这辈子不放手\n[04:14.63]下辈子我们还能遇到\n[04:18.33]\n[04:19.05]下辈子我一定好好听话\n[04:22.96]不再让你们操劳\n[04:25.65]\n[04:26.92]是不是我们都不长大\n[04:30.13]你们就不会变老\n[04:33.78]\n[04:34.46]是不是我们再撒撒娇\n[04:37.79]你们还能把我举高高\n[04:41.53]\n[04:42.30]是不是这辈子不放手\n[04:45.55]下辈子我们还能遇到\n[04:49.24]\n[04:49.95]下辈子我一定好好听话\n[04:54.00]不再让你们操劳",
            "transLyric": "[00:00.00]Vạn Yêu Ngàn Ơn - Vương Kỳ\n[00:06.65]Ca sĩ: Vương Kỳ"
        },
        {
            "name": "Đom Đóm",
            "artist": "Jack",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/e/9/8/fe9875941d98fbbcb8aedc8960ccbc94.jpg",
            "url": "https://dl.dropboxusercontent.com/s//muofc5vqr3k7nkd/Jack-Dom.Dom.mp3?dl=0",
            "album": "The Best Of Jack",
            "time": "03:49",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/8/b/7/1/8b713855f4723300ea20dee21e0de310.lrc"
        },
        {
            "name": "Em Gì Ơi",
            "artist": "Jack, K-ICM",
            "image": "https://photo-resize-zmp3.zadn.vn/w480_r1x1_jpeg/cover/3/5/3/f/353f305006cc99e50ef00877e4135d0e.jpg",
            "url": "https://dl.dropboxusercontent.com/s/y3wnuekjwwgq7ua/Jack.K-ICM-Em.Gi.Oi.mp3",
            "album": "The Best Of Jack, K-ICM",
            "time": "04:06",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/d/1/1/b/d11bbf3763f1ec9c0acef2d27b17085b.lrc"
        },
        {
            "name": "Bạc Phận",
            "artist": "Jack, K-ICM",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/3/2/7/f/327f68099674128289ba8a2e98232d68.jpg",
            "url": "https://dl.dropboxusercontent.com/s/f7ivrvm7anwcgu8/Jack.K-ICM-Bac.Phan.mp3",
            "album": "The Best Of Jack, K-ICM",
            "time": "04:06",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/0/c/7/b/0c7b588e2c92897b7379507c94773f1f.lrc"
        },
        {
            "name": "Hồng Nhan",
            "artist": "Jack, K-ICM",
            "image": "https://photo-resize-zmp3.zadn.vn/w480_r1x1_jpeg/cover/3/5/3/f/353f305006cc99e50ef00877e4135d0e.jpg",
            "url": "https://dl.dropboxusercontent.com/s/2gjhjp7lf2n8qis/Jack.K-ICM-Hong.Nhan.mp3?dl=0",
            "album": "The Best Of Jack, K-ICM",
            "time": "03:12",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/1/a/e/a/1aea4ce69cc85d1cf9cf4e2a341c3916.lrc"
        },
        {
            "name": "Tình Sầu Thiên Thu Muôn Lối",
            "artist": "Doãn Hiếu",
            "url": "https://archive.org/download/doan.-hieu-tinh.-sau.-thien.-thu.-muon.-loi/Doan.Hieu-Tinh.Sau.Thien.Thu.Muon.Loi.mp3",
            "image": "https://ia801405.us.archive.org/9/items/doan.-hieu.-avatar-2/Doan.Hieu.Avatar2.jpg",
            "time": "04:23",
            "lyric": "https://dl.dropboxusercontent.com/s/m467b1twfinn341/Doan.Hieu-Tinh.Sau.Thien.Thu.Muon.Loi.lrc?dl=0"
        },
        {
            "name": "Nụ Cười 18 20",
            "artist": "Doãn Hiếu",
            "url": "https://dl.dropboxusercontent.com/s/fovzmhtf3flfek0/Doan.Hieu-Nu.Cuoi.18.20.mp3?dl=0",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/0/f/e/90fe14198ba6906f8fd2fb211c86ac01.jpg",
            "time": "04:10",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/c/d/6/d/cd6dcc5514039b4d74482f26de9b1dc5.lrc"
        },
        {
            "name": "Họ Yêu Ai Mất Rồi",
            "artist": "Doãn Hiếu",
            "url": "https://dl.dropboxusercontent.com/s/8wo1tk5lot1kgz5/Doan.Hieu-Ho.Yeu.Ai.Mat.Roi.mp3?dl=0",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/d/f/b/f/dfbffc3b7c5a84a630371f1a1cf46e0d.jpg",
            "time": "05:3",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/8/c/8/1/8c81b9649aa28bc93e05ef3c6ce584c9.lrc"
        },
        {
            "name": "Em Chỉ Cần Nói Có",
            "artist": "Doãn Hiếu",
            "url": "https://dl.dropboxusercontent.com/s/e3tstvmw32cr4sp/Doan.Hieu-Em.Chi.Can.Noi.Co.mp3?dl=0",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/3/d/e/2/3de225dff8e100f27e3ae4c767207ff0.jpg",
            "time": "04:11",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/7/9/f/5/79f57e35df76b6cd549eb97f657834db.lrc"
        },
        {
            "name": "Chơi Vơi Giữa Trời",
            "artist": "Doãn Hiếu",
            "url": "https://dl.dropboxusercontent.com/s/yjsnopcz6tdnrwp/Doan.Hieu-Choi.Voi.Giua.Troi.mp3?dl=0",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/6/0/f/260f2de0a7e4e7209ea1c48fb0110127.jpg",
            "time": "05:15",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/c/e/e/a/ceea865af3ae17a571a048fcb67235cf.lrc"
        },
        {
            "name": "Bình Yên Nơi Này",
            "artist": "Doãn Hiếu",
            "url": "https://dl.dropboxusercontent.com/s/dv30xwc7kjeklw0/Doan.Hieu-Binh.Yen.Noi.Nay.mp3?dl=0",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/6/2/2/6/622654f1b82becb35439ed3b85de672e.jpg",
            "time": "05:14",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/3/1/7/2/31723fb5e782dd5a04c5255cd998cdac.lrc"
        },
        {
            "name": "Mỹ Nhân",
            "artist": "Đinh Đại Vũ",
            "url": "https://archive.org/download/dinh.-dai.-vu-my.-nhan/Dinh.Dai.Vu-My.Nhan.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/c/5/7/5/c5755041f2554fe3d132f9e0b4a085ca.jpg",
            "time": "04:27",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/4/a/b/5/4ab5f4fd09865878c23d4aea76a14fce.lrc"
        },
        {
            "name": "Huynh Đệ À",
            "artist": "Đinh Đại Vũ",
            "url": "https://dl.dropboxusercontent.com/s/whm7q7qd1l54wuc/Dinh.Dai.Vu-Huynh.De.A.mp3?dl=0",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/8/d/7/98d7998a7c74ce85500fb19f8ede6150.jpg",
            "time": "04:27",
            "note": "Lời bài hát của zingmp3 chưa chuẩn rồi ^_^",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/1/1/7/c/117c480ea17fe29e30ce12a9a66da40e.lrc"
        },
        {
            "name": "Như Giớ Với Mây",
            "artist": "Đinh Đại Vũ",
            "url": "https://dl.dropboxusercontent.com/s/hmrblggjaoihssx/Dinh.Dai.Vu-Nhu.Gio.Voi.May.mp3?dl=0",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/covers/9/0/9077be3d75d7f60649a864a5a1c0c0b8_1496740599.jpg",
            "time": "03:43",
            "note": "https://dl.dropboxusercontent.com/s/s0tilop77l3t2j5/Dinh.Dai.Vu-Nhu.Gio.Voi.May.lrc?dl=0",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/f/0/b/1/f0b187db941381fbe1681e1a720cacc9.lrc"
        },
        {
            "name": "Từng Yêu",
            "artist": "Phan Duy Anh",
            "url": "https://archive.org/download/phan.-duy.-anh-tung.-yeu/Phan.Duy.Anh-Tung.Yeu.mp3",
            "image": "https://dl.dropboxusercontent.com/s/iz3x7w3w1wfldd4/Phan.Duy.Anh.Avatar2.jpg",
            "time": "05:04",
            "lyric": "https://dl.dropboxusercontent.com/s/6yv58r3vxxgbjvd/Phan.Duy.Anh-Tung.Yeu.lrc?dl=0"
        },
        {
            "name": "Gặp Đúng Người Sai Thời Điểm",
            "artist": "Trương Linh Đan",
            "url": "https://dl.dropboxusercontent.com/s/6dzrckszb2p6e9d/Truong.Linh.Dan-Gap.Dung.Nguoi.Sai.Thoi.Diem.mp3",
            "image": "https://dl.dropboxusercontent.com/s/anfc4gf1rxb7v2e/Truong.Linh.Dan-Gap.Dung.Nguoi.Sai.Thoi.Diem.Avatar.jpg",
            "time": "04:29",
            "lyric": "https://dl.dropboxusercontent.com/s/kv0s2hxrdmba6po/Truong.Linh.Dan-Gap.Dung.Nguoi.Sai.Thoi.Diem.lrc?dl=0"
        },
        {
            "name": "Cô gái M52",
            "artist": "HuyR ft Tùng Viu",
            "url": "https://dl.dropboxusercontent.com/s/apzykhmjjbrnr3l/Co-Gai-M52-HuyRftTungViu.mp3",
            "image": "https://zmp3-photo.zadn.vn/thumb/240_240/covers/f/f/ff44d05771e686143a49b6a73dd844bb_1519265212.jpg",
            "time": "03:33",
            "lyric": "https://dl.dropboxusercontent.com/s/tna8vn6q0pdraow/HuyR.TungViu_Co.Gai.M52.lrc?dl=0"
        },
        {
            "name": "Ngắm Hoa Lệ Rơi",
            "artist": "Châu Khải Phong",
            "url": "https://dl.dropboxusercontent.com/s/vboepo1elrfaa6p/Ngam-Hoa-Le-Roi-Chau.Khai.Phong.mp3",
            "image": "https://zmp3-photo.zadn.vn/thumb/240_240/covers/6/9/69f213a075a1ef6b0b042e242c837178_1489986205.png",
            "time": "05:07",
            "lyric": "https://dl.dropboxusercontent.com/s/ecxh7g6zvlh0qmh/Chau.Khai.Phong_Ngam.Hoa.Le.Roi.lrc?dl=0"
        },
        {
            "name": "Đơn Côi",
            "artist": "Trương Quỳnh Anh",
            "url": "https://dl.dropboxusercontent.com/s/oeo652ne9xy2v7o/Truong_Quynh_Anh_-_Don_Coi.mp3?dl=0",
            "time": "03:17",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/1/7/170d632a3afa46e0b9699e3f23c3a553_1470125521.jpg",
            "lyric": "https://dl.dropboxusercontent.com/s/dyugzs8ayz25yyz/Truong%20Quynh%20Anh%20-%20Don%20Coi.lrc?dl=0"
        },
        {
            "name": "Nhật Ký",
            "artist": "Triệu Hoàng",
            "url": "https://dl.dropboxusercontent.com/s/7t60ybkt7flzw3g/Trieu.Hoang-Nhat.Ky.2.mp3",
            "image": "http://avatar.nct.nixcdn.com/singer/avatar/2014/08/06/7/b/7/c/1407285185089.jpg",
            "time": "04:16",
            "lyric": "https://dl.dropboxusercontent.com/s/8zxij7waw616hnj/Trieu.Hoang_Nhat.Ky.lrc?dl=0"
        },
        {
            "name": "Giá Như Trên Đời Chỉ Cần Tình Yêu",
            "artist": "Cao Thái Sơn",
            "url": "https://dl.dropboxusercontent.com/s/chwwi4yixialf6x/Cao.Thai.Son-Gia.Nhu.Tren.Doi.Chi.Can.Tinh.Yeu.mp3",
            "image": "https://dl.dropboxusercontent.com/s/9shjtde2qk7h1gz/CaoThaiSon.Avatar.jpg",
            "time": "03:30",
            "lyric": "https://dl.dropboxusercontent.com/s/6sso3ohbkc3m3uz/Cao.Thai.Son-Gia.Nhu.Tren.Doi.Chi.Can.Tinh.Yeu.lrc"
        },
        {
            "name": "Gõ Cửa Trái Tim",
            "artist": "Quang Lê ft Mai Thiên Vân",
            "url": "https://dl.dropboxusercontent.com/s/ga5qxvxojc7ndw6/Quang.Le-Mai.Thien.Van-Go.Cua.Trai.Tim.mp3",
            "image": "https://dl.dropboxusercontent.com/s/gumpz1qhd3chopd/QuangLe.Cover.jpg",
            "time": "05:25",
            "lyric": "https://dl.dropboxusercontent.com/s/r3o09gzuoyc64bn/Quang.Le-Mai.Thien.Van-Go.Cua.Trai.Tim.lrc"
        },
        {
            "name": "Thương Em Hơn Chính Anh",
            "artist": "Jun Phạm",
            "url": "https://dl.dropboxusercontent.com/s/gevrj580lre3621/Jun.Pham-Thuong.Em.Hon.Chinh.Anh.mp3",
            "image": "https://dl.dropboxusercontent.com/s/vj1h7b0w9gb5u22/JunPham.Cover.jpg",
            "time": "04:29",
            "lyric": "https://dl.dropboxusercontent.com/s/fjvmnha5ingizb7/Jun.Pham-Thuong.Em.Hon.Chinh.Anh.lrc"
        },
        {
            "name": "Con Đường Mưa",
            "artist": "Cao Thái Sơn",
            "url": "https://dl.dropboxusercontent.com/s/ss7kw71918xfn1c/Cao.Thai.Son-Con.Duong.Mua.mp3",
            "image": "https://dl.dropboxusercontents.com/s/9shjtde2qk7h1gz/CaoThaiSon.Avatar.jpg",
            "time": "05:06",
            "lyric": "https://dl.dropboxusercontent.com/s/sl377hljfdht6q6/Cao.Thai.Son-Con.Duong.Mua.lrc?dl=0"
        },
        {
            "name": "Sầu Tím Thiệp Hồng",
            "artist": "Quang Lệ ft Lệ Quyên",
            "url": "https://dl.dropboxusercontent.com/s/2ua4dr4i03szaue/Quang.Le-Mai.Thien.Van-Sau.Tim.Thiep.Hong.mp3",
            "image": "https://dl.dropboxusercontent.com/s/gumpz1qhd3chopd/QuangLe.Cover.jpg",
            "time": "04:47",
            "lyric": "https://dl.dropboxusercontent.com/s/ix2ass42xb8259v/Quang.Le-Le.Quyen-Sau.Tim.Thiep.Hong.lrc?dl=0"
        },
        {
            "name": "Duyên Phận",
            "artist": "Dương Hồng Loan",
            "url": "https://dl.dropboxusercontent.com/s/umvdb6fhxdtgkqd/Duong.Hong.Loan-Duyen.Phan.mp3",
            "image": "https://dl.dropboxusercontent.com/s/saclznj6bv9nq7t/Duong.Hong.Loan.jpg",
            "time": "05:48",
            "lyric": "https://dl.dropboxusercontent.com/s/5bc9bhizv5gce5q/Duong.Hong.Loan-Duyen.Phan.lrc"
        },
        {
            "name": "Thề Non Hẹn Biển",
            "artist": "Trường Sơn ft Kim Thư",
            "url": "https://dl.dropboxusercontent.com/s/ljd2bfndhlnkpig/Truong.Son-Kim.Thu-The.Non.Hen.Bien.mp3",
            "image": "https://dl.dropboxusercontent.com/s/8ldzy6keyv1wv5i/Truong.Son-Kim.Thu.jpg",
            "time": "03:39",
            "lyric": "https://dl.dropboxusercontent.com/s/wve9lots4rwzlmc/Truong.Son-Kim.Thu-The.Non.Hen.Bien.lrc?dl=0"
        },
        {
            "name": "Nối Lại Tình Xưa",
            "artist": "Như Quỳnh ft Mạnh Quỳnh",
            "url": "https://dl.dropboxusercontent.com/s/hcfkr28rqwsx63q/Nhu.Quynh-Manh.Quynh-Noi.Lai.Tinh.Xua.mp3",
            "image": "https://dl.dropboxusercontent.com/s/e43ag10d6ifzxi4/Nhu.Quynh.jpg",
            "time": "04:43",
            "lyric": "https://dl.dropboxusercontent.com/s/hj1k2p1910njvhv/Nhu.Quynh-Manh.Quynh-Noi.Lai.Tinh.Xua.lrc"
        },
        {
            "name": "Đắp Mộ Cuộc Tình",
            "artist": "Lê Sang",
            "url": "https://dl.dropboxusercontent.com/s/vee92e4p9e7sjag/Le.Sang-Dap.Mo.Cuoc.Tinh.mp3",
            "image": "https://dl.dropboxusercontent.com/s/hhi0bwu4izfiyh3/Le.Sang.jpg",
            "time": "05:21",
            "lyric": "https://dl.dropboxusercontent.com/s/69keeq27nx8d1er/Le.Sang-Dap.Mo.Cuoc.Tinh.lrc"
        },
        {
            "name": "Cát Bụi Cuộc Đời",
            "artist": "Lê Sang",
            "url": "https://dl.dropboxusercontent.com/s/tfi54bgbr4kvgcp/Le.Sang-Cat.Bui.Cuoc.Doi.mp3",
            "image": "https://dl.dropboxusercontent.com/s/hhi0bwu4izfiyh3/Le.Sang.jpg",
            "time": "05:35",
            "lyric": "https://dl.dropboxusercontent.com/s/78plef7c41wy86w/Le.Sang-Cat.Bui.Cuoc.Doi.lrc"
        },
        {
            "name": "Con Đường Xưa Em Đi",
            "artist": "Lưu Anh Loan ft Lê Sang",
            "url": "https://dl.dropboxusercontent.com/s/8kymnbxkm5ollgf/Luu.Anh.Loan-Le.Sang-Con.Duong.Xua.Em.Di.mp3",
            "image": "https://dl.dropboxusercontent.com/s/0vfwlw0wx445heg/Luu.Anh.Loan.jpg",
            "time": "04:46",
            "lyric": "https://dl.dropboxusercontent.com/s/3xpe7996nk5ysgn/Luu.Anh.Loan-Le.Sang-Con.Duong.Xua.Em.Di.lrc"
        },
        {
            "name": "Hoa Bằng Lăng",
            "artist": "Jimmy Nguyễn",
            "url": "https://dl.dropboxusercontent.com/s/gmv5bk246o5hntz/Jimmy.Nguyen-Hoa.Bang.Lang.mp3",
            "image": "https://dl.dropboxusercontent.com/s/lustc200i1w8rp9/Jimmy.Nguyen.jpg",
            "time": "03:24",
            "lyric": "https://dl.dropboxusercontent.com/s/obtiwa6ymi6sjgi/Jimmy.Nguyen-Hoa.Bang.Lang.lrc"
        },
        {
            "name": "Tình Xưa Nghĩa Cũ",
            "artist": "Jimmy Nguyễn",
            "url": "https://dl.dropboxusercontent.com/s/mp54pull4g9dgmf/Jimmy.Nguyen-Tinh.Xua.Nghia.Cu.mp3",
            "image": "https://dl.dropboxusercontent.com/s/lustc200i1w8rp9/Jimmy.Nguyen.jpg",
            "time": "03:23",
            "lyric": "https://dl.dropboxusercontent.com/s/hp349wpd59eb9u2/Jimmy.Nguyen-Tinh.Xua.Nghia.Cu.lrc"
        },
        {
            "name": "Ngồi Đây Vẫn Mong Đợi",
            "artist": "Jimmy Nguyễn",
            "url": "https://dl.dropboxusercontent.com/s/8ll0330p6v66u6x/Jimmy.Nguyen-Ngoi.Day.Van.Mong.Doi.mp3",
            "image": "https://dl.dropboxusercontent.com/s/lustc200i1w8rp9/Jimmy.Nguyen.jpg",
            "time": "05:12",
            "lyric": "https://dl.dropboxusercontent.com/s/f2aeid6n7kbqknq/Jimmy.Nguyen-Ngoi.Day.Van.Mong.Doi.lrc"
        },
        {
            "name": "Cố Quên",
            "artist": "Jimmy Nguyễn",
            "url": "https://dl.dropboxusercontent.com/s/oliutpf0r3jyttl/Jimmy.Nguyen-Co.Quen.mp3",
            "image": "https://dl.dropboxusercontent.com/s/lustc200i1w8rp9/Jimmy.Nguyen.jpg",
            "time": "04:23",
            "lyric": "https://dl.dropboxusercontent.com/s/ksa84wujqn9dy56/Jimmy.Nguyen-Co.Quen.lrc"
        },
        {
            "name": "Tôi Ngàn Năm Đợi",
            "artist": "Lam Trường",
            "url": "https://dl.dropboxusercontent.com/s/v1y41t8toihe9e3/Lam.Truong-Toi.Ngan.Nam.Doi.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/c/0c03c83c0910c8752c256694638c4576_1509937204.jpg",
            "time": "04:58",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2017/01/05/dbb16df0fd1d0896ce6d7336fce8d626_1074291237.lrc"
        },
        {
            "name": "Trái Tim Bên Lề",
            "artist": "Bằng Kiều",
            "url": "https://dl.dropboxusercontent.com/s/erqes7ckan8dqa6/Bang.Kieu-Trai.Tim.Ben.Le.mp3?dl=0",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/8/4/84d49670aa357051bd72b18ce0feedd8_1446460401.jpg",
            "time": "05:17",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/7/a/4/8/7a4859bd34c85b1a0273eb7db6d4e7ef.lrc"
        },
        {
            "name": "Tình Đơn Phương",
            "artist": "Lam Trường",
            "url": "https://dl.dropboxusercontent.com/s/ac2aa1cf54dohum/Lam.Truong-Tinh.Don.Phuong.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/c/0c03c83c0910c8752c256694638c4576_1509937204.jpg",
            "time": "04:12",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2017/01/05/84e0c113ca4c106bd31ccca004940f70_1074291239.lrc"
        },
        {
            "name": "Tình Phai",
            "artist": "Lam Trường",
            "url": "https://dl.dropboxusercontent.com/s/6tw7kqpnne1zfgf/Lam.Truong-Tinh.Phai.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/c/0c03c83c0910c8752c256694638c4576_1509937204.jpg",
            "time": "04:48",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2017/01/05/354547da04d17cfb9954c55cc278c8a8_1074291242.lrc"
        },
        {
            "name": "Khi Nào Em Mới Biết",
            "artist": "Minh Thuận",
            "url": "https://dl.dropboxusercontent.com/s/46bu9zvdkyab0r5/Minh.Thuan-Khi-Nao-Em-Moi-Biet.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/4/9/490d8de4ff5975b3a7d5f1ddc4729853_1510490359.jpg",
            "time": "03:49",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/8/6/a/b/86ab94fc46948fdd3a5f3c1b508d9ce2.lrc"
        },
        {
            "name": "Một Thời Đã Xa",
            "artist": "Phương Thanh",
            "url": "https://dl.dropboxusercontent.com/s/grumn8wmecrwz9n/Phuong.Thanh-Mot.Thoi.Da.Xa.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/7/1/6/f/716f765d92c139123235d20f77e8c585.jpg",
            "time": "06:30",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2015/f/3/f33595003a668a03b22d6ade7222784c_1074291244.lrc"
        },
        {
            "name": "Ảo Mộng Tình Yêu",
            "artist": "Đan Trường ft Cẩm Ly",
            "url": "https://dl.dropboxusercontent.com/s/cqwp99utqm6dp5q/Dan.Truong-Cam.Ly-Ao.Mong.Tinh.Yeu.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/7/2/f/072fc82083bbf30a171de034a71b3dbb.jpg",
            "time": "05:56",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/f/2/4/5/f2451724474f1de494e0739ada0422e6.lrc"
        },
        {
            "name": "Biệt Khúc",
            "artist": "Lam Trường",
            "url": "https://dl.dropboxusercontent.com/s/w1ezerhvogocp6t/Lam.Truong-Biet.Khuc.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/c/0c03c83c0910c8752c256694638c4576_1509937204.jpg",
            "time": "05:33",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2017/01/05/690891b89905656129e32e0c6a2de4b7_1074291245.lrc"
        },
        {
            "name": "Tình Xa Khuất",
            "artist": "Phương Thanh",
            "url": "https://dl.dropboxusercontent.com/s/yh72fai2b5i6nie/Phuong.Thanh-Tinh.Xa.Khuat.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/7/1/6/f/716f765d92c139123235d20f77e8c585.jpg",
            "time": "05:28",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2/4/b/7/24b76dfbd03b9120a167fc8c26408156.lrc"
        },
        {
            "name": "Phố Cũ Vắng Anh",
            "artist": "Cẩm Ly",
            "url": "https://dl.dropboxusercontent.com/s/ui6zxd50xbrmanp/Cam.Ly-Pho.Cu.Vang.Anh.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/a/5/3/e/a53e95551cdc52a921e3872b2c68cc30.jpg",
            "time": "04:21",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2015/3/b/3b68872d47973918c927f4bbdaec63de_1074291249.lrc"
        },
        {
            "name": "Tình Đơn Phương 2",
            "artist": "Lam Trường",
            "url": "https://dl.dropboxusercontent.com/s/zpcge9virw9obxx/Lam.Truong-Tinh.Don.Phuong.2.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/c/0c03c83c0910c8752c256694638c4576_1509937204.jpg",
            "time": "04:26",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2017/01/05/30fee4f1b4328d3d8dea0fb9a15d7f8f_1074291250.lrc"
        },
        {
            "name": "Tình 1088",
            "artist": "1088",
            "url": "https://dl.dropboxusercontent.com/s/1xdnx8k423v67rr/1088-Tinh.1088.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/6/8/68d5535b971d558f594f10a5affd0a71_1285661324.jpg",
            "time": "03:29",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/6/5/5/b/655b24e882ca60d109901748ce25eb3c.lrc"
        },
        {
            "name": "Tình Đơn Côi",
            "artist": "Phi Hùng",
            "url": "https://dl.dropboxusercontent.com/s/qdyx8xe14eobmlc/Phi.Hung-Tinh.Don.Coi.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/4/1/41e23f2e81f47c4f9a621244ef4045a4_1502336403.jpg",
            "time": "04:42",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2015/0/9/09ba9aa19a0ca7db27fe8290ee8764a5_1074291252.lrc"
        },
        {
            "name": "Giấc Mơ Mùa Đông",
            "artist": "Đan Trường",
            "url": "https://dl.dropboxusercontent.com/s/cah5pcrgzsjw54i/Dan.Truong-Giac.Mo.Mua.Dong.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/7/2/f/072fc82083bbf30a171de034a71b3dbb.jpg",
            "time": "05:35",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/2015/f/1/f1e6e0d176af4b85f9e9013d09fb801d_1074291254.lrc"
        },
        {
            "name": "Dáng Em",
            "artist": "Phi Hùng",
            "url": "https://dl.dropboxusercontent.com/s/s1he3dkfdm9jwr8/Phi.Hung-Dang.Em.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/4/1/41e23f2e81f47c4f9a621244ef4045a4_1502336403.jpg",
            "time": "04:41",
            "lyric": "https://static-zmp3.zadn.vn/lyrics/8/b/e/3/8be3598599bd7f925c2c0e4b357e5c77.lrc"
        },
        {
            "name": "Ngàn Năm Khó Phai",
            "artist": "Hoàng Châu",
            "url": "https://dl.dropboxusercontent.com/s/0ag30e095qreui2/Hoang.Chau-Ngan.Nam.Kho.Phai.mp3",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/3/f/3fb2db6cccf4a23383383394b28b2b31_1514518552.jpg",
            "time": "05:01",
            "lyric": "https://dl.dropboxusercontent.com/s/bumtqawo4h39gzd/Hoang.Chau-Ngan.Nam.Kho.Phai.lrc"
        },
        {
            "name": "Liên Khúc Ngày Xưa Anh Nói",
            "artist": "Tuấn Vũ",
            "image": "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/covers/5/8/582048bd92b50c16221e05e1bcd26abc_1357462261.jpg",
            "url": "https://dl.dropboxusercontent.com/s/rnwpufu5m31j0g1/Tuan.Vu-Lien.Khuc.Tuan.Vu.1.mp3",
            "album": "The Best Of Tuan Vu",
            "time": "15:18",
            "lyric": "https://dl.dropboxusercontent.com/s/gtky197zz4prcmv/Tuan.Vu-Lien.Khuc.Ai.Cho.Toi.Tinh.Yeu.lrc"
        },
        {
            "name": "Liên Khúc Bông Cỏ May",
            "artist": "Tuấn Vũ",
            "url": "https://dl.dropboxusercontent.com/s/vjeeyj5jpbdhzsp/Tuan.Vu-Lien.Khuc.Tuan.Vu.1-Phan.2.Bong.Co.May.mp3?dl=0",
            "image": "http://zmp3-photo.d.za.zdn.vn/covers/5/8/582048bd92b50c16221e05e1bcd26abc_1357462261.jpg",
            "time": "14:40",
            "lyric": "https://dl.dropboxusercontent.com/s/62y520oraxhoadw/Tuan.Vu-Lien.Khuc.Tuan.Vu.1-Phan.2.Bong.Co.May.lrc?dl=0"
        }
    ]
});
addEventListener("keypress", function(e) {
    if (e.keyCode === 13) cp.__LIST__.toggle.click()
});
cp.__LIST__.img.onload = () => {
    document.querySelector(".bg").style.backgroundImage = "url(" + cp.__LIST__.img.src + ")"
};
