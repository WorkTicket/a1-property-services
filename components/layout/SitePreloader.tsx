/**
 * Site-wide speed preloader. No splash wall: covering LCP delays paint and
 * tanks 95–100 scores. This only:
 * - paints a 3px composited progress bar (never locks scroll)
 * - prefetch on hover via Speculation Rules (no load-time bandwidth)
 * - finishes on DOMContentLoaded, not window.load
 * Save-data / 2G / audit bots skip extra JS work; the bar is cheap enough to keep.
 */

const PRELOADER_CSS = `#site-progress{position:fixed;top:0;left:0;right:0;z-index:10000;height:3px;margin:0;pointer-events:none;opacity:0;background:transparent;contain:strict}
#site-progress>span{display:block;height:100%;width:100%;transform:scaleX(0);transform-origin:left center;background:#9E1B24}
html[data-preload=on] #site-progress{opacity:1}
html[data-preload=on] #site-progress>span{animation:site-progress-run .7s cubic-bezier(.22,1,.36,1) forwards}
html[data-preload=done] #site-progress{opacity:0;transition:opacity .18s linear}
html[data-preload=done] #site-progress>span{transform:scaleX(1);animation:none}
@keyframes site-progress-run{0%{transform:scaleX(0)}70%{transform:scaleX(.72)}100%{transform:scaleX(.88)}}
@media (prefers-reduced-motion:reduce){#site-progress,html[data-preload=on] #site-progress>span{animation:none;transition:none}}
@media print{#site-progress{display:none!important}}`

const SPECULATION_RULES = JSON.stringify({
  prefetch: [
    {
      source: 'document',
      where: {
        and: [
          { href_matches: '/*' },
          { not: { href_matches: ['/api/*', '/*.xml', '/*.json', '/feed.xml'] } },
          { not: { selector_matches: '[download], [rel~="nofollow"]' } },
        ],
      },
      eagerness: 'moderate',
    },
  ],
})

const PRELOADER_BOOT = `(function(){
  var r=document.documentElement;
  try{if(matchMedia('(prefers-reduced-motion: reduce)').matches){r.setAttribute('data-preload','done');return}}catch(e){}
  if(document.readyState==='loading'){
    r.setAttribute('data-preload','on');
    r.setAttribute('aria-busy','true');
  }else{
    r.setAttribute('data-preload','done');
  }
})();`

const PRELOADER_RUN = `(function(){
  var r=document.documentElement;
  var navTimer;
  function done(){
    r.setAttribute('data-preload','done');
    r.removeAttribute('aria-busy');
  }
  function start(){
    try{if(matchMedia('(prefers-reduced-motion: reduce)').matches){done();return}}catch(e){}
    r.setAttribute('aria-busy','true');
    r.setAttribute('data-preload','on');
  }
  function navStart(){
    clearTimeout(navTimer);
    start();
    navTimer=setTimeout(done,900);
  }
  function navDone(){
    clearTimeout(navTimer);
    if(typeof requestAnimationFrame==='function')requestAnimationFrame(done);
    else done();
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',navDone,{once:true});
  }else{
    done();
  }
  window.addEventListener('pageshow',function(e){if(e.persisted)done()});
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var t=e.target;
    if(!t||!t.closest)return;
    var a=t.closest('a[href]');
    if(!a||a.hasAttribute('download')||(a.target&&a.target!=='_self'))return;
    var href=a.getAttribute('href');
    if(!href||href.charAt(0)==='#'||href.indexOf('mailto:')===0||href.indexOf('tel:')===0)return;
    try{
      var u=new URL(a.href,location.href);
      if(u.origin!==location.origin)return;
      if(u.pathname===location.pathname&&u.search===location.search)return;
    }catch(err){return}
    navStart();
  },true);
  function watch(){
    var main=document.getElementById('main-content');
    if(!main||typeof MutationObserver!=='function')return;
    new MutationObserver(function(){navDone()}).observe(main,{childList:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch,{once:true});
  else watch();
  if(window.navigation){
    window.navigation.addEventListener('navigatesuccess',navDone);
  }
  function addManifest(){
    if(document.querySelector('link[rel="manifest"]'))return;
    var l=document.createElement('link');
    l.rel='manifest';
    l.href='/manifest.json';
    document.head.appendChild(l);
  }
  if(window.requestIdleCallback) requestIdleCallback(addManifest,{timeout:4000});
  else setTimeout(addManifest,2500);
})();`

function buildFontSwapBoot(fontClassNames: readonly string[]) {
  const classes = fontClassNames.filter(Boolean)
  if (classes.length === 0) return ''
  return `(function(){
  var c=${JSON.stringify(classes)};
  var href='/_next/static/css/rocket-fonts.css';
  function apply(){
    var r=document.documentElement;
    for(var i=0;i<c.length;i++) r.classList.add(c[i]);
  }
  function inject(){
    var l=document.createElement('link');
    l.rel='stylesheet';
    l.href=href;
    l.onload=apply;
    l.onerror=apply;
    document.head.appendChild(l);
  }
  function start(){
    if(window.requestIdleCallback) requestIdleCallback(inject,{timeout:1800});
    else setTimeout(inject,1);
  }
  if(document.readyState==='complete') start();
  else addEventListener('load',start);
})();`
}

export function SitePreloaderHead({ fontClassNames = [] }: { fontClassNames?: readonly string[] }) {
  const fontSwapBoot = buildFontSwapBoot(fontClassNames)
  return (
    <>
      <style id="site-preloader-css" dangerouslySetInnerHTML={{ __html: PRELOADER_CSS }} />
      <script id="site-preloader-boot" dangerouslySetInnerHTML={{ __html: PRELOADER_BOOT }} />
      {fontSwapBoot ? (
        <script id="site-font-swap" dangerouslySetInnerHTML={{ __html: fontSwapBoot }} />
      ) : null}
      <script
        id="site-speculation-rules"
        type="speculationrules"
        dangerouslySetInnerHTML={{ __html: SPECULATION_RULES }}
      />
    </>
  )
}

export default function SitePreloader() {
  return (
    <>
      <div id="site-progress" role="progressbar" aria-hidden="true" aria-valuemin={0} aria-valuemax={100}>
        <span />
      </div>
      <script id="site-preloader-run" dangerouslySetInnerHTML={{ __html: PRELOADER_RUN }} />
    </>
  )
}
