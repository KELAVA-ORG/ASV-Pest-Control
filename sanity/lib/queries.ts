export const globalSettingsQuery = `*[_type == "globalSettings"][0] {
  siteName,
  logo { asset-> { url }, alt },
  logoDark { asset-> { url }, alt },
  favicon { asset-> { url } },
  colorPrimary,
  colorSecondary,
  colorAccent,
  colorText,
  colorBackground,
  fontDisplay,
  fontBody,
  fontGoogleUrl,
  buttonBgColor,
  buttonTextColor,
  buttonBorderRadius,
  defaultSeoTitle,
  defaultSeoDescription,
  defaultSeoImage { asset-> { url } },
  backToTopEnabled,
  backToTopBgColor,
  backToTopIconColor,
  backToTopSize,
  backToTopPosition,
  backToTopStyle,
  companyName,
  phoneMain,
  phoneMainFormatted,
  phoneMainTel,
  email,
  addressMain { street, zip, city },
  ctaButtonText,
  ctaButtonLink
}`

export const schaedlingsseiteQuery = `*[_type == "schaedlingsseite" && slug.current == $slug][0] {
  title,
  slug,
  seoTitle,
  seoDescription,
  heroImage { asset-> { url }, alt },
  heroSubtitle,
  introTitle,
  introText[] { ..., _type == "image" => { asset-> { url }, alt } },
  signsTitle,
  signs[] { title, description },
  risksTitle,
  risks[] { title, description },
  treatmentTitle,
  treatmentText[] { ..., _type == "image" => { asset-> { url }, alt } },
  treatmentImage { asset-> { url }, alt },
  treatmentCheckList,
  processTitle,
  processSteps[] { stepNumber, title, description },
  ctaBannerTitle,
  ctaBannerText,
  faqTitle,
  faqs[] { question, answer }
}`

export const schaedlingsseiteAllSlugsQuery = `*[_type == "schaedlingsseite" && !(_id in path("drafts.**"))] {
  slug { current }
}`

export const stadtseiteQuery = `*[_type == "stadtseite" && slug.current == $slug][0] {
  cityName,
  cityShort,
  slug,
  seoTitle,
  seoDescription,
  phone,
  phoneFormatted,
  phoneTel,
  address { street, zip, city },
  geo { lat, lng },
  plzExample,
  heroSubtitle,
  cityDescription,
  districts,
  einsatzgebietDesc,
  testimonials[] { text, author, location, rating },
  faqs[] { question, answer, answerSchema }
}`

export const stadtseiteAllSlugsQuery = `*[_type == "stadtseite" && !(_id in path("drafts.**"))] {
  slug { current }
}`

export const menuQuery = `*[_type == "menuCategory"] | order(order asc) {
  name,
  order,
  dishes[] {
    name,
    description,
    price,
    allergens
  }
}`

export const sideQuery = `*[_type == "sideCategory"] | order(order asc) {
  name,
  order,
  dishes[] {
    name,
    description,
    price,
    allergens
  }
}`

export const openingHoursQuery = `*[_type == "openingHours"][0] {
  title,
  hours[] { day, times },
  specialHours {
    enabled,
    label,
    items[] { day, times }
  }
}`

export const siteContentQuery = `*[_type == "siteContent"][0] {
  heroLogo { asset-> { url }, alt },
  heroTagline,
  heroSubtitle,
  heroBackgroundType,
  heroBackgroundImage { asset-> { url }, hotspot, alt },
  heroBackgroundVideo,
  heroBackgroundVideoFile { asset-> { url } },
  heroIllustration { asset-> { url }, hotspot, alt },
  heroCtaText,
  heroCtaLink,
  heroCtaEnabled,
  aboutTitle,
  aboutText1,
  aboutText2,
  address,
  phone,
  email
}`

export const navigationQuery = `*[_type == "navigation"][0] {
  logoText,
  logoImage { asset-> { url }, alt },
  menuItems[] {
    label,
    linkType,
    link,
    internalPage-> { _type, slug { current } },
    openInNewTab,
    mobileOnly,
    hasDropdown,
    dropdownItems[] { label, link, description }
  },
  ctaEnabled,
  ctaText,
  ctaLink,
  ctaOpenInNewTab
}`

