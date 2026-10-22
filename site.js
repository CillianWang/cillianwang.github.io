const $ = (selector) => document.querySelector(selector);
const themeButton = $('.theme-toggle');
const dialog = $('.media-dialog');
const player = $('#player');
let returnFocus;

function updateThemeLabel() {
  const label = document.documentElement.dataset.theme === 'dark' ? '切换到浅色主题' : '切换到深色主题';
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  $('meta[name="theme-color"]').content = document.documentElement.dataset.theme === 'dark' ? '#191919' : '#faf9f6';
}
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
  updateThemeLabel();
});
updateThemeLabel();

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function externalUrl(value) {
  const url = new URL(value, location.href);
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Unsupported link');
  return url.href;
}
function mediaUrl(value) {
  const url = new URL(value, location.href);
  if (url.origin !== location.origin || !url.pathname.startsWith('/media/')) throw new Error('Media must be in media/');
  return url.href;
}
function openMedia(media, button) {
  returnFocus = button;
  $('#player-title').textContent = media.title;
  $('#player-caption').textContent = media.detail || media.caption;
  $('#player-error').hidden = true;
  $('#download-video').href = mediaUrl(media.video);
  player.poster = mediaUrl(media.poster);
  player.src = mediaUrl(media.video);
  player.setAttribute('aria-label', media.title);
  dialog.showModal();
  player.play().catch(() => { /* Native controls remain available if another gesture is needed. */ });
}
$('.close-player').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  player.pause();
  player.removeAttribute('src');
  player.load();
  returnFocus?.focus({ preventScroll: true });
});
player.addEventListener('error', () => { if (player.getAttribute('src')) $('#player-error').hidden = false; });

function renderProject(project) {
  const article = element('article', 'project reveal');
  article.id = project.id;
  const heading = element('div', 'project-heading');
  heading.append(element('h3', '', project.title), element('span', 'project-category', project.category));
  article.append(heading, element('p', 'project-description', project.description), element('p', 'project-stack', project.stack.join(' · ')));
  const gallery = element('div', 'gallery');
  for (const media of project.media) {
    const figure = element('figure');
    const button = element('button', 'media-open' + (media.fit === 'contain' ? ' contain' : ''));
    button.type = 'button';
    button.setAttribute('aria-label', `播放：${media.title}`);
    const img = element('img');
    img.src = mediaUrl(media.poster); img.alt = media.title;
    img.width = 960; img.height = 600; img.loading = 'lazy'; img.decoding = 'async';
    const play = element('span', 'play-mark');
    play.setAttribute('aria-hidden', 'true');
    play.innerHTML = '<svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor"><path d="M2 1.4v9.2L10 6Z"/></svg>';
    const duration = element('span', 'duration', media.duration); duration.setAttribute('aria-hidden', 'true');
    button.append(img, play, duration);
    button.addEventListener('click', () => openMedia(media, button));
    const caption = element('figcaption');
    caption.append(element('span', 'media-title', media.title), element('span', 'media-caption', media.caption));
    figure.append(button, caption); gallery.append(figure);
  }
  article.append(gallery);
  if (project.note) article.append(element('p', 'project-note', project.note));
  return article;
}
function revealSections() {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.remove('pending'); observer.unobserve(entry.target);
    }
  }, { threshold: 0.05 });
  for (const section of document.querySelectorAll('.reveal')) {
    if (section.getBoundingClientRect().top > window.innerHeight) section.classList.add('pending');
    observer.observe(section);
  }
}
async function loadContent() {
  try {
    const response = await fetch('content.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Content unavailable');
    const content = await response.json();
    const projects = content.projects.map(renderProject);
    $('#name').textContent = content.name;
    $('#footer-name').textContent = content.name;
    document.title = content.name;
    $('#tagline').textContent = content.tagline;
    $('#bio').textContent = content.bio;
    $('#work-period').textContent = content.period;
    $('#now-text').textContent = content.now;
    $('#year').textContent = new Date().getFullYear();
    $('#interests').replaceChildren(...content.interests.map(item => element('li', '', item)));
    $('#project-links').replaceChildren(...content.projects.map(project => {
      const a = element('a', '', project.title + ' '); a.href = '#' + project.id;
      const arrow = element('span', '', '↘'); arrow.setAttribute('aria-hidden', 'true'); a.append(arrow);
      return a;
    }));
    $('#social-links').replaceChildren(...content.links.map(link => {
      const a = element('a', '', link.label + ' ');
      a.href = externalUrl(link.url); a.target = '_blank'; a.rel = 'noopener noreferrer';
      const arrow = element('span', '', '↗'); arrow.setAttribute('aria-hidden', 'true'); a.append(arrow);
      return a;
    }));
    $('#projects').replaceChildren(...projects);
    revealSections();
  } catch (error) {
    $('#projects').replaceChildren(element('p', 'loading', '项目暂时无法载入，请刷新页面重试。'));
    console.error('Could not load homepage content:', error);
  }
}
loadContent();
