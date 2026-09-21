/* ==========================================================================
   BENANG DIGITAL — main.js
   No build step, no dependencies — plain JS so this stays a simple static
   site you can push straight to GitHub Pages.
   ========================================================================== */

/* --------------------------------------------------------------------------
   EDIT ME — Modul belajar
   Ganti "id" dengan ID video YouTube-nya (bagian setelah "v=" di URL video,
   atau setelah "youtu.be/"). Satu modul = satu baris, jadi gampang ditukar.
   Urutan di sini menentukan urutan tampil di halaman.
   -------------------------------------------------------------------------- */
const MODULES = [
  { id: 'dQw4w9WgXcQ', title: 'Kenalan dengan TikTok Affiliate',      desc: 'Dasar-dasar program affiliate dan cara kerja komisi di Benang Digital.' },
  { id: 'dQw4w9WgXcQ', title: 'Riset Produk & Niche',                 desc: 'Cara memilih produk yang cocok dengan audiens dan gaya kontenmu.' },
  { id: 'dQw4w9WgXcQ', title: 'Teknik Hook 3 Detik Pertama',          desc: 'Bikin penonton berhenti scroll di detik-detik pertama video.' },
  { id: 'dQw4w9WgXcQ', title: 'Live Selling untuk Pemula',            desc: 'Persiapan, skrip, dan ritme live selling yang nggak canggung.' },
  { id: 'dQw4w9WgXcQ', title: 'Optimasi GMV & Komisi',                desc: 'Baca dashboard performa dan tahu bagian mana yang perlu dibenahi.' },
  { id: 'dQw4w9WgXcQ', title: 'Membangun Personal Branding',          desc: 'Supaya penonton ingat kamu, bukan cuma produk yang kamu bawakan.' },
];

/* --------------------------------------------------------------------------
   EDIT ME — Pertanyaan umum (FAQ)
   -------------------------------------------------------------------------- */
const FAQS = [
  { q: 'Kapan aku mulai dapat campaign dari brand?', a: 'Setelah profil dan data kamu lengkap, PIC akan mulai menawarkan campaign yang sesuai dengan niche kontenmu. Biasanya di minggu pertama sampai kedua sejak bergabung.' },
  { q: 'Bagaimana sistem komisi dan pembayarannya?', a: 'Komisi dihitung dari GMV yang tervalidasi TikTok Shop, lalu dibayarkan sesuai jadwal yang disepakati di awal. Rincian lengkap dan histori pembayaran bisa kamu cek lewat PIC kamu.' },
  { q: 'Apakah wajib menyelesaikan semua modul belajar?', a: 'Tidak wajib, tapi sangat disarankan — terutama kalau kamu baru mulai. Modul-modul ini dirangkum dari pertanyaan yang paling sering ditanyakan kreator baru.' },
  { q: 'Ke mana aku menghubungi kalau ada masalah teknis atau brand?', a: 'Langsung chat PIC kamu di WhatsApp. Untuk hal di luar jam operasional, kirim email dan tim akan membalas di hari kerja berikutnya.' },
  { q: 'Boleh gabung dengan agensi atau brand lain di luar Benang Digital?', a: 'Diskusikan dulu dengan PIC kamu — beberapa campaign punya kesepakatan eksklusif dengan brand tertentu, jadi kami perlu memastikan tidak ada yang bertabrakan.' },
];

