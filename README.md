# NGUYEN MART - HỆ THỐNG SÀN THƯƠNG MẠI ĐIỆN TỬ VIỆT NAM

> **Slogan:** Mua sắm dễ dàng – Giá tốt mỗi ngày  
> **Ngôn ngữ:** Tiếng Việt  
> **Tiền tệ:** Việt Nam Đồng (VNĐ)  
> **Công nghệ:** React 19 + Vite 8 + Tailwind CSS 3 + Lucide Icons + Canvas Confetti  
> **Địa chỉ chạy thử:** `http://localhost:3000/`

---

## 🌟 TỔNG QUAN TÍNH NĂNG

### 1. Giao Diện & Trải Nghiệm Khách Hàng (Shopee-Inspired)
- **Header thông minh:** 
  - Thanh thông báo ưu đãi Freeship từ 99k, mã hot trong ngày `FREESHIP0D`.
  - Logo thương hiệu NGUYEN MART độc quyền với biểu tượng giỏ hàng & chữ N cách điệu màu cam/vàng.
  - Ô tìm kiếm lớn hỗ trợ gợi ý từ khóa và sản phẩm trực tiếp (Instant Search Autocomplete).
  - Giỏ hàng với icon thông báo số lượng và popup preview hiển thị các món vừa thêm khi rê chuột.
  - Menu tài khoản người dùng: Thông tin, Đơn mua, Sản phẩm yêu thích, Kho Voucher, Đăng xuất.
- **Trang chủ đầy đủ phân khu:**
  - Hero Banner Carousel tự động chuyển slide, 2 Sub-banner khuyến mãi.
  - 8 nút tiện ích dịch vụ: Khung giờ săn sale, Miễn phí vận chuyển, Nguyen Mall, Mã giảm giá, Hàng quốc tế, Siêu thị Nguyen, Xu thưởng, Hàng hiệu -50%.
  - Danh mục nổi bật với 8 ngành hàng lớn (Điện thoại, Laptop, Thời trang Nam, Thời trang Nữ, Mỹ phẩm, Gia dụng, Phụ kiện, Thực phẩm).
  - Flash Sale với đồng hồ đếm ngược từng giây (HH:MM:SS), thanh tiến trình ngọn lửa "ĐÃ BÁN xx", "CHỈ CÒN xx".
  - Nguyen Mart Mall: Khu vực hàng chính hãng 100%, 7 ngày đổi trả, cam kết thương hiệu (Apple, Samsung, Xiaomi, Philips, Coolmate, La Roche-Posay...).
  - Kho Voucher toàn sàn: Click là lưu/áp dụng ngay (`FREESHIP0D`, `NGUYENMART50K`, `SUPER10`, `NGUYENMALL100`).
  - Gợi ý hôm nay (Daily Discover): Tabs Bán chạy, Giá sốc, Shop yêu thích; Lọc giá từ-đến, lọc thương hiệu, sắp xếp giá/bán chạy/mới nhất; Nút tải thêm sản phẩm.
- **Trang chi tiết sản phẩm:**
  - Bộ sưu tập ảnh sản phẩm với thumbnail tương tác.
  - Thông số kỹ thuật, bảo hành chính hãng, nguồn gốc xuất xứ.
  - Lựa chọn phân loại màu sắc, kích thước, dung lượng với phản hồi trực quan.
  - Bộ chọn số lượng có kiểm tra giới hạn tồn kho.
  - Nút "Thêm vào giỏ hàng" và "Mua ngay".
  - Đánh giá sản phẩm: Thống kê số sao, lọc đánh giá, bình luận khách hàng kèm form viết đánh giá mới.
  - Danh sách sản phẩm tương tự cùng danh mục.
- **Giỏ hàng (Cart):**
  - Thanh tiến trình nhận Miễn Phí Vận Chuyển (Freeship progress bar) cho đơn từ 99.000₫.
  - Chọn/bỏ chọn từng sản phẩm hoặc toàn bộ giỏ hàng.
  - Tăng giảm số lượng, xóa từng món, tự động tính tổng tiền.
  - Áp dụng mã giảm giá và giảm giá vận chuyển.
  - Lưu trữ bền vững trong LocalStorage.
- **Quy trình thanh toán (Checkout):**
  - Chọn hoặc thêm địa chỉ nhận hàng mới trực tiếp.
  - Chọn tốc độ giao hàng: Nhanh (SPX Express) hoặc Hỏa tốc 2 giờ.
  - Đa dạng phương thức thanh toán: COD (Tiền mặt), Chuyển khoản VietQR ngân hàng (có mã QR động và thông tin tài khoản MBBank), Ví MoMo / VNPay demo.
  - Trang xác nhận đơn hàng thành công với mã đơn, mã vận đơn, tiến trình giao hàng và hiệu ứng pháo hoa confetti.
