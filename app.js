// The portfolio makes no network requests and only stores the selected color theme locally.
const projects = [...document.querySelectorAll('.project[data-category]')];
for (const button of document.querySelectorAll('[data-filter]')) {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    for (const filter of document.querySelectorAll('[data-filter]')) {
      filter.setAttribute('aria-pressed', String(filter === button));
    }
    let count = 0;
    for (const project of projects) {
      project.hidden = category !== 'all' && !project.dataset.category.split(' ').includes(category);
      if (!project.hidden) count++;
    }
    document.querySelector('#filter-status').textContent = `${count} project${count !== 1 ? 's' : ''} shown`;
  });
}