export const footerQuery = `*[_type == "footer"][0] {
  logo { asset-> { url }, alt },
  socialLinks[] {
    platform,
    url,
    label
  },
  footerLinks[] {
    label,
    link,
    openInNewTab
  },
  copyrightText
}`

export const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
  title,
  slug,
  // SEO
  seoTitle,
  seoDescription,
  seoImage { asset-> { url } },
  canonicalUrl,
  noIndex,
  // Schema
  schemaType,
  schemaRestaurant,
  schemaEvent,
  schemaArticle,
  schemaProduct,
  customBreadcrumbs[] { label, url },
  // Custom Code
  customCss,
  customHeadJs,
  customBodyJs,
  customHeadTags,
  // Module
  modules[] {
    _type,
    _key,
    // Gemeinsame Felder
    heading,
    headingLevel,
    headingSize,
    body[] {
      ...,
      _type == "image" => {
        asset-> { url },
        alt,
        caption
      }
    },
    // Hero
    backgroundImage { asset-> { url }, alt },
    overlayOpacity,
    ctaText,
    ctaLinkType,
    ctaLink,
    ctaInternalPage-> { slug { current } },
    ctaNewTab,
    // Button-Design (alle Module mit Buttons)
    buttonBgColor,
    buttonTextColor,
    // Text
    alignment,
    narrowWidth,
    // Image + Text
    image { asset-> { url }, alt },
    imagePosition,
    // Gallery
    images[] {
      asset-> { url },
      alt,
      caption
    },
    columns,
    // CTA-Modul
    buttonText,
    buttonLinkType,
    buttonLink,
    buttonInternalPage-> { slug { current } },
    buttonNewTab,
    backgroundColor,
    backgroundOpacity,
    textColor,
    // Divider
    spacing,
    // Quote
    quote[] {
      ...,
    },
    author,
    // FAQ
    items[] {
      _key,
      question,
      answer[] {
        ...,
        _type == "image" => {
          asset-> { url },
          alt,
          caption
        }
      }
    },
    openFirst,
    // Form Module
    form-> {
      _id,
      name,
      fields[] {
        label,
        fieldName,
        fieldType,
        required,
        placeholder,
        defaultValue,
        options,
        halfWidth,
        validation {
          minLength,
          maxLength,
          pattern,
          patternMessage
        },
        acceptedFileTypes,
        maxFileSize
      },
      emailTo,
      emailCc,
      emailBcc,
      emailSubject,
      emailReplyToField,
      autoresponderEnabled,
      autoresponderEmailField,
      autoresponderSubject,
      autoresponderMessage,
      afterSubmitAction,
      successMessage,
      redirectType,
      redirectPage-> { slug { current } },
      redirectUrl,
      trackingEnabled,
      ga4EventName,
      ga4EventParams[] { key, value },
      gadsConversionId,
      gadsConversionLabel,
      gadsConversionValue,
      gadsCurrency,
      metaPixelEvent,
      metaPixelCustomEvent,
      captureUtmParams,
      honeypotEnabled,
      rateLimitPerMinute,
      recaptchaEnabled,
      submitButtonText,
      submitButtonBgColor,
      submitButtonTextColor,
      privacyNote,
      cssClass
    },
    narrowWidth,
    // Blog Posts Module
    postsCount,
    loadMoreEnabled,
    loadMoreText,
    sortBy,
    filterType,
    filterCategory-> { _id, name, slug },
    filterTag,
    showImage,
    showExcerpt,
    showDate,
    showCategory,
    showReadingTime,
    linkToAll,
    linkToAllText,
    // Video Module
    videoType,
    youtubeUrl,
    vimeoUrl,
    videoFile { asset-> { url } },
    posterImage { asset-> { url }, alt },
    caption,
    autoplay,
    loop,
    maxWidth
  }
}`

export const notFoundQuery = `*[_type == "notFoundPage"][0] {
  heading,
  text,
  buttonText,
  buttonLink,
  backgroundImage { asset-> { url }, alt }
}`

export const announcementBarQuery = `*[_type == "announcementBar"][0] {
  enabled,
  text,
  linkText,
  linkUrl,
  linkNewTab,
  dismissible,
  bgColor,
  textColor
}`

export const seoSettingsQuery = `*[_type == "seoSettings"][0] {
  robotsEnabled,
  robotsDisallowPaths,
  robotsAllowPaths,
  robotsCrawlDelay,
  robotsCustomRules,
  sitemapEnabled,
  sitemapDefaultPriority,
  sitemapDefaultFrequency,
  sitemapExcludePages[]-> { slug { current } },
  sitemapAdditionalUrls[] {
    url,
    priority,
    changeFrequency
  }
}`

export const sitemapPagesQuery = `*[_type == "page" && !(_id in path("drafts.**")) && excludeFromSitemap != true] {
  slug { current },
  sitemapPriority,
  sitemapFrequency,
  _updatedAt
}`

export const cookieConsentQuery = `*[_type == "cookieConsent"][0] {
  consentMode,
  usercentricsId,
  cookiebotId,
  customConsentScript,
  gaId,
  gtagManagerId,
  fbPixelId,
  gadsConversionId,
  customHeadCode,
  customBodyCode,
  consentRequiredHeadCode,
  heading,
  text,
  acceptAllText,
  acceptEssentialText,
  privacyLinkText,
  privacyLinkUrl,
  position,
  bgColor,
  textColor,
  revokeEnabled,
  revokeText,
  revokePosition
}`

/* ═══ BLOG ═══ */

export const blogSettingsQuery = `*[_type == "blogSettings"][0] {
  blogBasePath,
  blogTitle,
  blogDescription,
  seoTitle,
  postsPerPage,
  showAuthor,
  showDate,
  showReadingTime,
  showCategories,
  showRelatedPosts,
  showShareButtons,
  ctaEnabled,
  ctaHeading,
  ctaText,
  ctaButtonText,
  ctaButtonLink
}`

export const blogPostsQuery = `*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage { asset-> { url }, alt, caption },
  publishedAt,
  readingTime,
  featured,
  author-> { name, slug, image { asset-> { url }, alt } },
  categories[]-> { name, slug },
  tags,
  body
}`

export const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage { asset-> { url }, alt, caption },
  body[] {
    ...,
    _type == "image" => {
      asset-> { url },
      alt,
      caption
    },
    _type == "videoEmbed" => {
      videoType,
      url,
      file { asset-> { url } },
      caption
    },
    _type == "ctaButton" => {
      text,
      url,
      openInNewTab,
      style,
      alignment
    },
    _type == "infoBox" => {
      variant,
      title,
      body[] { ... }
    },
    _type == "gallery" => {
      images[] {
        asset-> { url },
        alt,
        caption
      },
      columns
    },
    _type == "faqBlock" => {
      items[] {
        _key,
        question,
        answer[] { ... }
      }
    },
    _type == "formEmbed" => {
      form-> {
        _id,
        name,
        fields[] {
          label,
          fieldName,
          fieldType,
          required,
          placeholder,
          defaultValue,
          options,
          halfWidth,
          validation {
            minLength,
            maxLength,
            pattern,
            patternMessage
          },
          acceptedFileTypes,
          maxFileSize
        },
        submitButtonText,
        submitButtonBgColor,
        submitButtonTextColor,
        privacyNote,
        cssClass,
        emailTo,
        emailSubject,
        successMessage,
        honeypotEnabled,
        rateLimitPerMinute,
        recaptchaEnabled
      }
    },
    markDefs[] {
      ...,
      _type == "internalLink" => {
        reference-> { _type, slug { current } }
      }
    }
  },
  publishedAt,
  updatedAt,
  readingTime,
  featured,
  author-> {
    name,
    slug,
    image { asset-> { url }, alt },
    role,
    bio,
    website,
    socialLinks[] { platform, url }
  },
  categories[]-> { name, slug },
  tags,
  relatedPosts[]-> {
    _id,
    title,
    slug,
    excerpt,
    featuredImage { asset-> { url }, alt },
    publishedAt,
    author-> { name }
  },
  // SEO
  seoTitle,
  seoDescription,
  seoImage { asset-> { url } },
  canonicalUrl,
  noIndex,
  focusKeyword,
  excludeFromSitemap
}`

