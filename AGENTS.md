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
Bri uses Radix's modal overlay for background scroll locking and the visual viewport for compact-screen panel geometry, so keyboard resizing stays local to the assistant.
Bri voice controls use browser-native APIs only inside effects and visitor actions, with session-only lifecycle cleanup and editable recognition drafts; this avoids extra AI calls and keeps audio out of application storage.
Explore previews keep educational data and bounded journey navigation in a separate browser-safe module, with a section-local Radix modal, so interactivity does not alter shared primitives or completed sections.
Landing-page copy uses local source-key dictionaries and one hydration-safe language provider around site sections; Bri stays outside that provider, so website language changes cannot affect chat behavior. Optional close-label props localize site dialogs without changing default shared primitive behavior.
Section boundaries reuse SectionWaves, extracted unchanged from Hero; absolute positioning within existing bottom padding avoids extra gaps and content shifts. Keep the charcoal Footer's existing boundary rather than stacking decorations.
About counters use a per-number visibility lifecycle hook with cancellable frames and pause timers; this prevents tall mobile statistics groups from starting offscreen counters and releases animation work on exit.