document.addEventListener('DOMContentLoaded', () => {
  renderModules();
  renderFaqs();
  setupMobileNav();
  setupScrollSpy();
  setupThreadProgress();
  setupHeroKnotDraw();
  setupSmoothScrollButtons();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------------
   Modul belajar — render + accordion + lazy-load video on tap
   -------------------------------------------------------------------------- */
function renderModules(){
  const list = document.getElementById('modulePath');
  if (!list) return;

  MODULES.forEach((mod, i) => {
    const li = document.createElement('li');
    li.className = 'module-card';

    li.innerHTML = `
      <button class="module-head" aria-expanded="false">
        <span class="module-num">${i + 1}</span>
        <span class="module-text">
          <span class="module-title">${escapeHtml(mod.title)}</span>
          <span class="module-desc">${escapeHtml(mod.desc)}</span>
        </span>
        <span class="module-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M6 4L20 12L6 20V4Z" fill="#2D2A26"/></svg>
        </span>
      </button>
      <div class="module-body"><div>
        <div class="video-frame" data-video-frame data-video-id="${mod.id}">
          <div class="video-spinner" aria-hidden="true"></div>
        </div>
      </div></div>
    `;

    const head = li.querySelector('.module-head');
    head.addEventListener('click', () => {
      const isOpen = li.classList.contains('is-open');

      // close any other open module except the current module [li]
      list.querySelectorAll('.module-card.is-open').forEach(open => {
        if (open !== li){
          open.classList.remove('is-open');
          open.querySelector('.module-head').setAttribute('aria-expanded', 'false');
        }
      });

      // !isOpen --> meaning we want the opposite of the state of the module
      // for example: if we want the module to be [closed] when the module is [opened] when clicked

      // in current module, 
      // if the module is closed > open when clicked
      // if the module is opened > close when clicked
      li.classList.toggle('is-open', !isOpen);
      head.setAttribute('aria-expanded', String(!isOpen));

      
      // Load the video if closed 
      // Dont load the video if its already open
      if (!isOpen) loadVideo(li.querySelector('[data-video-frame]'));
    });

    // Append the module created (by looping MODULE)
    list.appendChild(li);
  });
}

function loadVideo(frame){
  if (!frame || frame.dataset.loaded) return;
  const videoId = frame.dataset.videoId;
  // small delay so the spinner is perceptible as a deliberate loading beat
  window.setTimeout(() => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
    iframe.title = 'Video modul belajar';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    frame.innerHTML = '';
    frame.appendChild(iframe);
    frame.dataset.loaded = 'true';
  }, 260);
}

/* --------------------------------------------------------------------------
   FAQ — render + accordion
   -------------------------------------------------------------------------- */
function renderFaqs(){
  const list = document.getElementById('faqList');
  if (!list) return;

  FAQS.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    const qid = `faq-a-${i}`;
    el.innerHTML = `
      <button class="faq-q" aria-expanded="false" aria-controls="${qid}">
        <span>${escapeHtml(item.q)}</span>
        <span class="faq-plus" aria-hidden="true"></span>
      </button>
      <div class="faq-a" id="${qid}"><div><p>${escapeHtml(item.a)}</p></div></div>
    `;
    const btn = el.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = el.classList.contains('is-open');
      el.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
    list.appendChild(el);
  });
}

/* --------------------------------------------------------------------------
   Mobile nav — hamburger morphs into the brand's crossed-loop mark
   -------------------------------------------------------------------------- */
function setupMobileNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Buka menu navigasi' : 'Tutup menu navigasi');
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka menu navigasi');
    nav.classList.remove('is-open');
  }));
}

/* --------------------------------------------------------------------------
   Section markers — "tie" a knot as each section scrolls into view
   -------------------------------------------------------------------------- */
function setupScrollSpy(){
  const markers = document.querySelectorAll('[data-knot]');
  if (!markers.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-tied', entry.isIntersecting);
    });
  }, { rootMargin: '0px 0px -60% 0px', threshold: 0.01 });

  markers.forEach(m => observer.observe(m));
}

/* --------------------------------------------------------------------------
   Thread spine — fills in as the whole page is scrolled
   -------------------------------------------------------------------------- */
function setupThreadProgress(){
  const fill = document.getElementById('threadFillPath');
  if (!fill) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const length = fill.getTotalLength();
  fill.style.strokeDasharray = String(length);

  function update(){
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    fill.style.strokeDashoffset = String(length * (1 - progress));
  }

  if (reduceMotion){
    fill.style.strokeDashoffset = '0';
    return;
  }

  update();
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', update);
}

/* --------------------------------------------------------------------------
   Smooth-scroll for buttons that link to in-page anchors
   -------------------------------------------------------------------------- */
function setupSmoothScrollButtons(){
  document.querySelectorAll('[data-scrollto]').forEach(el => {
    el.addEventListener('click', (e) => {
      const targetSel = el.getAttribute('data-target') || el.getAttribute('href');
      if (!targetSel || !targetSel.startsWith('#')) return;
      const target = document.querySelector(targetSel);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function setupHeroKnotDraw(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const outlines = document.querySelectorAll('.logo-outline');
  if (!outlines.length) return;

  outlines.forEach((useEl, i) => {
    const sourceId = useEl.getAttribute('href') || useEl.getAttribute('xlink:href');
    const pathEl = sourceId && document.querySelector(sourceId);
    if (!pathEl || typeof pathEl.getTotalLength !== 'function') return;

    const length = pathEl.getTotalLength();
    useEl.style.strokeDasharray = String(length);
    useEl.style.strokeDashoffset = String(length);

    useEl.getBoundingClientRect();

    useEl.style.transition = `stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1) ${i * 0.12}s`;
    requestAnimationFrame(() => {
      useEl.style.strokeDashoffset = '0';
    });
  });

  window.setTimeout(() => {
    document.querySelectorAll('.logo-outline').forEach(el => { el.style.opacity = '0'; });
    document.querySelectorAll('.logo-fill').forEach(el => { el.style.opacity = '1'; });
  }, 1300);
}
