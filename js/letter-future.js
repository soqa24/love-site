const STORAGE_KEY = 'futureLetters_v1';

const loadLetters = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const saveLetters = (letters) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));

// Минимальная дата — завтра
function setMinDate(input) {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
  input.min = tomorrow.toISOString().slice(0, 16);
}

function fmtDate(ts) {
  return new Date(ts).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function fmtCountdown(ms) {
  const d = Math.floor(ms / 864e5);
  const h = Math.floor(ms % 864e5 / 36e5);
  const m = Math.floor(ms % 36e5 / 6e4);
  const s = Math.floor(ms % 6e4 / 1e3);
  return `${d} дн. ${h} ч. ${m} мин. ${s} сек.`;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Создание списка писем и модалки, если их нет в HTML
function ensureMarkup(form) {
  // Пытаемся найти существующие элементы в DOM
  let list = document.getElementById('lettersList');
  let modal = document.getElementById('letterModal');

  // Если элементов нет в HTML (на всякий случай), создаем их
  if (!list) {
    list = document.createElement('div');
    list.id = 'lettersList';
    list.className = 'letter-future__list';
    form.after(list);
  }

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'letterModal';
    modal.className = 'letter-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="letter-modal__card">
        <button class="letter-modal__close" id="letterModalClose" type="button">✕</button>
        <p class="letter-modal__date" id="letterModalDate"></p>
        <p class="letter-modal__text" id="letterModalText"></p>
      </div>
    `;
    document.body.appendChild(modal);
  }

  return { list, modal };
}
 

// Таймер обратного отсчёта на карточке
function startTimer(el, openAt, onOpen) {
  const tick = () => {
    const diff = openAt - Date.now();
    if (diff <= 0) {
      clearInterval(el._tickId);
      onOpen();
      return;
    }
    el.textContent = 'До открытия: ' + fmtCountdown(diff);
  };
  tick();
  el._tickId = setInterval(tick, 1000);
}

// Шаблон карточки письма
function cardTemplate(letter, i) {
  const canOpen = Date.now() >= letter.openAt;

  return `
    <h3 class="letter-card__title-letter">
      ${canOpen ? '💌 Письмо открыто' : '✉️ Запечатано до ' + fmtDate(letter.openAt)}
    </h3>
    <p class="letter-card__preview">${escapeHtml(letter.text)}</p>

    
    ${canOpen ? '' : '<p class="letter-card__timer"></p>'}
    <button class="letter-card__open-btn" data-i="${i}" type="button">
      ${canOpen ? 'Прочитать' : 'Открыть раньше'}
    </button>

    
    <button class="letter-card__delete" data-i="${i}" type="button" title="Удалить письмо">✕</button>
  `;
}

// Отрисовка списка
function renderList(listEl) {
  const letters = loadLetters().sort((a, b) => a.openAt - b.openAt);
  listEl.innerHTML = '';

  letters.forEach((letter, i) => {
    const card = document.createElement('div');
    card.className = letter.openAt > Date.now()
      ? 'letter-card letter-card--locked'
      : 'letter-card';
    card.innerHTML = cardTemplate(letter, i);
    listEl.appendChild(card);

    if (letter.openAt > Date.now()) {
      const timerEl = card.querySelector('.letter-card__timer');
      startTimer(timerEl, letter.openAt, () => renderList(listEl));
    }
  });
}

// Инициализация блока
export function initLetterFuture() {
  const form      = document.getElementById('letterForm');
  const dateInput = document.getElementById('letterDate');
  const textInput = document.getElementById('letterText');

  if (!form || !dateInput || !textInput) return;

  const { list, modal } = ensureMarkup(form);
  const modalDate  = modal.querySelector('.letter-modal__date');
  const modalText  = modal.querySelector('.letter-modal__text');
  const modalClose = modal.querySelector('.letter-modal__close');

  setMinDate(dateInput);

  // Создание письма
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text   = textInput.value.trim();
    const openAt = new Date(dateInput.value).getTime();
    if (!text || isNaN(openAt)) return;

    const letters = loadLetters();
    letters.push({ text, openAt, createdAt: Date.now() });
    saveLetters(letters);
    form.reset();
    renderList(list);
  });

  // Открыть / удалить письмо
  list.addEventListener('click', (e) => {
    const letters = loadLetters();
    const i = e.target.dataset.i;
    if (i === undefined) return;

    if (e.target.classList.contains('letter-card__open-btn')) {
      const letter = letters[i];
      modalDate.textContent = 'Письмо, запечатанное до ' + fmtDate(letter.openAt);
      modalText.textContent = letter.text;
      modal.hidden = false;
    }

    if (e.target.classList.contains('letter-card__delete')) {
      letters.splice(i, 1);
      saveLetters(letters);
      renderList(list);
    }
  });

  // Закрытие модалки
  modalClose.addEventListener('click', () => (modal.hidden = true));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.hidden = true;
  });

  renderList(list);
}
