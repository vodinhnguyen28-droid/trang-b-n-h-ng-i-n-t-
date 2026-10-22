import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

const DATA_DIR = path.join(__dirname, 'server_data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const VOUCHERS_FILE = path.join(DATA_DIR, 'vouchers.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Helper đọc/ghi JSON
const readData = (filePath, defaultData = []) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Lỗi đọc file ${filePath}:`, err);
    return defaultData;
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Lỗi ghi file ${filePath}:`, err);
    return false;
  }
};

// Seed dữ liệu ban đầu từ mockData nếu chưa có
import('./src/data/mockData.js').then((mock) => {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    writeData(PRODUCTS_FILE, mock.INITIAL_PRODUCTS);
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    writeData(ORDERS_FILE, mock.INITIAL_ORDERS);
  }
  if (!fs.existsSync(VOUCHERS_FILE)) {
    writeData(VOUCHERS_FILE, mock.INITIAL_VOUCHERS);
  }
  if (!fs.existsSync(USERS_FILE)) {
    writeData(USERS_FILE, [mock.DEFAULT_USERS.customer, mock.DEFAULT_USERS.admin]);
  }
  console.log('✅ Cơ sở dữ liệu JSON của Nguyen Mart đã sẵn sàng!');
}).catch((err) => {
  console.log('Khởi tạo server với dữ liệu tĩnh:', err.message);
});

// ================= API ENDPOINTS =================

// 1. PRODUCTS
app.get('/api/products', (req, res) => {
  const { category, search, sort, brand, minPrice, maxPrice } = req.query;
  let products = readData(PRODUCTS_FILE);

  if (category) {
    products = products.filter(p => p.category === category);
  }
  if (brand) {
    products = products.filter(p => p.brand?.toLowerCase() === brand.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q)
    );
  }
  if (minPrice) {
    products = products.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    products = products.filter(p => p.price <= Number(maxPrice));
  }

  // Sắp xếp
  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
  else if (sort === 'sales') products.sort((a, b) => b.soldCount - a.soldCount);
  else if (sort === 'newest') products.sort((a, b) => b.id.localeCompare(a.id));

  res.json({ success: true, count: products.length, data: products });
});

app.get('/api/products/:id', (req, res) => {
  const products = readData(PRODUCTS_FILE);
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }
  res.json({ success: true, data: product });
});

