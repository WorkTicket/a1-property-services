/** Validate public Google tag IDs before inlining into HTML. */
export function isValidGaId(id: string | undefined): id is string {
  return typeof id === 'string' && /^G-[A-Z0-9]+$/i.test(id)
}

export function isValidAdsId(id: string | undefined): id is string {
  return typeof id === 'string' && /^AW-\d+$/i.test(id)
}

/**
 * Inline bootstrap matching Google's gtag snippet, plus Consent Mode so the
 * Ads tag is present for scanners while storage stays off until accept.
 */
export function buildGoogleTagsBootstrap(gaId?: string, adsId?: string): string {
  const configs: string[] = []
  if (isValidGaId(gaId)) {
    configs.push(`gtag('config','${gaId}',{anonymize_ip:true});`)
  }
  if (isValidAdsId(adsId)) {
    configs.push(`gtag('config','${adsId}');`)
  }
  if (configs.length === 0) return ''

  return `(function(){
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  var granted=false;
  try{granted=localStorage.getItem('a1_cookie_consent')==='accepted';}catch(e){}
  var s=granted?'granted':'denied';
  gtag('consent','default',{
    ad_storage:s,
    ad_user_data:s,
    ad_personalization:s,
    analytics_storage:s,
    wait_for_update:500
  });
  gtag('js',new Date());
  ${configs.join('')}
})();`
}
