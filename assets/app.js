'use strict';
(() => {
  document.body.classList.add('js-ready');
  const panels = [...document.querySelectorAll('[data-panel]')];
  const nav = [...document.querySelectorAll('[data-nav]')];
  const knownPanels = new Set(panels.map(p => p.dataset.panel));
  function route() {
    if (!panels.length) return;
    const requested = location.hash.slice(1);
    const target = knownPanels.has(requested) ? requested : 'artikel';
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== target; });
    nav.forEach(link => {
      if (link.dataset.nav === target) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const titles = { artikel: 'Catatan IT, Jaringan & Automasi', tentang: 'Tentang', proyek: 'Proyek GitHub', kontak: 'Kontak' };
    document.title = titles[target] + ' | Edelweis - Muhamad Fahrul';
  }
  route();
  window.addEventListener('hashchange', route);
  const cards = [...document.querySelectorAll('.post-card')];
  const search = document.getElementById('search');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  let category = 'Semua';
  function filter() {
    const query = (search?.value || '').trim().toLocaleLowerCase('id');
    let visible = 0;
    cards.forEach(card => {
      const text = ((card.dataset.search || '') + ' ' + card.dataset.category).toLocaleLowerCase('id');
      const match = (category === 'Semua' || card.dataset.category === category) && text.includes(query);
      card.hidden = !match;
      if (match) visible++;
    });
    const empty = document.getElementById('empty-state');
    if (empty) empty.hidden = visible > 0;
    const status = document.getElementById('search-status');
    if (status) status.textContent = visible + ' artikel ditampilkan';
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    filter();
  }));
  search?.addEventListener('input', filter);
  document.getElementById('reset-search')?.addEventListener('click', () => {
    category = 'Semua';
    if (search) search.value = '';
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === 'Semua')));
    filter();
    search?.focus();
  });
  async function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* fallback below */ }
    }
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
    area.remove();
    return ok;
  }
  document.querySelectorAll('.share-button').forEach(button => button.addEventListener('click', async () => {
    const ok = await copy(location.href);
    const status = document.getElementById('share-status');
    button.textContent = ok ? 'Tautan tersalin' : 'Salin dari address bar';
    if (status) status.textContent = ok ? 'Tautan artikel berhasil disalin.' : 'Clipboard tidak tersedia. Salin tautan dari address bar browser.';
    setTimeout(() => { button.textContent = 'Salin tautan'; }, 2600);
  }));
  document.querySelectorAll('.prose pre').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = 'Salin';
    button.setAttribute('aria-label', 'Salin blok kode');
    button.addEventListener('click', async () => {
      button.textContent = await copy(code.textContent) ? 'Tersalin' : 'Pilih teks manual';
      setTimeout(() => { button.textContent = 'Salin'; }, 2400);
    });
    pre.appendChild(button);
  });
  const progress = document.getElementById('reading-progress');
  const top = document.querySelector('.back-top');
  let queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.width = Math.max(0, Math.min(100, max > 0 ? scrollY / max * 100 : 0)) + '%';
      if (top) top.hidden = scrollY < 600;
      queued = false;
    });
  }
  if (progress || top) { addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll(); }
  top?.addEventListener('click', () => scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
  const home = document.getElementById('home-link');
  if (home && location.hostname.endsWith('.github.io')) {
    home.href = '/proxmox-disaster-recovery-lab/';
  }
})();
