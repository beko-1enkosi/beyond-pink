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
Bri's approved support contact lives in a browser-safe shared module consumed by the renderer and server instructions, so callable links and model guidance stay consistent.
Bri uses Radix's modal overlay for background scroll locking and the visual viewport for compact-screen panel geometry, so keyboard resizing stays local to the assistant.
Explore previews keep educational data and bounded journey navigation in a separate browser-safe module, with a section-local Radix modal, so interactivity does not alter shared primitives or completed sections.
