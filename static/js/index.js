window.HELP_IMPROVE_VIDEOJS = false;

function copyBibTeX() {
  const source = document.getElementById('bibtex-code');
  const button = document.querySelector('.copy-bibtex-btn');
  if (!source || !button) return;
  const text = source.textContent;
  const done = () => {
    button.classList.add('copied');
    const label = button.querySelector('.copy-text');
    if (label) label.textContent = 'Copied';
    window.setTimeout(() => {
      button.classList.remove('copied');
      if (label) label.textContent = 'Copy BibTeX';
    }, 1800);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.focus();
  area.select();
  try { document.execCommand('copy'); } finally { document.body.removeChild(area); }
  done();
}

document.addEventListener('DOMContentLoaded', () => {
  const authorNote = document.querySelector('.author-note');
  if (authorNote) {
    authorNote.textContent = 'EMNLP 2026 Main Conference';
    authorNote.classList.add('venue-note');
  }
  const correspondingAuthor = document.querySelector('.corresponding-author');
  if (correspondingAuthor) correspondingAuthor.removeAttribute('href');

  const captions = {
    'table-longbench.png': 'Table 2. LongBench evaluation on Llama-3-8B-Instruct with a 20% logical KV-cache budget. Scores are reported for six task categories, including single-document QA, multi-document QA, summarization, few-shot learning, code generation, and synthetic retrieval. The shaded rows identify the strongest non-CentralKV baseline and the CentralKV result.',
    'table-detailed.png': 'Table 11. Detailed LongBench results across the 18 datasets used in the evaluation. The table reports the metric for each dataset together with Full Cache, H2O, GraphKV, and CentralKV scores; the final column shows the change relative to Full Cache.',
    'table-strict.png': 'Table 12. Strict physical budgeting analysis on 2WikiMultihopQA. The strict-cap comparison keeps the physical KV-cache footprint fixed at 20% (4GB), allowing the CentralKV policy to be compared with H2O under the same memory constraint.'
  };
  document.querySelectorAll('.paper-table-figure').forEach((figure) => {
    const image = figure.querySelector('img');
    const caption = figure.querySelector('figcaption');
    const key = image && image.getAttribute('src').split('/').pop();
    if (caption && captions[key]) caption.textContent = captions[key];
  });
});

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

window.addEventListener('scroll', () => {
  const button = document.querySelector('.scroll-to-top');
  if (button) button.classList.toggle('visible', window.scrollY > 420);
});
