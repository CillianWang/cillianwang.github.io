const viewer = document.querySelector('#resume-viewer');
const output = document.querySelector('#resume-canvas');
const fallback = document.querySelector('.resume-fallback');
let pdfPage, rendering = false, lastWidth = 0, resizeTimer;
async function renderPage() {
  const width = Math.round(viewer.clientWidth);
  if (!pdfPage || rendering || !width || width === lastWidth) return;
  rendering = true;
  let completed = false;
  try {
    const base = pdfPage.getViewport({ scale: 1 });
    const scale = width * Math.min(window.devicePixelRatio || 1, 2) / base.width;
    const viewport = pdfPage.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', '王心平中文简历 PDF，第 1 页，共 1 页。上方链接可打开原文件。');
    await pdfPage.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    output.replaceChildren(canvas); output.hidden = false; fallback.hidden = true;
    lastWidth = width; completed = true;
  } catch (error) {
    console.warn('PDF preview unavailable; keeping the page image.', error);
  } finally {
    rendering = false;
    if (completed && Math.round(viewer.clientWidth) !== lastWidth) renderPage();
  }
}
async function loadPDF() {
  try {
    const pdfjs = await import('./vendor/pdfjs/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.mjs', import.meta.url).href;
    const pdf = await pdfjs.getDocument({url: viewer.dataset.pdf, useWasm: false}).promise;
    pdfPage = await pdf.getPage(1);
    await renderPage();
    new ResizeObserver(() => {
      clearTimeout(resizeTimer); resizeTimer = setTimeout(renderPage, 150);
    }).observe(viewer);
  } catch (error) {
    console.warn('PDF preview unavailable; keeping the page image.', error);
  }
}
if (location.protocol !== 'file:') {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); loadPDF(); }
  }, { rootMargin: '400px' });
  observer.observe(viewer);
}
