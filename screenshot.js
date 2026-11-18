// Keep full-size captures on the project page, with native modal focus handling.
const captureLinks = document.querySelectorAll('.capture-link');
if (captureLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'screenshot-dialog';
  dialog.setAttribute('aria-label', 'Project screenshot');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'screenshot-close';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Close screenshot');
  close.autofocus = true;
  const image = document.createElement('img');
  image.alt = `${document.querySelector('h1').textContent} screenshot — demonstration with fictional data`;
  dialog.append(close, image);
  document.body.append(dialog);
  let opener;
  for (const link of captureLinks) {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      dialog.showModal();
      document.body.classList.add('screenshot-open');
      document.documentElement.classList.add('screenshot-open');
    });
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('screenshot-open');
    document.documentElement.classList.remove('screenshot-open');
    opener?.focus({preventScroll: true});
  });
}
