// Restore before paint. Storage is optional (for example in private browsing).
(() => {
  const themes = ['pearl', 'rose', 'sage', 'sky', 'midnight', 'black'];
  const key = 'mv-portfolio-theme';
  let selected = 'pearl';
  try {
    const previous = localStorage.getItem(key);
    const saved = previous === 'violet' ? 'black' : previous;
    if (previous === 'violet') localStorage.setItem(key, 'black');
    if (themes.includes(saved)) selected = saved;
  } catch {}
  document.documentElement.dataset.theme = selected;
  document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.theme-menu');
    const trigger = menu?.querySelector('summary');
    const name = menu?.querySelector('.theme-current-name');
    if (name) name.textContent = selected[0].toUpperCase() + selected.slice(1);
    document.addEventListener('click', (event) => {
      if (menu && !menu.contains(event.target)) menu.open = false;
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu?.open) {
        menu.open = false;
        trigger.focus();
      }
    });
    const choices = document.querySelectorAll('.theme-picker input');
    for (const choice of choices) {
      choice.checked = choice.value === selected;
      choice.addEventListener('click', () => {
        if (menu) { menu.open = false; trigger.focus(); }
      });
      choice.addEventListener('change', () => {
        if (!choice.checked || !themes.includes(choice.value)) return;
        document.documentElement.dataset.theme = choice.value;
        if (name) name.textContent = choice.value[0].toUpperCase() + choice.value.slice(1);
        if (menu) { menu.open = false; trigger.focus(); }
        try { localStorage.setItem(key, choice.value); } catch {}
      });
    }
  });
})();
