(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#site-nav');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Menu −' : 'Menu +';
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = 'Menu +';
  }));
})();
