import { useEffect, useMemo, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Leaf, RotateCcw, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { scrollToSection } from "@/lib/section-scroll";
import { BRI_SUPPORT_CONTACT } from "@/lib/bri/support-contact";

const QUESTIONS = [
  "What is BeyondPink?",
  "What is Brea?",
  "What can I explore?",
  "Can men get breast cancer?",
  "Where can I find support?",
  "How does Find Care work?",
];
const WELCOME =
  "Hi! I'm Bri 💚 I'm here to help you explore BeyondPink and Brea. What would you like to know?";
const ANCHORS = new Set(["#home", "#about", "#explore", "#support", "#resources", "#founder"]);
const EXTERNAL = new Set([
  "https://www.who.int/news-room/fact-sheets/detail/breast-cancer",
  "https://cansa.org.za/breast-cancer/",
  "https://cansa.org.za/cansas-care-support/support-groups/",
  "https://cansa.org.za/cansa-care-centres-contact-details/",
]);

function BriMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className}>
      <path
        d="M16 9c-1 7-7 12-7 20 0 7 5 11 10 11 4 0 5-3 5-6 0 3 1 6 5 6 5 0 10-4 10-11 0-8-6-13-7-20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15 28c2-4 6-4 8-1m10 1c-2-4-6-4-8-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M24 14c-4-5-9 0 0 6 9-6 4-11 0-6Z" fill="currentColor" opacity=".7" />
    </svg>
  );
}

