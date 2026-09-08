import Script from "next/script";
import { getAddons } from "@/lib/data";

/**
 * Renders only the tracking scripts an admin has actually turned on in
 * /admin/addons. Each one is independently gated on both `enabled` and
 * having an ID filled in, so a half-configured addon never fires a broken
 * script tag.
 */
export default async function AddonScripts() {
  const addons = await getAddons();

  // Google Ads and GA4 both run on the same gtag.js library — loading it
  // twice (once per feature) would be wasteful and Google explicitly
  // recommends a single load with multiple config calls instead.
  const gtagId = addons.google_ads.enabled && addons.google_ads.conversion_id
    ? addons.google_ads.conversion_id
    : addons.google_analytics.enabled && addons.google_analytics.measurement_id
    ? addons.google_analytics.measurement_id
    : null;

  return (
    <>
      {addons.facebook_pixel.enabled && addons.facebook_pixel.pixel_id && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${addons.facebook_pixel.pixel_id}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {addons.tiktok_pixel.enabled && addons.tiktok_pixel.pixel_id && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<e.length;n++)ttq.setAndDefer(e,e[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('${addons.tiktok_pixel.pixel_id}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {addons.microsoft_clarity.enabled && addons.microsoft_clarity.project_id && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${addons.microsoft_clarity.project_id}");
          `}
        </Script>
      )}

      {addons.google_tag_manager.enabled && addons.google_tag_manager.container_id && (
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${addons.google_tag_manager.container_id}');
          `}
        </Script>
      )}

      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${addons.google_ads.enabled && addons.google_ads.conversion_id ? `gtag('config', '${addons.google_ads.conversion_id}');` : ""}
              ${addons.google_analytics.enabled && addons.google_analytics.measurement_id ? `gtag('config', '${addons.google_analytics.measurement_id}');` : ""}
            `}
          </Script>
        </>
      )}
    </>
  );
}
