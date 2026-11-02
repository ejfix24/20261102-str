// 모바일 메뉴 열기/닫기
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '×' : '☰';
  });

  // 메뉴 항목을 누르면 모바일 메뉴 닫기
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

// 예약 팝업 열기/닫기
const modal = document.getElementById('bookingModal');
const openButtons = document.querySelectorAll('.booking-open');
const closeButton = document.querySelector('.modal-close');
const backdrop = document.querySelector('.modal-backdrop');

function openModal() {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

openButtons.forEach(button => button.addEventListener('click', openModal));
if (closeButton) closeButton.addEventListener('click', closeModal);
if (backdrop) backdrop.addEventListener('click', closeModal);

// ESC 키로 팝업 닫기
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

// 실습용 예약 폼: 서버 전송 대신 신청 내용을 안내
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const name = formData.get('name');
    const date = formData.get('date');
    const people = formData.get('people');
    alert(`${name}님, 예약 신청이 접수된 것으로 안내합니다.\n날짜: ${date}\n인원: ${people}\n\n※ 실습용 예시이므로 실제 예약은 저장되지 않습니다.`);
    bookingForm.reset();
    closeModal();
  });
}

// 날짜 선택은 오늘 이전을 선택할 수 없도록 제한
const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString().split('T')[0];
  dateInput.min = localDate;
}