export function Bri() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/bri" }), []);
  const { messages, sendMessage, status, stop, setMessages, clearError } = useChat({
    transport,
    onError: (e) => setNotice(e.message || "Bri couldn’t connect. Please try again later."),
  });
  const busy = status === "submitted" || status === "streaming";
  const latest = messages.at(-1);
  const thinking = busy && !(latest?.role === "assistant" && latest.parts.some((p) => p.type === "text" && p.text));
  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const updateViewport = () => {
      panel.current?.style.setProperty("--bri-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
      panel.current?.style.setProperty("--bri-viewport-top", `${viewport?.offsetTop ?? 0}px`);
    };
    updateViewport();
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, [open]);
  const send = (text: string) => {
    if (busy || !text.trim()) return;
    setNotice("");
    clearError();
    setDraft("");
    void sendMessage({ text: text.trim() });
    input.current?.focus();
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <div hidden={open} className="bri-launcher-wrap fixed bottom-5 right-4 z-[60] flex items-center gap-3 sm:bottom-7 sm:right-7">
        {!open && (
          <span className="rounded-full border border-sage/40 bg-card px-4 py-2 text-sm font-medium shadow-soft">
            Ask Bri ✨
          </span>
        )}
        <DialogPrimitive.Trigger asChild>
          <Button
            ref={launcher}
            className="bri-launcher h-14 w-14 rounded-full p-0 text-ivory sm:h-16 sm:w-16"
            aria-label="Ask Bri"
            aria-haspopup="dialog"
            title="Ask Bri"
          >
            <BriMark className="!h-10 !w-10" />
          </Button>
        </DialogPrimitive.Trigger>
      </div>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] touch-none" />
        <DialogPrimitive.Content
          ref={panel}
          aria-describedby="bri-subtitle"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            input.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            launcher.current?.focus();
          }}
          className="bri-panel fixed bottom-24 right-4 z-[61] flex h-[min(660px,calc(100dvh-120px))] w-[calc(100vw-32px)] max-w-[410px] flex-col overflow-hidden rounded-2xl border border-sage/40 bg-card shadow-soft outline-none sm:bottom-28 sm:right-7"
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-sage/25 bg-accent/60 px-5 py-4">
            <span className="bri-mark flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ivory">
              <BriMark className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <DialogPrimitive.Title className="font-serif text-2xl leading-none">
                Bri 🎀
              </DialogPrimitive.Title>
              <DialogPrimitive.Description
                id="bri-subtitle"
                className="mt-1.5 text-xs text-foreground"
              >
                Your BeyondPink companion
              </DialogPrimitive.Description>
            </div>
            <Button
              variant="ghost"
              size="icon"
              title="Start a new chat"
              aria-label="Start a new chat"
              disabled={busy}
              onClick={() => {
                setMessages([]);
                setNotice("");
                clearError();
                setDraft("");
                input.current?.focus();
              }}
            >
              <RotateCcw />
            </Button>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close Bri" title="Close Bri">
                <X />
              </Button>
            </DialogPrimitive.Close>
          </header>
          <Conversation
            className="min-h-0 flex-1 overscroll-contain"
            initial={reduced ? "instant" : "smooth"}
            resize={reduced ? "instant" : "smooth"}
          >
            <ConversationContent
              className="gap-5 px-5 py-5"
              onClick={(e) => {
                const a = e.target instanceof Element ? e.target.closest("a") : null;
                if (!a) return;
                const href = a.getAttribute("href") ?? "";
                if (ANCHORS.has(href)) {
                  e.preventDefault();
                  setOpen(false);
                  scrollToSection(href, true);
                } else if (!EXTERNAL.has(href) && href !== BRI_SUPPORT_CONTACT.href) e.preventDefault();
              }}
            >
              <Message from="assistant">
                <MessageContent>
                  <MessageResponse>{WELCOME}</MessageResponse>
                </MessageContent>
              </Message>
              {messages.length === 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {QUESTIONS.map((q) => (
                    <Button
                      key={q}
                      variant="outline"
                      disabled={busy}
                      onClick={() => send(q)}
                      className="h-auto min-h-12 whitespace-normal rounded-lg border-sage/35 bg-background/60 px-3 py-2 text-left text-xs leading-relaxed"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              )}
              {messages.map((m) => (
                <Message key={m.id} from={m.role}>
                  <MessageContent className="break-words leading-relaxed group-[.is-user]:bg-accent group-[.is-user]:text-accent-foreground">
                    {m.parts.map((p, i) =>
                      p.type === "text" ? (
                        <MessageResponse
                          key={i}
                          isAnimating={status === "streaming" && m.id === messages.at(-1)?.id}
                          components={{
                            a: ({ href, children }) =>
                              ANCHORS.has(href ?? "") ? (
                                <a
                                  href={href}
                                  className="underline decoration-sage underline-offset-4"
                                >
                                  {children}
                                </a>
                               ) : href === BRI_SUPPORT_CONTACT.href ? (
                                 <a href={href} className="underline decoration-sage underline-offset-4">
                                   {children}
                                 </a>
                               ) : EXTERNAL.has(href ?? "") ? (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-sage underline-offset-4"
                                >
                                  {children}
                                </a>
                              ) : (
                                <span>{children}</span>
                              ),
                          }}
                        >
                          {p.text}
                        </MessageResponse>
                      ) : null,
                    )}
                  </MessageContent>
                </Message>
              ))}
              {thinking && !notice && (
                <Message from="assistant">
                  <MessageContent className="rounded-lg bg-accent px-4 py-3">
                    <div role="status" aria-label="Bri is thinking" className="flex h-4 items-center gap-1.5">
                      <span className="sr-only">Bri is thinking…</span>
                      <span aria-hidden className="bri-thinking-dot h-2 w-2 rounded-full bg-sage" />
                      <span aria-hidden className="bri-thinking-dot h-2 w-2 rounded-full bg-sage" />
                      <span aria-hidden className="bri-thinking-dot h-2 w-2 rounded-full bg-sage" />
                    </div>
                  </MessageContent>
                </Message>
              )}
              {notice && (
                <p
                  role="alert"
                  className="rounded-lg border border-rose/40 bg-blush/35 p-3 text-sm leading-relaxed"
                >
                  {notice}
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton aria-label="Latest messages" title="Latest messages" />
          </Conversation>
          <div className="bri-composer shrink-0 border-t border-sage/25 px-4 pb-3 pt-2 sm:pb-4 sm:pt-3">
            <PromptInput onSubmit={({ text }) => send(text)}>
              <PromptInputTextarea
                ref={input}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={1000}
                aria-label="Message Bri"
                placeholder="Ask Bri a question…"
                rows={1}
                className="max-h-20 min-h-9 py-2 text-base sm:max-h-28 sm:min-h-12 sm:text-sm"
              />
              <PromptInputFooter className="justify-between py-1 sm:py-2">
                <Leaf className="h-4 w-4 text-sage" aria-hidden />
                <PromptInputSubmit
                  status={status}
                  onStop={() => {
                    void stop();
                    setNotice("Bri’s reply was stopped.");
                  }}
                  disabled={!busy && !draft.trim()}
                  className="bri-mark h-8 w-8 rounded-full text-ivory sm:h-9 sm:w-9"
                  title={busy ? "Stop reply" : "Send question"}
                >
                  {!busy && <ArrowUp />}
                </PromptInputSubmit>
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground sm:mt-2.5 sm:leading-relaxed">
              Bri is an AI assistant for website information only. Please don't share private
              medical details. Bri does not replace professional healthcare advice.
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
