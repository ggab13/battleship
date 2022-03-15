const home = function () {
  const content = document.querySelector('#content');

  const p = document.createElement('p');
  p.textContent = 'fasz';

  content.appendChild(p);
};

export default home;
