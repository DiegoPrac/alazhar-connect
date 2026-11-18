/* Prototype PAI kelompok 8. Tidak mengirim atau menyimpan data pengguna. */
(() => {
  const nav = document.querySelector('#nav-main');
  const menu = document.querySelector('.menu-toggle');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
  }));

  const chips = document.querySelectorAll('[data-filter]');
  chips.forEach(chip => chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    chips.forEach(c => {c.classList.toggle('active', c === chip);c.setAttribute('aria-pressed', String(c===chip));});
    document.querySelectorAll('.program-card').forEach(card => {card.hidden = filter !== 'semua' && card.dataset.category !== filter;});
  }));

  const dialog = document.querySelector('#register-dialog');
  const form = document.querySelector('#demo-form');
  const title = document.querySelector('#chosen-program');
  const toast = document.querySelector('#toast');
  let demoSubmissions = 0;
  let toastTimeout;

  document.querySelectorAll('[data-program]').forEach(button => button.addEventListener('click', () => {
    form.reset(); title.value = button.dataset.program; dialog.showModal();
    document.querySelector('#alias').focus();
  }));
  document.querySelector('.close-modal').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const alias = document.querySelector('#alias').value.trim();
    if(!alias){document.querySelector('#alias').focus();return;}
    const role = document.querySelector('#role').value;
    const program = title.value;
    demoSubmissions += 1;
    document.querySelector('#demo-submissions').textContent = String(demoSubmissions);
    dialog.close();
    toast.textContent = `Simulasi berhasil: ${role.toLowerCase()} untuk “${program}”. Tidak ada data yang dikirim/disimpan.`;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 6000);
  });
})();
