/* ======================= จุดที่แก้ไขข้อมูลของคุณ ======================= */
const siteTitle = 'ມາເບິ່ງ Timeline ຂອງເຮົາກັນ ♡'; // บรรทัด 2: เปลี่ยนข้อความหัวเว็บตรงนี้
const relationshipStartedAt = '2025-01-01T00:00:00+07:00'; // บรรทัด 3: ใส่วัน/เวลาเริ่มคบ เช่น 2025-01-15T19:30:00+07:00

// บรรทัด 7 เป็นต้นไป: เพิ่ม/แก้ไขความทรงจำได้ตรงนี้
// image: ใส่ชื่อหรือพาธไฟล์รูป เช่น 'images/first-date.jpg'  (ปล่อยว่างไว้ได้)
const memories = [
  { date: '08/7/2025', title: 'ຂອງຂວັນອັນແລກ', image: 'photo/images (3).jpg', description: 'ຍັງຈື່ໄດ້ບໍ່ນີ້ເປັນຂອງຂວັນອັນແລກທີ່ເຮົາເຮັດນຳກັນ' },
  { date: 'ใส่วันที่ตรงนี้', title: 'ความทรงจำที่ 2', image: 'photo/new.png', description: 'ใส่คำอธิบายความทรงจำที่ 2 ตรงนี้' },
  { date: 'ใส่วันที่ตรงนี้', title: 'ความทรงจำที่ 3', image: '', description: 'ใส่คำอธิบายความทรงจำที่ 3 ตรงนี้' },
  { date: 'ใส่วันที่ตรงนี้', title: 'ความทรงจำที่ 4', image: '', description: 'ใส่คำอธิบายความทรงจำที่ 4 ตรงนี้' },
  { date: 'ใส่วันที่ตรงนี้', title: 'ความทรงจำที่ 5', image: '', description: 'ใส่คำอธิบายความทรงจำที่ 5 ตรงนี้' },
];
/* ====================================================================== */

const byId = (id) => document.getElementById(id);
byId('site-title').textContent = siteTitle;

function fullMonthsBetween(start, end) {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  if (end.getDate() < start.getDate()) months--;
  return Math.max(0, months);
}
function updateCounter() {
  const start = new Date(relationshipStartedAt);
  const now = new Date();
  if (Number.isNaN(start.getTime()) || now < start) return;
  const totalMonths = fullMonthsBetween(start, now);
  const anniversary = new Date(start);
  anniversary.setMonth(start.getMonth() + totalMonths);
  const remaining = Math.floor((now - anniversary) / 1000);
  byId('years').textContent = Math.floor(totalMonths / 12);
  byId('months').textContent = totalMonths % 12;
  byId('days').textContent = Math.floor(remaining / 86400);
  byId('hours').textContent = Math.floor(remaining % 86400 / 3600);
  byId('minutes').textContent = Math.floor(remaining % 3600 / 60);
  byId('seconds').textContent = remaining % 60;
}
updateCounter(); setInterval(updateCounter, 1000);

const timeline = byId('timeline'); const modal = byId('memory-modal');
function setPhoto(element, memory) {
  // คงคลาส modal-photo ไว้ เพื่อให้รูปใหญ่ในหน้าต่างป๊อปอัปมีขนาด 1:1
  const isModalPhoto = element.id === 'modal-photo';
  element.className = `${isModalPhoto ? 'modal-photo ' : ''}photo-placeholder${memory.image ? ' has-image' : ''}`;
  element.style.backgroundImage = memory.image ? `url("${memory.image}")` : '';
  element.setAttribute('aria-label', memory.image ? memory.title : 'พื้นที่สำหรับรูปภาพ');
}
function openMemory(memory) {
  setPhoto(byId('modal-photo'), memory); byId('modal-date').textContent = memory.date;
  byId('modal-title').textContent = memory.title; byId('modal-description').textContent = memory.description;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
}
memories.forEach((memory, index) => {
  const item = document.createElement('article'); item.className = `memory ${index % 2 ? 'left' : 'right'}`;
  item.innerHTML = `<button class="polaroid" aria-label="เปิด ${memory.title}"><span class="tape"></span><div class="photo-placeholder"></div><time class="memory-date"></time><span class="memory-title"></span></button>`;
  setPhoto(item.querySelector('.photo-placeholder'), memory); item.querySelector('.memory-date').textContent = memory.date; item.querySelector('.memory-title').textContent = memory.title;
  item.querySelector('button').addEventListener('click', () => openMemory(memory)); timeline.appendChild(item);
});
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
byId('close-modal').addEventListener('click', closeModal); modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

const hearts = document.querySelector('.falling-hearts');
function dropHeart() { const heart = document.createElement('span'); heart.className = 'heart'; heart.textContent = Math.random() > .25 ? '♥' : '♡'; heart.style.left = `${Math.random() * 100}%`; heart.style.setProperty('--drift', `${(Math.random() - .5) * 150}px`); heart.style.animationDuration = `${7 + Math.random() * 7}s`; hearts.appendChild(heart); setTimeout(() => heart.remove(), 14500); }
for (let i = 0; i < 18; i++) setTimeout(dropHeart, i * 380); setInterval(dropHeart, 720);
