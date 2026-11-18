// Copying is an explicit visitor action; no address or clipboard data is sent.
for (const button of document.querySelectorAll('[data-copy-email]')) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const address = button.dataset.copyEmail;
    const status = document.getElementById('contact-status');
    try {
      await navigator.clipboard.writeText(address);
      status.textContent = `Copied: ${address}`;
    } catch {
      const link = button.parentElement.querySelector('a');
      const range = document.createRange();
      range.selectNodeContents(link);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Automatic copying is unavailable. The address is selected: press Ctrl+C (or Command+C on Mac).';
    }
  });
}