export const blogPostSlugsQuery = `*[_type == "blogPost" && !(_id in path("drafts.**"))] {
  slug { current }
}`

export const blogCategoriesQuery = `*[_type == "blogCategory"] | order(order asc) {
  _id,
  name,
  slug,
  description,
  seoTitle
}`

export const blogCategoryPostsQuery = `*[_type == "blogPost" && !(_id in path("drafts.**")) && references(*[_type == "blogCategory" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage { asset-> { url }, alt },
  publishedAt,
  readingTime,
  author-> { name, slug, image { asset-> { url }, alt } },
  categories[]-> { name, slug },
  tags
}`

export const allPagesQuery = `*[_type == "page"] {
  slug { current }
}`

/* ═══ ASV SEITEN ═══ */

export const homePageQuery = `*[_type == "homePage"][0] {
  heroTitle,
  heroSubtitle,
  heroImage { asset->{ url }, alt },
  trustStats[] { num, label },
  taubenTitle,
  taubenText,
  taubenImage { asset->{ url }, alt },
  taubenChecklist,
  processTitle,
  processSteps[] { num, title, text },
  faqTitle,
  faqs[] { question, answer },
  ctaTitle,
  ctaText
}`

export const taubenabwehrPageQuery = `*[_type == "taubenabwehrPage"][0] {
  heroImage { asset->{ url }, alt },
  heroSubtitle,
  introTitle,
  introText,
  services[] { title, description },
  splitTitle,
  splitText,
  splitImage { asset->{ url }, alt },
  splitChecklist,
  processTitle,
  processSteps[] { num, title, text },
  faqTitle,
  faqs[] { question, answer },
  ctaTitle,
  ctaText
}`