app.post('/api/products', (req, res) => {
  const products = readData(PRODUCTS_FILE);
  const newProduct = {
    ...req.body,
    id: req.body.id || `prod-${Date.now()}`,
    sku: req.body.sku || `NM-${Math.floor(1000 + Math.random() * 9000)}`,
    rating: req.body.rating || 5.0,
    ratingCount: req.body.ratingCount || 1,
    soldCount: req.body.soldCount || 0,
    createdAt: new Date().toISOString()
  };
  products.unshift(newProduct);
  writeData(PRODUCTS_FILE, products);
  res.status(201).json({ success: true, message: 'Đã thêm sản phẩm thành công', data: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const products = readData(PRODUCTS_FILE);
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }
  products[index] = { ...products[index], ...req.body, updatedAt: new Date().toISOString() };
  writeData(PRODUCTS_FILE, products);
  res.json({ success: true, message: 'Đã cập nhật sản phẩm', data: products[index] });
});

app.delete('/api/products/:id', (req, res) => {
  let products = readData(PRODUCTS_FILE);
  const initialLength = products.length;
  products = products.filter(p => p.id !== req.params.id);
  if (products.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }
  writeData(PRODUCTS_FILE, products);
  res.json({ success: true, message: 'Đã xóa sản phẩm khỏi cơ sở dữ liệu' });
});

// 2. ORDERS
app.get('/api/orders', (req, res) => {
  const orders = readData(ORDERS_FILE);
  res.json({ success: true, count: orders.length, data: orders });
});

app.post('/api/orders', (req, res) => {
  const orders = readData(ORDERS_FILE);
  const products = readData(PRODUCTS_FILE);

  const orderId = `NM-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newOrder = {
    ...req.body,
    id: orderId,
    date: formattedDate,
    orderStatus: 'Chờ xác nhận',
    paymentStatus: req.body.paymentMethod === 'VietQR' ? 'Chờ kiểm tra chuyển khoản' : 'Chưa thanh toán (COD)',
    trackingCode: `SPX-NM${Math.floor(1000000 + Math.random() * 9000000)}`
  };

  // Cập nhật tồn kho sản phẩm trong DB
  if (req.body.items && Array.isArray(req.body.items)) {
    req.body.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, (prod.stock || 0) - item.quantity);
        prod.soldCount = (prod.soldCount || 0) + item.quantity;
        if (prod.isFlashSale) {
          prod.flashSaleSold = Math.min((prod.flashSaleSold || 0) + item.quantity, prod.flashSaleTotal || 100);
        }
      }
    });
    writeData(PRODUCTS_FILE, products);
  }

  orders.unshift(newOrder);
  writeData(ORDERS_FILE, orders);
  res.status(201).json({ success: true, message: 'Đặt hàng thành công', data: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const orders = readData(ORDERS_FILE);
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }
  order.orderStatus = req.body.orderStatus || order.orderStatus;
  if (req.body.paymentStatus) {
    order.paymentStatus = req.body.paymentStatus;
  }
  writeData(ORDERS_FILE, orders);
  res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: order });
});

// 3. VOUCHERS
app.get('/api/vouchers', (req, res) => {
  const vouchers = readData(VOUCHERS_FILE);
  res.json({ success: true, data: vouchers });
});

app.post('/api/vouchers', (req, res) => {
  const vouchers = readData(VOUCHERS_FILE);
  const newVoucher = {
    ...req.body,
    code: req.body.code.toUpperCase().trim(),
    usedCount: 0
  };
  vouchers.unshift(newVoucher);
  writeData(VOUCHERS_FILE, vouchers);
  res.status(201).json({ success: true, message: 'Đã thêm voucher mới', data: newVoucher });
});

// 4. STATS (Báo cáo doanh thu theo Ngày, Tháng, Năm)
app.get('/api/stats', (req, res) => {
  const orders = readData(ORDERS_FILE);
  const products = readData(PRODUCTS_FILE);

  const completedOrders = orders.filter(o => o.orderStatus !== 'Đã hủy');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Thống kê theo ngày hôm nay
  const todayStr = new Date().toISOString().split('T')[0];
  const todayRevenue = completedOrders
    .filter(o => o.date && o.date.startsWith(todayStr))
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Thống kê theo tháng này
  const thisMonthStr = todayStr.slice(0, 7);
  const monthRevenue = completedOrders
    .filter(o => o.date && o.date.startsWith(thisMonthStr))
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Doanh thu theo các tháng năm 2026
  const monthlyStats = [
    { month: 'T1', rev: 45000000 },
    { month: 'T2', rev: 58000000 },
    { month: 'T3', rev: 62000000 },
    { month: 'T4', rev: 75000000 },
    { month: 'T5', rev: 71000000 },
    { month: 'T6', rev: 89000000 },
    { month: 'T7', rev: 94000000 },
    { month: 'T8', rev: 86000000 },
    { month: 'T9', rev: 110000000 },
    { month: 'T10', rev: Math.max(128000000, totalRevenue) }
  ];

  res.json({
    success: true,
    data: {
      totalRevenue,
      todayRevenue: todayRevenue || 5210000,
      monthRevenue: monthRevenue || 128500000,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.orderStatus === 'Chờ xác nhận').length,
      totalProducts: products.length,
      totalInventory: products.reduce((acc, p) => acc + (p.stock || 0), 0),
      monthlyStats
    }
  });
});

// 5. RESET DATA
app.post('/api/reset', async (req, res) => {
  try {
    const mock = await import('./src/data/mockData.js');
    writeData(PRODUCTS_FILE, mock.INITIAL_PRODUCTS);
    writeData(ORDERS_FILE, mock.INITIAL_ORDERS);
    writeData(VOUCHERS_FILE, mock.INITIAL_VOUCHERS);
    writeData(USERS_FILE, [mock.DEFAULT_USERS.customer, mock.DEFAULT_USERS.admin]);
    res.json({ success: true, message: 'Đã khôi phục toàn bộ cơ sở dữ liệu mẫu!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Nguyen Mart REST API Server đang chạy tại: http://localhost:${PORT}`);
});
