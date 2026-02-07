const input = document.getElementById('q');
const results = document.getElementById('results');
let index = [];

fetch('search-index.json')
  .then(r => r.json())
  .then(data => { index = data; })
  .catch(() => { index = []; });

function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
  return text.replace(re, '<mark>$1</mark>');
}

function render(resultsArr, q) {
  if (!resultsArr.length) {
    results.innerHTML = '<p>No results.</p>';
    return;
  }
  results.innerHTML = resultsArr.map(r => `
    <article style="margin-bottom:12px">
      <h3><a href="${r.url}">${highlight(r.title, q)}</a></h3>
      <p>${highlight(r.content.slice(0,200) + (r.content.length>200? '...':''), q)}</p>
    </article>
  `).join('');
}

input.addEventListener('input', (e) => {
  const q = (e.target.value || '').trim();
  if (!q) { results.innerHTML = ''; return; }
  const qLower = q.toLowerCase();
  const out = index.filter(i => (i.title + ' ' + i.content).toLowerCase().includes(qLower));
  render(out, q);
});