- **Quản lý tài khoản (Account):**
  - Hồ sơ cá nhân và số dư xu tích lũy.
  - Quản lý sổ địa chỉ giao hàng (Thêm mới, xóa, đặt mặc định).
  - Lịch sử đơn mua với bộ lọc theo trạng thái (Chờ xác nhận, Đang giao, Hoàn thành, Đã hủy).
  - Cho phép khách hàng tự hủy đơn hàng khi đơn còn ở trạng thái "Chờ xác nhận".
  - Danh sách sản phẩm yêu thích (Wishlist).
  - Kho voucher khả dụng của người dùng.

---

### 2. Phân Hệ Quản Trị Admin (Nguyen Mart Admin Portal)
- **Bảo mật & Phân quyền:**
  - Chỉ tài khoản có vai trò `admin` mới được vào khu vực quản trị.
  - Cung cấp nút chuyển nhanh 1-chạm giữa chế độ Người Mua và Quản Trị Viên để dễ dàng kiểm thử.
- **Báo cáo & Thống kê (Overview Dashboard):**
  - Thẻ chỉ số Doanh thu tổng, Số đơn hàng, Khách hàng đăng ký, Tồn kho sản phẩm.
  - Biểu đồ cột SVG trực quan biểu thị mức tăng trưởng doanh thu qua từng tháng trong năm 2026.
  - Bảng danh sách các đơn hàng mới nhất cần duyệt.
- **Quản lý sản phẩm (Product CRUD):**
  - Tìm kiếm sản phẩm theo tên, SKU, thương hiệu; lọc theo danh mục.
  - Thêm sản phẩm mới (tên, danh mục, thương hiệu, giá bán, giá gốc, tồn kho, ảnh, mô tả, tích chọn Mall/Flash Sale).
  - Chỉnh sửa thông tin sản phẩm và xóa sản phẩm.
- **Quản lý đơn hàng (Order Management):**
  - Xem danh sách toàn bộ đơn hàng khách đã đặt trên sàn.
  - Cập nhật trạng thái đơn hàng theo thời gian thực (Chờ xác nhận &rarr; Đang đóng gói &rarr; Đang giao hàng &rarr; Đã hoàn thành &rarr; Đã hủy).
  - Xem chi tiết từng đơn hàng (khách hàng, SĐT, địa chỉ, danh sách món hàng, tổng tiền).
- **Quản lý khách hàng:**
  - Danh sách khách hàng thân thiết, thông tin liên hệ, tổng tiền đã chi tiêu, hạng thành viên VIP.
- **Quản lý Voucher:**
  - Thêm mới voucher toàn sàn với mã code, mức giảm, giá trị đơn hàng tối thiểu.
- **Khôi phục dữ liệu mẫu (Reset Data):**
  - Nút bấm khôi phục nhanh toàn bộ 24+ sản phẩm gốc và đơn hàng mẫu bất cứ lúc nào.

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

```bash
# Di chuyển vào thư mục dự án
cd C:\Users\ADMIN\.gemini\antigravity\scratch\nguyen-mart

# Cài đặt gói phụ thuộc (nếu tải mới)
npm install

# Khởi chạy server phát triển (Development Server)
npm run dev

# Hoặc build bản triển khai sản phẩm (Production Build)
npm run build
```

Mở trình duyệt truy cập: **`http://localhost:3000`**

---

## 🔌 HƯỚNG DẪN TÍCH HỢP BACKEND & CỔNG THANH TOÁN THỰC TẾ

Hiện tại toàn bộ dữ liệu (Sản phẩm, Đơn hàng, Giỏ hàng, Voucher, Người dùng, Đánh giá) hoạt động đồng bộ thông qua **LocalStorage State Management**, giúp website lưu giữ mọi thao tác thêm/sửa/xóa ngay cả khi tải lại trang.

Để kết nối với hệ thống Backend thực tế trong tương lai:
1. **Cơ sở dữ liệu & API Backend:**
   - Dùng Node.js (NestJS / Express) hoặc Python (FastAPI / Django) kết nối cơ sở dữ liệu PostgreSQL / MongoDB.
   - Thay thế các hàm gọi trong `src/context/StoreContext.jsx` bằng các cuộc gọi API `fetch()` hoặc `axios` tới RESTful API / GraphQL endpoints.
2. **Cổng thanh toán thực tế:**
   - **VietQR:** Kết nối với API OpenBanking của MBBank, Vietcombank, Vietinbank hoặc cổng PayOS / Casso để tự động nhận Webhook khi khách chuyển khoản thành công.
   - **VNPay / MoMo:** Đăng ký Merchant ID và tích hợp SDK VNPay Sandbox / MoMo Payment Gateway.
3. **Lưu trữ hình ảnh:**
   - Tích hợp Cloudinary API hoặc AWS S3 / Firebase Storage vào form tải ảnh sản phẩm trong trang Admin.
