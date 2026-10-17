# BeyondPink 🎀 | Brea 🌿

> **Beyond the Pink Ribbon. Beyond Awareness.**

BeyondPink is a breast-health awareness campaign that welcomes everyone, regardless of gender. It introduces **Brea** (pronounced *Bree-ah*), an interactive breast-health learning, support and care-discovery experience created for **SheBuilds by Lovable — Season 04 (2026)**.

**BeyondPink raises awareness. Brea helps people turn that awareness into understanding, support and a next step.**

**Live experience:** [beyond-pink.lovable.app](https://beyond-pink.lovable.app/) · **Guided tour:** [How Brea Works](https://beyond-pink.lovable.app/how-brea-works) · **Try Brea:** [Launch demo](https://beyond-pink.lovable.app/brea)

> **Educational demonstration — not a medical device.** This project does not diagnose symptoms, interpret individual results, offer medical treatment, or replace qualified healthcare professionals.

## Why we built it

Breast health matters beyond October. BeyondPink aims to make reliable information easier to approach, encourage compassion, and keep the conversation going year-round. Its primary focus is South Africa, while the educational content welcomes visitors internationally.

## Two connected experiences

### BeyondPink — the awareness campaign

- A responsive landing page with sections covering awareness, education, support, trusted resources and the founder story.
- Campaign content in **English, isiZulu, isiXhosa, Sesotho and Afrikaans**.
- Interactive educational previews and **Bri**, a friendly AI companion that answers general questions in English. Bri also supports optional browser speech input and read-aloud controls.
- A visual **How Brea Works** introduction before entering the application.

### Brea — the interactive app

| Pathway | What visitors can explore |
| --- | --- |
| **Learn About Breast Health** | The **Learning Garden**: five lessons covering anatomy, hormones, cancer, breast cancer, and mammograms/ultrasound; interactive illustrations, optional quizzes and educational badges. |
| **Understand Breast Changes** | Awareness-focused explanations of changes worth discussing with a healthcare professional, an interactive breast-quadrant lesson and accessible research summaries. |
| **Find Support** | Before/During/After guidance, advice for people supporting someone, and **The Brea Garden**, a fictional browser-local community demonstration. |
| **Find Care** | A searchable South African facility and support-directory experience with an interactive map and source links. Details must be confirmed with providers. |

**MedDecode** provides plain-language explanations of medical terms in the learning experience. Optional onboarding personalises the demo; **Restart Demo** clears saved demonstration progress. Educational badges indicate learning activity, never health status.

## Demo routes

| Route | Experience |
| --- | --- |
| `/` | BeyondPink landing page |
| `/how-brea-works` | Illustrated introduction |
| `/brea` | Brea onboarding |
| `/brea/home` | Brea dashboard |
| `/brea/learn` | Learning Garden |
| `/brea/breast-changes` | Breast-awareness pathway |
| `/brea/support` | Support pathways |
| `/brea/support/community` | The Brea Garden demo |
| `/brea/find-care` | Find Care directory |

Additional nested routes contain individual lessons and support experiences.

## Technology

- **React 19, TypeScript, TanStack Start / TanStack Router**
- **Vite, Tailwind CSS, Radix UI and Lucide icons**
- **Leaflet and OpenStreetMap** for the Find Care map
- **Lovable** for iterative AI-assisted development and deployment
- **Supabase-related configuration and tooling** included in the codebase
- **Vitest and ESLint** for automated tests and linting
- **Bri:** server-side AI route through the Lovable AI gateway; API credentials are not intended for client-side exposure

## Local development

The repository includes a `bun.lock` lockfile. Install [Bun](https://bun.sh/) and run:

```bash
git clone https://github.com/beko-1enkosi/beyond-pink.git
cd beyond-pink
bun install
bun run dev
```

Useful commands:

```bash
bun run test       # Vitest test suite
bun run lint       # ESLint
bun run build      # Production build
bun run preview    # Preview the production build
```

The deployed AI companion and any hosted integrations may require environment variables or secrets configured in the Lovable environment. **Never commit private API keys, service-role keys or other credentials.** Review tracked environment configuration before publishing this repository.

## Responsible demo boundaries

- **Medical:** Educational information only. New, persistent or concerning breast changes should be assessed by a qualified healthcare professional.
- **Community:** Sample posts are fictional; demo interactions are browser-local, not a live support forum or a production moderation service.
- **Care directory:** Listings, phone numbers and service details may change. Confirm directly with the provider; there is no live booking or facility-availability guarantee.
- **Privacy:** The demonstration is not a secure patient-record system. Visitors should avoid entering sensitive personal health information into Bri or the demo.
- **AI:** Bri offers general educational information and conversation; it is not a clinician or emergency service.

## Build approach

Created iteratively for the **Health & Wellness** category of **SheBuilds by Lovable Season 04**: plan one screen, build it, test on desktop/mobile, collect feedback and refine. The project is intentionally a working **prototype**, not a production clinical service.

## Project status

Interactive demonstration implemented. Final checks cover responsiveness, keyboard and motion accessibility, link behaviour, translations, research citations and South African care-directory accuracy.

## Credits

Created by **Thobeka Nkosi**. Built with [Lovable](https://lovable.dev/) for SheBuilds Season 04.

*Your breast health companion. A safe space to learn, explore and feel supported.*
