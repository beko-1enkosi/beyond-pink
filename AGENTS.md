<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Same-page navigation uses the shared section-scroll module, installed by the index page; section buttons call the same helper so easing, sticky-navbar offsets, mobile-menu closure and reduced-motion handling remain consistent.

Bri uses AI Elements and a session-only AI SDK conversation, with model calls and instructions isolated behind a same-origin TanStack server route; this preserves the landing page and prevents client exposure of secrets or stored chat data.
Bri’s temporary request limiter stores hashed visitor counters only in each server isolate, with a global ceiling; it is best-effort rather than durable protection and resets on restart.
AI Elements must adapt to existing UI primitive variants rather than changing shared buttons; this avoids altering completed website sections.
Bri's message renderer excludes the unused Mermaid diagram plugin so graph dependencies cannot break landing-page initialization; text formatting and links remain supported.
Bri's approved support contact lives in a browser-safe shared module consumed by the renderer and server instructions, so callable links and model guidance stay consistent.
Bri’s verified internal navigation links are explicitly permitted in both server guidance and message rendering; matching these keeps demo guidance clickable without enabling arbitrary links.
Bri uses Radix's modal overlay for background scroll locking and the visual viewport for compact-screen panel geometry, so keyboard resizing stays local to the assistant.
Bri voice controls use browser-native APIs only inside effects and visitor actions, with session-only lifecycle cleanup and editable recognition drafts; this avoids extra AI calls and keeps audio out of application storage.
Explore previews keep educational data and bounded journey navigation in a separate browser-safe module, with a section-local Radix modal, so interactivity does not alter shared primitives or completed sections.
Landing-page copy uses local source-key dictionaries and one hydration-safe language provider around site sections; Bri stays outside that provider, so website language changes cannot affect chat behavior. Optional close-label props localize site dialogs without changing default shared primitive behavior.
Section boundaries reuse SectionWaves, extracted unchanged from Hero; absolute positioning within existing bottom padding avoids extra gaps and content shifts. Keep the charcoal Footer's existing boundary rather than stacking decorations.
About counters use a per-number visibility lifecycle hook with cancellable frames and pause timers; this prevents tall mobile statistics groups from starting offscreen counters and releases animation work on exit.
Homepage sharing metadata and canonical live only in the leaf route head; its shared image URL resolves the optimised approved-photo asset pointer against the canonical origin, keeping crawlers on a single absolute public image without altering visible content.
Brea lives under src/routes/brea/ as folder routes (index.tsx = onboarding, home.tsx = home); a flat brea.tsx plus brea.home.tsx makes brea a layout parent and breaks /brea/home. Brea is English-only, outside the landing LanguageProvider, with its own tokens (--brea-*) in src/styles.css and demo personalization (name, interest, onboarded flag) in src/lib/brea/onboarding.ts via localStorage only.
Brea navigation uses shared capsule controls in BreaNavigation; confirmed reset deletes Brea-prefixed browser records and image databases, refreshes mounted state and reloads onboarding, preventing stale hooks from restoring old achievements while ordinary navigation preserves storage.

Subdirectories have their own AGENTS.md (e.g. src/lib/brea/) to read before changing files there.
Find Care uses browser-safe curated facility data and pure filtering/distance helpers, with Leaflet imported inside an effect and ephemeral location state; this avoids SSR browser imports, repeat geocoding and location persistence.
Find Care shares ribbon geometry between React legends and Leaflet icons, with a separate map-focus request counter for repeated card selections; this keeps marker identity consistent and reopens closed popups without changing facility data.

- Sitemap: router-derived via src/lib/sitemap.ts + src/routes/sitemap[.]xml.ts at https://beyond-pink.lovable.app; every route must set staticData.sitemap (true/false/"exclude-subtree"). GSC meta verification tag lives in src/routes/index.tsx head.

How Brea Works is an isolated website leaf with the shared LanguageProvider and language selector; tour data, approved screenshot slots and source-key translations stay browser-safe and separate from Brea storage, so introductory navigation cannot reset or gate app sessions.
