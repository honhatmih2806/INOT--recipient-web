import { db } from "./firebase.js";
import {
  ref, push, get, remove, onValue
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


// =========================
// 1. LƯU TIN NHẮN TỐI ĐA 20
// =========================
export async function saveASLMessage(text) {
  const messagesRef = ref(db, "asl_messages");

  const newObj = {
    text: text,
    timestamp: new Date().toISOString(),
  };

  // lấy dữ liệu hiện tại
  const snap = await get(messagesRef);
  const data = snap.val() || {};

  // sort theo thời gian
  const sorted = Object.entries(data)
    .sort((a, b) => new Date(a[1].timestamp) - new Date(b[1].timestamp));

  // nếu >= 20 thì xóa cái cũ nhất
  if (sorted.length >= 20) {
    const oldestKey = sorted[0][0];
    await remove(ref(db, "asl_messages/" + oldestKey));
  }

  // thêm tin mới
  await push(messagesRef, newObj);
}


// =========================
// 2. API lấy toàn bộ tin nhắn
// =========================
export async function getASLMessages() {
  const snap = await get(ref(db, "asl_messages"));
  return snap.val() || {};
}


// ===============================
// 3. API lắng nghe realtime msg
// ===============================
export function listenMessages(callback) {
  const messagesRef = ref(db, "asl_messages");
  onValue(messagesRef, (snap) => {
    callback(snap.val() || {});
  });
}


// ===================================
// 4. API xem trạng thái kết nối
// ===================================
export function listenConnectionStatus(callback) {
  const connectedRef = ref(db, ".info/connected");
  onValue(connectedRef, (snap) => {
    const isConnected = snap.val() ? "connected" : "disconnected";
    callback(isConnected);
  });
}


// =========================
// 5. XÓA TIN CŨ NHẤT
// =========================
export async function deleteOldestMessage() {
  const messagesRef = ref(db, "asl_messages");

  const snap = await get(messagesRef);
  const data = snap.val();
  if (!data) return;

  const sorted = Object.entries(data)
    .sort((a, b) => new Date(a[1].timestamp) - new Date(b[1].timestamp));

  const oldestKey = sorted[0][0];

  await remove(ref(db, "asl_messages/" + oldestKey));
}


// =========================
// 6. XÓA TIN THEO ID
// =========================
export async function deleteMessageById(id) {
  await remove(ref(db, "asl_messages/" + id));
}