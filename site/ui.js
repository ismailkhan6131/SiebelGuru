// ui.js: theme toggle, mobile nav, copy code, collapsible headings
(function(){
  function $(s){return document.querySelector(s)}
  function $all(s){return Array.from(document.querySelectorAll(s))}

  // Theme toggle
  const themeBtn = document.querySelector('.theme-toggle');
  function setDark(){ document.documentElement.style.setProperty('--bg','#071428'); }
  function setLight(){ document.documentElement.style.setProperty('--bg','#f6fbff'); }
  if(themeBtn){
    const cur = localStorage.getItem('theme') || 'dark';
    if(cur==='light') setLight(); else setDark();
    themeBtn.addEventListener('click', ()=>{
      const t = localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', t);
      if(t==='light') setLight(); else setDark();
    });
  }

  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click', ()=>{
      nav.style.display = (nav.style.display==='flex') ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
    });
  }

  // Add copy buttons to code blocks
  $all('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', ()=>{
      const text = pre.innerText;
      navigator.clipboard.writeText(text).then(()=>{
        btn.textContent = 'Copied';
        setTimeout(()=>btn.textContent='Copy',1200);
      }).catch(()=>{btn.textContent='Err';setTimeout(()=>btn.textContent='Copy',1200)});
    });
    pre.style.position='relative';
    pre.appendChild(btn);
  });

  // Make H3 collapsible (toggle next sibling content)
  $all('main h3').forEach(h3=>{
    const t = document.createElement('button');
    t.className='btn';
    t.style.marginLeft='8px';
    t.textContent='Toggle';
    h3.appendChild(t);
    const next = h3.nextElementSibling;
    if(next){ next.style.transition='all 0.18s ease'; }
    t.addEventListener('click', ()=>{
      if(!next) return;
      if(next.style.display === 'none') next.style.display='block'; else next.style.display='none';
    });
  });

})();
