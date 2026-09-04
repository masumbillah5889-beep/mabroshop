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

      {addons.google_ads.enabled && addons.google_ads.conversion_id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${addons.google_ads.conversion_id}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${addons.google_ads.conversion_id}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
