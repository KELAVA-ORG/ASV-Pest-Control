import type { Metadata } from "next";
import "./globals.css";
import "./asv.css";
import { client } from "@/sanity/lib/client";
import { globalSettingsQuery, cookieConsentQuery, announcementBarQuery, analyticsEventsQuery } from "@/sanity/lib/queries";
import CookieBanner from "./components/CookieBanner";
import AnnouncementBar from "./components/AnnouncementBar";
import BackToTop from "./components/BackToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";

interface SanityColor {
  hex?: string;
}

interface GlobalSettings {
  siteName?: string;
  logo?: { asset?: { url: string }; alt?: string };
  favicon?: { asset?: { url: string } };
  colorPrimary?: SanityColor;
  colorSecondary?: SanityColor;
  colorAccent?: SanityColor;
  colorText?: SanityColor;
  colorBackground?: SanityColor;
  fontDisplay?: string;
  fontBody?: string;
  fontGoogleUrl?: string;
  buttonBgColor?: SanityColor;
  buttonTextColor?: SanityColor;
  buttonBorderRadius?: number;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultSeoImage?: { asset?: { url: string } };
  backToTopEnabled?: boolean;
  backToTopBgColor?: SanityColor;
  backToTopIconColor?: SanityColor;
  backToTopSize?: number;
  backToTopPosition?: string;
  backToTopStyle?: string;
}

interface CookieConsentSettings {
  consentMode?: string;
  usercentricsId?: string;
  cookiebotId?: string;
  customConsentScript?: string;
  gaId?: string;
  gtagManagerId?: string;
  fbPixelId?: string;
  gadsConversionId?: string;
  customHeadCode?: string;
  customBodyCode?: string;
  consentRequiredHeadCode?: string;
  heading?: string;
  text?: string;
  acceptAllText?: string;
  acceptEssentialText?: string;
  privacyLinkText?: string;
  privacyLinkUrl?: string;
  position?: string;
  bgColor?: SanityColor;
  textColor?: SanityColor;
  revokeEnabled?: boolean;
  revokeText?: string;
  revokePosition?: string;
}

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings: GlobalSettings | null = await client.fetch(globalSettingsQuery);
  return {
    title: settings?.defaultSeoTitle || "Meine Website",
    description: settings?.defaultSeoDescription || "Willkommen auf unserer Website.",
    openGraph: settings?.defaultSeoImage?.asset?.url
      ? { images: [{ url: settings.defaultSeoImage.asset.url }] }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, consentData, announcementData, analyticsConfig] = await Promise.all([
    client.fetch(globalSettingsQuery),
    client.fetch(cookieConsentQuery),
    client.fetch(announcementBarQuery),
    client.fetch(analyticsEventsQuery),
  ]) as [GlobalSettings | null, CookieConsentSettings | null, Record<string, unknown> | null, Record<string, unknown> | null];

  // CSS-Variablen aus Backend-Farben
  const cssVars: string[] = [];
  if (settings?.colorPrimary?.hex) cssVars.push(`--navy: ${settings.colorPrimary.hex}`);
  if (settings?.colorSecondary?.hex) cssVars.push(`--cream: ${settings.colorSecondary.hex}`);
  if (settings?.colorAccent?.hex) cssVars.push(`--sage: ${settings.colorAccent.hex}`);
  if (settings?.colorText?.hex) cssVars.push(`--charcoal: ${settings.colorText.hex}`);
  if (settings?.colorBackground?.hex) cssVars.push(`--body-bg: ${settings.colorBackground.hex}`);
  if (settings?.fontDisplay) cssVars.push(`--font-display: '${settings.fontDisplay}', serif`);
  if (settings?.fontBody) cssVars.push(`--font-body: '${settings.fontBody}', sans-serif`);
  if (settings?.buttonBgColor?.hex) cssVars.push(`--btn-bg: ${settings.buttonBgColor.hex}`);
  if (settings?.buttonTextColor?.hex) cssVars.push(`--btn-color: ${settings.buttonTextColor.hex}`);
  if (settings?.buttonBorderRadius !== undefined) cssVars.push(`--btn-radius: ${settings.buttonBorderRadius}px`);

  const cssVarString = cssVars.length > 0
    ? `:root { ${cssVars.join('; ')} }`
    : '';

  // Google Fonts URL
  const fontsUrl = settings?.fontGoogleUrl
    || 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

  // Favicon
  const faviconUrl = settings?.favicon?.asset?.url;

  // Consent mode
  const mode = consentData?.consentMode || 'disabled';

  return (
    <html lang="de">
      <head>
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontsUrl} rel="stylesheet" />
        {cssVarString && <style dangerouslySetInnerHTML={{ __html: cssVarString }} />}

        {/* ─── Usercentrics ─── */}
        {mode === 'usercentrics' && consentData?.usercentricsId && (
          <script
            id="usercentrics-cmp"
            src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
            data-settings-id={consentData.usercentricsId}
            async
          />
        )}

        {/* ─── Cookiebot ─── */}
        {mode === 'cookiebot' && consentData?.cookiebotId && (
          <script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={consentData.cookiebotId}
            data-blockingmode="auto"
            async
          />
        )}

        {/* ─── Custom Consent Script ─── */}
        {mode === 'custom' && consentData?.customConsentScript && (
          <script dangerouslySetInnerHTML={{ __html: consentData.customConsentScript }} />
        )}

        {/* ─── For external consent tools: load GA/GTM with consent attributes ─── */}
        {mode !== 'built-in' && mode !== 'disabled' && (
          <>
            {consentData?.gaId && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${consentData.gaId}`}
                  {...(mode === 'usercentrics' ? { 'data-usercentrics': 'Google Analytics' } as Record<string, string> : {})}
                  {...(mode === 'cookiebot' ? { 'data-cookieconsent': 'statistics' } as Record<string, string> : {})}
                />
                <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('config','${consentData.gaId}');` }} />
              </>
            )}
            {consentData?.gtagManagerId && (
              <script
                dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${consentData.gtagManagerId}');` }}
                {...(mode === 'usercentrics' ? { 'data-usercentrics': 'Google Tag Manager' } as Record<string, string> : {})}
                {...(mode === 'cookiebot' ? { 'data-cookieconsent': 'statistics' } as Record<string, string> : {})}
              />
            )}
          </>
        )}

        {/* ─── Custom Head Code (always loads) ─── */}
        {consentData?.customHeadCode && (
          <script dangerouslySetInnerHTML={{ __html: consentData.customHeadCode }} />
        )}
      </head>
      <body>
        <AnnouncementBar data={announcementData} />

        {/* GTM noscript (for external consent tools) */}
        {mode !== 'built-in' && mode !== 'disabled' && consentData?.gtagManagerId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${consentData.gtagManagerId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
          </noscript>
        )}

        {children}

        {/* ─── Built-in Cookie Banner (handles its own script loading) ─── */}
        <CookieBanner data={consentData} />

        {settings?.backToTopEnabled !== false && (
          <BackToTop
            bgColor={settings?.backToTopBgColor?.hex}
            iconColor={settings?.backToTopIconColor?.hex}
            size={settings?.backToTopSize}
            position={settings?.backToTopPosition}
            shape={settings?.backToTopStyle}
          />
        )}

        {/* Analytics Event Tracking */}
        <AnalyticsTracker config={analyticsConfig} />

        {/* Custom Body Code (always loads) */}
        {consentData?.customBodyCode && (
          <script dangerouslySetInnerHTML={{ __html: consentData.customBodyCode }} />
        )}
      </body>
    </html>
  );
}