export const ueberUnsPageQuery = `*[_type == "ueberUnsPage"][0] {
  heroSubtitle,
  storyTitle,
  storyText,
  storyImage { asset->{ url }, alt },
  stats[] { num, label },
  valuesTitle,
  values[] { title, text },
  certifications,
  ctaTitle,
  ctaText
}`

export const standortePageQuery = `*[_type == "standortePage"][0] {
  heroSubtitle,
  introText,
  locations[] { name, address, phone, phoneTel, description, hours },
  hotlineTitle,
  hotlineText,
  ctaTitle,
  ctaText
}`

export const karrierePageQuery = `*[_type == "karrierePage"][0] {
  heroSubtitle,
  introTitle,
  introText,
  benefitsTitle,
  benefits[] { title, text },
  jobsTitle,
  jobs[] { title, type, location, description, requirements },
  initiativeTitle,
  initiativeText,
  ctaTitle,
  ctaText
}`

export const superexpelPageQuery = `*[_type == "superexpelPage"][0] {
  heroSubtitle,
  introTitle,
  introText,
  introImage { asset->{ url }, alt },
  introChecklist,
  stats[] { num, label },
  usesTitle,
  uses[] { title, text },
  processTitle,
  processSteps[] { num, title, text },
  faqTitle,
  faqs[] { question, answer },
  ctaTitle,
  ctaText
}`

export const analyticsEventsQuery = `*[_type == "analyticsEvents"][0] {
  trackCtaClicks,
  ctaEventName,
  trackPhoneClicks,
  phoneEventName,
  trackEmailClicks,
  emailEventName,
  trackExternalLinks,
  externalLinkEventName,
  trackMenuViews,
  trackScrollDepth,
  scrollThresholds,
  trackTimeOnPage,
  timeThresholds,
  trackFormSubmissions,
  formEventName,
  customEvents[] {
    eventName,
    selector,
    trigger,
    params[] { key, value }
  }
}`
