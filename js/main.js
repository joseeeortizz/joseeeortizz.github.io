(() => {
  const button = document.querySelector('.menu-button');
  const navigation = document.querySelector('#site-navigation');
  const menuLinks = document.querySelectorAll('#site-navigation a');

  if (button && navigation) {
    button.addEventListener('click', () => {
      const open = navigation.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
      button.innerHTML = open ? 'Menu <span aria-hidden="true">−</span>' : 'Menu <span aria-hidden="true">+</span>';
    });
    menuLinks.forEach((link) => link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = 'Menu <span aria-hidden="true">+</span>';
    }));
  }

  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    const address = ['joseortizv.nyc', 'gmail.com'].join('@');
    emailLink.href = `mailto:${address}`;
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
