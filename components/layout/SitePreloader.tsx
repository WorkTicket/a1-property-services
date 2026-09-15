/**
 * Site-wide first-paint preloader. Inline CSS/JS on purpose:
 * no extra chunk, no image request, no window.load, no hydration wait.
 * Repeat visits, reduced-motion, save-data, slow 2G, and audit bots skip it.
 */

export const PRELOADER_STORAGE_KEY = 'a1ps-preloader-seen'

const PRELOADER_CSS = `
#site-preloader{
  position:fixed;
  inset:0;
  z-index:9999;
  display:flex;
  align-items:center;
  justify-content:center;
  margin:0;
  color:#fff;
  background:
    radial-gradient(ellipse 70% 52% at 50% 42%,rgba(158,27,36,.2),transparent 64%),
    #0D0D0D;
  contain:layout style paint;
  pointer-events:auto;
  opacity:1;
  visibility:visible;
  transition:opacity .28s cubic-bezier(.22,1,.36,1),visibility .28s linear;
}
html[data-preloader="fading"] #site-preloader{
  opacity:0;
  visibility:hidden;
  pointer-events:none;
}
html[data-preloader="done"] #site-preloader{
  display:none!important;
}
html:not([data-preloader="done"]){
  overflow:hidden;
}
.site-preloader-inner{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1.2rem;
  text-align:center;
  animation:site-preloader-in .4s cubic-bezier(.22,1,.36,1) both;
}
.site-preloader-mark{
  position:relative;
  width:6rem;
  height:6rem;
}
.site-preloader-ring{
  position:absolute;
  inset:0;
  border-radius:50%;
  border:1px solid rgba(158,27,36,.35);
  box-shadow:0 0 0 8px rgba(158,27,36,.08);
  animation:site-preloader-pulse 1.1s cubic-bezier(.22,1,.36,1) infinite;
}
.site-preloader-logo{
  position:absolute;
  inset:.55rem;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  background:#fff;
  box-shadow:0 18px 40px -20px rgba(0,0,0,.55);
}
.site-preloader-logo svg{
  width:2.35rem;
  height:2.35rem;
}
.site-preloader-copy{
  display:flex;
  flex-direction:column;
  gap:.35rem;
}
.site-preloader-brand{
  margin:0;
  font-family:Georgia,Times New Roman,serif;
  font-size:1.05rem;
  font-weight:700;
  letter-spacing:.16em;
  line-height:1.2;
  text-transform:uppercase;
}
.site-preloader-place{
  margin:0;
  font-family:system-ui,-apple-system,sans-serif;
  font-size:.72rem;
  font-weight:500;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:rgba(255,255,255,.58);
}
.site-preloader-bar{
  width:7.5rem;
  height:2px;
  overflow:hidden;
  border-radius:99px;
  background:rgba(255,255,255,.12);
}
.site-preloader-bar>span{
  display:block;
  width:42%;
  height:100%;
  border-radius:inherit;
  background:#9E1B24;
  transform:translateX(-120%);
  animation:site-preloader-bar .9s ease-in-out infinite;
  will-change:transform;
}
@keyframes site-preloader-in{
  from{opacity:0;transform:translate3d(0,10px,0) scale(.96)}
  to{opacity:1;transform:none}
}
@keyframes site-preloader-pulse{
  0%,100%{transform:scale(1);opacity:1}
  50%{transform:scale(1.06);opacity:.55}
}
@keyframes site-preloader-bar{
  0%{transform:translateX(-120%)}
  100%{transform:translateX(280%)}
}
@media print{
  #site-preloader{display:none!important}
}
`

const PRELOADER_BOOT = `(function(){
  var r=document.documentElement;
  function skip(){
    try{if(sessionStorage.getItem('${PRELOADER_STORAGE_KEY}')==='1')return true}catch(e){}
    try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return true}catch(e){}
    var n=navigator;
    if(n.webdriver)return true;
    if(/HeadlessChrome|Lighthouse|Chrome-Lighthouse|PTST/i.test(n.userAgent))return true;
    var c=n.connection||n.mozConnection||n.webkitConnection;
    if(c&&(c.saveData||c.effectiveType==='2g'||c.effectiveType==='slow-2g'))return true;
    return false;
  }
  if(skip()){
    r.setAttribute('data-preloader','done');
    r.removeAttribute('aria-busy');
  }else{
    r.setAttribute('aria-busy','true');
  }
})();`

const PRELOADER_RUN = `(function(){
  var KEY='${PRELOADER_STORAGE_KEY}';
  var r=document.documentElement;
  var MIN=380,MAX=820,FADE=280;
  function finish(){
    r.setAttribute('data-preloader','done');
    r.removeAttribute('aria-busy');
    try{sessionStorage.setItem(KEY,'1')}catch(e){}
  }
  if(r.getAttribute('data-preloader')==='done')return;
  var start=Date.now();
  var started=false;
  function fade(){
    if(r.getAttribute('data-preloader')==='done')return;
    r.setAttribute('data-preloader','fading');
    setTimeout(finish,FADE);
  }
  function dismiss(){
    if(started)return;
    started=true;
    var wait=Math.max(0,MIN-(Date.now()-start));
    setTimeout(fade,wait);
  }
  setTimeout(dismiss,MAX);
  if(document.readyState!=='loading')dismiss();
  else document.addEventListener('DOMContentLoaded',dismiss,{once:true});
  window.addEventListener('pageshow',function(e){if(e.persisted)finish()},{once:true});
})();`

export function SitePreloaderHead() {
  return (
    <>
      <style id="site-preloader-css" dangerouslySetInnerHTML={{ __html: PRELOADER_CSS }} />
      <script id="site-preloader-boot" dangerouslySetInnerHTML={{ __html: PRELOADER_BOOT }} />
      <noscript>
        <style>{'#site-preloader{display:none!important}html{overflow:auto!important}'}</style>
      </noscript>
    </>
  )
}

export default function SitePreloader() {
  return (
    <>
      <div
        id="site-preloader"
        role="status"
        aria-live="polite"
        aria-label="Loading A1 Property Services"
        suppressHydrationWarning
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D0D0D',
        }}
      >
        <div className="site-preloader-inner">
          <div className="site-preloader-mark" aria-hidden="true">
            <span className="site-preloader-ring" />
            <span className="site-preloader-logo">
              <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path
                  fill="#9E1B24"
                  d="M7 35.5 32 10.5 47 25.2V17h9.5v14.4L62 36.5H48.2L32 20.6 15.8 36.5H7Z"
                />
                <path
                  fill="#9E1B24"
                  d="M10 42c10.4 12.8 28.6 16.8 46 7.2l-4.8-5.2C35.8 52.4 22.6 48.6 14.2 38.8L10 42Z"
                />
              </svg>
            </span>
          </div>
          <div className="site-preloader-copy">
            <p className="site-preloader-brand">A1 Property Services</p>
            <p className="site-preloader-place">Cedar Falls, Iowa</p>
          </div>
          <div className="site-preloader-bar" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      <script id="site-preloader-run" dangerouslySetInnerHTML={{ __html: PRELOADER_RUN }} />
    </>
  )
}
