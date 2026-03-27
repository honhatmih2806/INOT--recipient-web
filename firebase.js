// Import các hàm Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCvyh8yS_MifKn8DwDKI2t0Ymbiq1Hj4hM",
  authDomain: "asl-inot.firebaseapp.com",
  databaseURL: "https://asl-inot-default-rtdb.firebaseio.com",
  projectId: "asl-inot",
  storageBucket: "asl-inot.firebasestorage.app",
  messagingSenderId: "62034679084",
  appId: "1:62034679084:web:2fb8a5601b8d7debbf4889",
  measurementId: "G-PCBRPZ79ND"
};

// Khởi tạo
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Khởi tạo database
const db = getDatabase(app);

// Xuất db để file khác dùng
export { db };