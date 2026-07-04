/* ============================================================
   A School — main.js
   Бургер-меню · модалка заявки · FAQ-аккордеон · форма (WhatsApp + FormSubmit) · Яндекс.Метрика
   ============================================================ */

/* ---- Константы (заполнить реальными данными) ---- */
const WHATSAPP_PHONE = '77004349775';
// TODO: заменить на реальный email для дублирования заявок
const LEAD_EMAIL = 'info@aschool.kz';
// TODO: вставить номер счётчика Яндекс.Метрики (число), пока метрика отключена
const YM_COUNTER_ID = null;

/* ---- Локализация текстов WhatsApp-заявки (определяется по lang="kk" на <html>) ---- */
const IS_KK = document.documentElement.lang === 'kk';
const FORM_I18N = {
  waHeader:     IS_KK ? 'Тегін сынақ күніне өтінім — A School' : 'Заявка на бесплатный пробный день — A School',
  waName:       IS_KK ? 'Аты-жөні: '             : 'Имя: ',
  waChild:      IS_KK ? 'Баланың аты, жасы: '    : 'Ребёнок (имя, возраст): ',
  waGroup:      IS_KK ? 'Топ: '                  : 'Группа: ',
  waPhone:      'Телефон: ',
  emailSubject: IS_KK ? 'Өтінім — A School сайтынан' : 'Заявка с сайта A School',
  emailName:    IS_KK ? 'Аты-жөні'           : 'Имя',
  emailChild:   IS_KK ? 'Баланың аты, жасы'  : 'Ребёнок и возраст',
  emailGroup:   IS_KK ? 'Топ'                : 'Группа',
  emailPhone:   'Телефон',
};

/* ============================================================
   Яндекс.Метрика — инициализация только если задан ID
   ============================================================ */
(function initMetrika() {
  if (!YM_COUNTER_ID) return;
  /* eslint-disable */
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) return; }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0];
    k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  ym(YM_COUNTER_ID, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  /* eslint-enable */
}());

/* Безопасный вызов цели: работает, даже если метрика не инициализирована */
function reachGoal(goal, params) {
  if (YM_COUNTER_ID && typeof window.ym === 'function') {
    window.ym(YM_COUNTER_ID, 'reachGoal', goal, params || {});
  }
}

/* ============================================================
   Бургер-меню
   ============================================================ */
(function burgerMenu() {
  const overlay = document.getElementById('menuOverlay');
  const menu = document.getElementById('mobileMenu');
  if (!overlay || !menu) return;

  const burgerBtns = document.querySelectorAll('[data-menu-open]');
  const closeBtns = document.querySelectorAll('[data-menu-close]');

  function open() {
    overlay.classList.add('open');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  burgerBtns.forEach((b) => b.addEventListener('click', open));
  closeBtns.forEach((b) => b.addEventListener('click', close));
  overlay.addEventListener('click', close);
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}());

/* ============================================================
   FAQ-аккордеон
   ============================================================ */
(function faqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach((i) => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}());

/* ============================================================
   Модалка заявки + форма (WhatsApp + FormSubmit)
   ============================================================ */
(function leadModal() {
  const backdrop = document.getElementById('leadModal');
  if (!backdrop) return;

  const formWrap = backdrop.querySelector('[data-modal-form]');
  const sentWrap = backdrop.querySelector('[data-modal-sent]');
  const form = backdrop.querySelector('form');
  const groupSelect = form ? form.querySelector('[name="group"]') : null;

  function open(preset) {
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (formWrap) formWrap.classList.remove('is-hidden');
    if (sentWrap) sentWrap.classList.add('is-hidden');
    if (preset && groupSelect) {
      Array.from(groupSelect.options).forEach((o) => {
        if (o.value === preset || o.textContent.trim() === preset) groupSelect.value = o.value;
      });
    }
    reachGoal('trial_modal_open');
  }
  function close() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal-open]').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      open(b.getAttribute('data-preset'));
    });
  });
  backdrop.querySelectorAll('[data-modal-close]').forEach((b) => b.addEventListener('click', close));
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const child = (data.get('child') || '').toString().trim();
    const group = (data.get('group') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();

    if (!name || !phone) {
      form.reportValidity && form.reportValidity();
      return;
    }

    // 1) Сформировать текст заявки для WhatsApp
    const lines = [
      FORM_I18N.waHeader,
      FORM_I18N.waName + name,
      child ? (FORM_I18N.waChild + child) : '',
      group ? (FORM_I18N.waGroup + group) : '',
      FORM_I18N.waPhone + phone
    ].filter(Boolean);
    const waText = encodeURIComponent(lines.join('\n'));
    const waUrl = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + waText;

    // 2) Продублировать заявку на почту через FormSubmit (AJAX)
    reachGoal('form_submit', { group: group });
    const emailBody = { _subject: FORM_I18N.emailSubject };
    emailBody[FORM_I18N.emailName] = name;
    emailBody[FORM_I18N.emailChild] = child;
    emailBody[FORM_I18N.emailGroup] = group;
    emailBody[FORM_I18N.emailPhone] = phone;
    fetch('https://formsubmit.co/ajax/' + LEAD_EMAIL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(emailBody)
    }).catch(() => { /* игнорируем сетевую ошибку — заявка всё равно уходит в WhatsApp */ });

    // Открыть WhatsApp в новой вкладке
    reachGoal('whatsapp_click');
    window.open(waUrl, '_blank');

    // Показать экран «Заявка отправлена»
    if (formWrap) formWrap.classList.add('is-hidden');
    if (sentWrap) sentWrap.classList.remove('is-hidden');
    form.reset();
  });
}());

/* ============================================================
   Цели метрики на клики по соцсетям / телефону / whatsapp
   ============================================================ */
(function trackClicks() {
  document.querySelectorAll('a[href^="tel:"]').forEach((a) =>
    a.addEventListener('click', () => reachGoal('phone_click')));

  document.querySelectorAll('a[data-social]').forEach((a) =>
    a.addEventListener('click', () => reachGoal('social_click', { network: a.getAttribute('data-social') })));

  document.querySelectorAll('a[href*="wa.me"]').forEach((a) =>
    a.addEventListener('click', () => reachGoal('whatsapp_click')));
}());
