# Beyond Pink

BeyondPink — Project Setup & Navigation Bar

1. Project Overview

We are building BeyondPink, a modern, elegant, responsive breast-health awareness campaign website.

Campaign tagline:
“Beyond the Pink Ribbon. Beyond Awareness.”

BeyondPink is an educational and awareness platform primarily serving people in South Africa while welcoming visitors worldwide, regardless of gender.

Our mission is to move beyond traditional breast cancer awareness by encouraging education, understanding, compassion and meaningful support.

The campaign will introduce visitors to Brea, a separate interactive breast-health education and support application that we will build later.

Important Development Instructions

We are building this website incrementally, one section at a time.

For this first implementation:

* Establish the project’s global design system.
* Build the responsive navigation bar.
* Create the basic single-page application structure.
* Do NOT generate the hero section or any other page content yet.
* Do NOT create extra pages, features or sections beyond what is requested.
* Do NOT invent content or replace the supplied logo.
* Keep the code clean, reusable and component-based.

2. Brand Colour Palette

Use these exact colours as our initial design tokens:

Colour	Hex	Purpose
Charcoal Grey	#565656	Primary text and structural elements
Blush Pink	#EED7DA	Soft backgrounds and decorative accents
Rose Pink	#F69ABD	Buttons, highlights and subtle glows
Soft Sage Green	#A8B88A	Secondary accents, borders and hover details
Soft Ivory	#F6F0E8	Main page background

Use an elegant, modern visual style that feels warm, empowering, inclusive and sophisticated.

Pink must NOT dominate the entire website. Balance it with grey, sage and ivory.

Typography

Use a sophisticated combination of:

* An elegant serif font for prominent headings.
* A clean, readable sans-serif font for navigation, buttons and body text.

Choose fonts that work well together and support the planned multilingual interface.

Global Design Rules

* Soft rounded corners
* Subtle shadows
* Spacious, consistent padding
* Smooth, tasteful transitions
* Accessible contrast and visible keyboard focus
* Fully responsive layouts
* Professional appearance on desktop, tablet and mobile
* Respect users’ reduced-motion preferences

3. Navigation Bar

Create a modern, elegant, sticky navigation bar at the top of the website.

Desktop Layout

LEFT: BeyondPink Logo

I am attaching our official BeyondPink SVG logo.

* Use the uploaded SVG as the actual logo.
* Preserve its original proportions, colours and design.
* Do not recreate or modify the logo.
* Make it responsive and crisp.
* Clicking the logo should scroll back to the top of the page.

CENTRE: Navigation Links

Display these five links horizontally:

1. Home
2. About
3. Explore
4. Support
5. Resources

All navigation links will use smooth scrolling to their corresponding sections on the same page.

Use semantic anchor targets:

* Home → #home
* About → #about
* Explore → #explore
* Support → #support
* Resources → #resources

We will build the actual sections individually in later prompts. Do not generate their content now.

Use elegant hover states and an understated active-link indicator.

RIGHT: Actions

Display these elements in a clean horizontal arrangement:

1. Language selector displaying EN with a small dropdown chevron.
2. GitHub icon.
3. Prominent Try Brea button.

The language selector will eventually support translated landing-page content. For now, prepare the selector component with English as the default language. Do not generate incomplete or unverified translations.

The GitHub icon will link to the project’s repository once the URL is provided. Do not invent a URL.

The Try Brea button will eventually open our Brea application. Because Brea has not been built yet, use a small accessible “Brea demo coming soon” dialog as a temporary action instead of linking to a broken page.

Try Brea Button Styling

* Elegant pill-shaped or softly rounded design.
* Rose Pink accent colour.
* Soft, refined outer glow.
* Slightly stronger glow on hover.
* Smooth transitions.
* Optional small arrow icon.
* High readability and accessible contrast.

The glow should feel sophisticated, not like a neon gaming interface.

4. Mobile Navigation

On mobile devices:

* BeyondPink logo on the left.
* Compact Try Brea button.
* Hamburger menu icon on the right.
* No horizontal overflow.

When the hamburger icon is pressed, open a beautifully styled mobile navigation panel containing:

* Home
* About
* Explore
* Support
* Resources
* Language selector
* GitHub icon/link

The mobile menu must:

* Animate smoothly.
* Have a clear close button.
* Close when a navigation item is selected.
* Be keyboard-accessible.
* Support Escape to close.
* Respect reduced-motion preferences.

5. Sticky Navbar Behaviour

* Remain visible at the top while scrolling.
* Use a subtle background and optional light blur.
* Add a delicate shadow or border after scrolling.
* Ensure target sections are not hidden underneath the navbar.
* Smooth scrolling should work once each section is implemented.

6. Single-Page Structure

BeyondPink will ultimately contain these sections, in this order:

1. Hero
2. About
3. Explore
4. Support
5. Resources
6. Meet the Founder
7. Footer

Create the basic component and anchor structure for future development, but leave all future section content unimplemented.

We will provide photographs, illustrations and exact copy individually as we build each section.

A floating AI website assistant will also be added later. Do not implement it yet.

7. Final Requirements for This Step

Please implement ONLY:

* Project foundation
* Global colour palette and typography
* Responsive sticky navbar
* SVG logo integration
* Desktop navigation
* Mobile hamburger navigation
* Language selector UI
* GitHub icon
* Try Brea button with a temporary coming-soon dialog
* Basic empty single-page structure

Do not build the hero or any other content sections yet.

The final result should look polished and intentional, ready for the next step: building the full-width photographic hero carousel.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://beyond-pink.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8d13efcb-523b-4cfe-9c66-734789a28eb0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
