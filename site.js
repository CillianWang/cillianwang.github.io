const $ = selector => document.querySelector(selector);
const dialog = $('dialog');
const player = $('#player');
let opener;

function node(tag, className, text) {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (text !== undefined) item.textContent = text;
  return item;
}
function localMedia(path) {
  const url = new URL(path, location.href);
  const root = new URL('media/', location.href);
  if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) throw new Error('Media must be in media/');
  return url.href;
}
function openVideo(media, button) {
  opener = button;
  $('#player-title').textContent = media.title + ' / ' + media.caption;
  $('#player-caption').textContent = media.detail;
  $('#player-error').hidden = true;
  $('#video-file').href = localMedia(media.video);
  player.setAttribute('aria-label', media.title + '：' + media.caption);
  player.poster = localMedia(media.poster);
  player.src = localMedia(media.video);
  dialog.showModal();
  player.play().catch(() => { /* Playback remains available through native controls. */ });
}
$('.close-player').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const b = dialog.getBoundingClientRect();
  if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  player.pause(); player.removeAttribute('src'); player.load();
  opener?.focus({ preventScroll: true });
});
player.addEventListener('error', () => { if (player.getAttribute('src')) $('#player-error').hidden = false; });

function renderVideo(media) {
  const figure = node('figure', 'demo'); figure.id = media.id;
  const heading = node('div', 'demo-heading');
  heading.append(node('h3', '', media.title), node('span', 'runtime', media.duration));
  const button = node('button', 'poster'); button.type = 'button';
  button.setAttribute('aria-label', '播放 ' + media.title + '：' + media.caption);
  const img = node('img'); img.src = localMedia(media.poster); img.alt = media.caption;
  img.width = 960; img.height = 600; img.decoding = 'async';
  const play = node('span', 'play'); play.setAttribute('aria-hidden', 'true');
  play.innerHTML = '<svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor"><path d="M2 1.4v9.2L10 6Z"/></svg>';
  button.append(img, play);
  button.addEventListener('click', () => openVideo(media, button));
  const caption = node('figcaption');
  caption.append(node('p', 'caption', media.caption), node('p', 'note', media.note));
  figure.append(heading, button, caption);
  return figure;
}
function renderExperience(entry) {
  const article = node('article', 'entry');
  const time = node('p', 'entry-date', entry.date);
  const body = node('div', 'entry-body');
  body.append(node('h3', '', entry.company), node('p', 'entry-role', entry.role));
  const list = node('ul', 'entry-points');
  entry.lines.forEach(line => list.append(node('li', '', line)));
  body.append(list); article.append(time, body); return article;
}
function renderEducation(entry) {
  const article = node('article', 'entry');
  const body = node('div', 'entry-body');
  body.append(node('h3', '', entry.school), node('p', 'entry-role', entry.degree), node('p', 'entry-description', entry.text));
  article.append(node('p', 'entry-date', entry.date), body); return article;
}
async function loadContent() {
  try {
    let content = window.siteContent;
    if (location.protocol !== 'file:') {
      try {
        const response = await fetch('content.json', { cache: 'no-cache' });
        if (response.ok) content = await response.json();
      } catch { /* The bundled copy also supports opening the local HTML offline. */ }
    }
    const videos = content.videos.map(renderVideo);
    const github = new URL(content.github);
    if (github.protocol !== 'https:') throw new Error('Expected HTTPS link');
    $('#name').textContent = content.name; document.title = content.name;
    $('#intro').textContent = content.intro; $('#github').href = github.href;
    $('#role').textContent = content.role;
    $('#about').textContent = content.about;
    $('#email').href = 'mailto:' + content.email;
    $('#resume').href = '#resume-title';
    $('#work-title').textContent = content.sectionTitle || '闭环仿真';
    $('#demos').replaceChildren(...videos);
    $('#experience').replaceChildren(...content.experience.map(renderExperience));
    $('#education').replaceChildren(...content.education.map(renderEducation));
  } catch (error) {
    $('#demos').replaceChildren(node('p', 'loading', '演示暂时无法载入，请刷新重试。'));
    console.error('Could not load demos:', error);
  }
}
loadContent();
