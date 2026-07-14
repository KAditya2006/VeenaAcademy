# Veena Academy Phase 4 High-Fidelity UI Design System and Screen Blueprint

## 1. Creative Direction

Veena Academy should look like a premium digital education platform: calm, bright, disciplined, trustworthy, and aspirational. The UI should use whitespace, strong typography, polished cards, subtle motion, and authentic academic visuals to communicate parent confidence and student success.

Design references:
- Apple: restraint, spacing, typography, product confidence.
- Stripe: smooth sections, refined gradients, conversion rhythm.
- Linear and Raycast: precision, hierarchy, clean component states.
- Notion and Material 3: approachable structure and accessible controls.

The interface must not feel like a generic coaching template. Avoid loud banners, dense text blocks, random colors, clip-art illustrations, excessive shadows, and decorative motion.

## 2. Layout System

### Breakpoints

| Token | Width | Usage |
| --- | ---: | --- |
| `screen-xs` | 360px | Small mobile |
| `screen-sm` | 480px | Large mobile |
| `screen-md` | 768px | Tablet |
| `screen-lg` | 1024px | Laptop |
| `screen-xl` | 1280px | Desktop |
| `screen-2xl` | 1440px+ | Large desktop |

### Containers

| Token | Value | Usage |
| --- | ---: | --- |
| `container-page` | max 1280px | Main section content |
| `container-reading` | max 760px | Paragraph-heavy sections |
| `container-narrow` | max 960px | FAQs, forms, timelines |
| `container-wide` | max 1440px | Hero and gallery when needed |

Horizontal padding:
- Mobile: 20px
- Tablet: 24px
- Laptop: 32px
- Desktop: 40px

### Grid

Desktop:
- 12-column grid
- 24px gutters
- Hero split: 6 columns copy, 6 columns visual
- Course cards: 3 columns
- Faculty/results: 4 columns

Tablet:
- 8-column grid
- 20px gutters
- Course cards: 2 columns
- Hero stacks copy above visual

Mobile:
- 4-column grid
- 16px gutters
- Cards stack single column unless the content is icon-only

### Vertical Rhythm

Use an 8px base scale.

| Token | Value |
| --- | ---: |
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |
| `space-24` | 96px |
| `space-32` | 128px |

Section padding:
- Desktop: 96px top and bottom
- Laptop: 80px top and bottom
- Tablet: 72px top and bottom
- Mobile: 64px top and bottom

Whitespace rules:
- Keep section headings within 760px readable width.
- Keep body text lines between 55 and 75 characters.
- Never put cards inside cards.
- Use full-width section bands, not floating page sections.

## 3. Design Tokens

### Color Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `color-primary` | `#08265C` | Brand blue, headings, key icons |
| `color-primary-hover` | `#061F4C` | Hover state, dark surfaces |
| `color-primary-light` | `#EAF3FF` | Light section backgrounds |
| `color-secondary` | `#112F6A` | Deep supporting blue |
| `color-accent` | `#FF7A1A` | CTA, highlights |
| `color-accent-hover` | `#F26507` | CTA hover |
| `color-accent-light` | `#FFF0E5` | Accent background |
| `color-success` | `#16A34A` | WhatsApp, success |
| `color-warning` | `#F59E0B` | Notices |
| `color-error` | `#DC2626` | Form errors |
| `color-info` | `#2563EB` | Informational state |
| `color-background` | `#FFFFFF` | Page background |
| `color-surface` | `#F7FBFF` | Alternate section background |
| `color-card` | `#FFFFFF` | Cards and panels |
| `color-border` | `#DBE7F7` | Borders |
| `color-divider` | `#E7EEF8` | Dividers |
| `color-text-primary` | `#0F172A` | Main text |
| `color-text-secondary` | `#475569` | Body text |
| `color-text-muted` | `#64748B` | Metadata |
| `color-text-inverse` | `#FFFFFF` | Dark section text |
| `color-overlay` | `rgba(6,26,63,.56)` | Modal/image overlays |
| `color-glass-bg` | `rgba(255,255,255,.78)` | Nav/floating glass |
| `color-glass-border` | `rgba(8,38,92,.12)` | Glass borders |

### Typography Tokens

Primary display font:
- Instrument Serif
- Use for hero heading, major section headings, CTA headings, display numbers.

UI and body font:
- Inter
- Use for nav, cards, labels, forms, body, buttons, footer.

| Token | Size / Line | Weight | Usage |
| --- | --- | --- | --- |
| `display-xl` | 80 / 88 | 400 | Desktop hero |
| `display-lg` | 64 / 72 | 400 | Large section heading |
| `display-md` | 48 / 56 | 400 | Section heading |
| `display-sm` | 40 / 48 | 400 | Mobile hero/section |
| `heading-lg` | 32 / 40 | 800 | Card-group headings |
| `heading-md` | 24 / 32 | 800 | Card titles |
| `heading-sm` | 20 / 28 | 800 | Small titles |
| `body-lg` | 20 / 32 | 400 | Hero subheading |
| `body-md` | 16 / 28 | 400 | Main body |
| `body-sm` | 14 / 22 | 500 | Metadata |
| `caption` | 12 / 18 | 700 | Badges, labels |

Letter spacing:
- Display headings: 0
- Uppercase labels: 0.16em to 0.20em
- Body text: 0

### Radius Tokens

| Token | Value | Usage |
| --- | ---: | --- |
| `radius-sm` | 8px | Small tags |
| `radius-md` | 12px | Inputs |
| `radius-lg` | 16px | Small cards |
| `radius-xl` | 24px | Main cards |
| `radius-2xl` | 32px | Hero panels, large cards |
| `radius-pill` | 9999px | Buttons, badges |
| `radius-circle` | 50% | Avatars |

### Shadow and Elevation Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `elevation-1` | `0 8px 24px rgba(8,38,92,.08)` | Buttons, small cards |
| `elevation-2` | `0 18px 48px rgba(8,38,92,.12)` | Cards |
| `elevation-3` | `0 24px 80px rgba(8,38,92,.14)` | Hero panels |
| `elevation-4` | `0 36px 110px rgba(8,38,92,.18)` | Modals |
| `glow-accent` | `0 18px 60px rgba(255,122,26,.22)` | Primary CTA |

### Motion Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `duration-fast` | 160ms | Hover states |
| `duration-normal` | 280ms | Buttons/cards |
| `duration-slow` | 520ms | Section reveal |
| `easing-standard` | cubic-bezier(.2,.8,.2,1) | General |
| `easing-spring` | spring, damping 24, stiffness 180 | Hero/card entry |

Motion rules:
- Animate opacity and transform.
- Avoid layout-shifting motion.
- Respect reduced motion.
- Use animation to guide attention, never to decorate.

### Icon Tokens

Use Lucide Icons only.

| Token | Size | Stroke |
| --- | ---: | ---: |
| `icon-sm` | 16px | 2px |
| `icon-md` | 20px | 2px |
| `icon-lg` | 24px | 2px |
| `icon-xl` | 32px | 2px |

## 4. Component Library

### Buttons

Primary button:
- Background: accent
- Text: white
- Radius: pill
- Height: 48px desktop, 46px mobile
- Padding: 24px horizontal
- Shadow: accent glow
- Hover: lift -2px, accent hover, stronger shadow
- Focus: 2px accent outline, 2px offset
- Disabled: 50% opacity, no shadow, no lift
- Loading: spinner left, label remains visible

Secondary button:
- Background: card
- Border: border token
- Text: primary
- Hover: accent-light background, accent border

Outline button:
- Transparent or white background
- Primary border on light surfaces, glass border on dark surfaces

Ghost button:
- Transparent background
- Hover: primary-light
- Use in nav and low-emphasis actions

Icon button:
- 44px square
- Radius: pill or xl depending context
- Icon centered
- Tooltip on desktop for unfamiliar icons

Floating button:
- 56px circle
- Shadow: glow
- WhatsApp uses success token
- Call uses accent token

### Inputs

Text input, select, textarea:
- Height: 48px minimum
- Radius: xl
- Border: border
- Background: card
- Text: text-primary
- Placeholder: text-muted
- Hover: primary border at 25%
- Focus: accent border and visible outline
- Error: error border, helper text below
- Success: success border, optional check icon
- Disabled: surface background, muted text

Textarea:
- Minimum height: 128px
- Resize vertical only if enabled

Search:
- Icon left
- Clear button appears after typing
- Minimum height: 48px

### Cards

Shared card anatomy:
- Radius: 32px
- Border: border
- Background: card or glass
- Shadow: elevation-2
- Padding: 24px mobile, 28px desktop
- Hover: lift -4px, border accent at 30%, shadow elevation-3

Course card:
- Icon tile top
- Title
- Description
- Duration
- Eligibility
- CTA
- Optional active state for selected filter

Faculty card:
- Image 1:1
- Name
- Subject
- Experience
- Qualification
- Optional social link

Topper card:
- Image 4:3
- Achievement badge
- Name
- Score/rank
- Course/exam

Testimonial card:
- Quote icon
- Review text
- Name
- Role
- Parent/student label

Contact card:
- Icon
- Label
- Value
- Action affordance

### Badges and Tags

Badge:
- Radius: pill
- Border: border
- Background: card
- Text: primary
- Uppercase optional only for announcement labels

Course tag:
- Compact pill
- Hover: accent-light
- Active: primary background, white text

### Navigation

Desktop nav:
- Height: 80px
- Sticky top
- Glass background after scroll
- Logo left
- Links center/right
- CTA right

Mobile drawer:
- Opens from top or right
- Background: card
- Links 48px minimum height
- CTA full width
- Close icon button 44px

### Accordion

FAQ item:
- Card container
- Button header 56px minimum
- Chevron rotates 180 degrees
- Content expands with height/opacity transition
- `aria-expanded` required

### Timeline

Desktop:
- Horizontal four-step layout
- Step icon circle
- Connecting progress line
- CTA after final step

Mobile:
- Vertical stepper
- Line left
- Step cards right

### Modal and Lightbox

Use for gallery later.
- Overlay: color-overlay
- Container: card, radius 24px
- Close button top right
- Keyboard Escape closes
- Focus trap required

## 5. Screen-by-Screen UI Specification

### Screen 1: Hero

Purpose:
- Establish brand promise, admission urgency, academic credibility, and immediate conversion.

Layout:
- Desktop: two-column split, copy left, visual right.
- Left column width: 52%.
- Right column width: 48%.
- Hero min height: first viewport minus nav.
- Copy max width: 720px.

Visual hierarchy:
1. Announcement badge
2. Hero heading
3. Subheading
4. CTA group
5. Course tags
6. Visual proof cards/statistics

Components:
- Sticky navbar
- Announcement badge
- H1 in Instrument Serif
- Body subheading in Inter
- Primary, secondary, WhatsApp CTA buttons
- Course tags
- Hero visual with floating cards
- Optional scroll indicator

Background:
- Light background with subtle primary/accent radial gradient.
- No decorative blobs. Use controlled brand gradient only.

Hero image:
- Prefer authentic classroom or student mentoring photography.
- Aspect ratio: 4:3 or 5:4.
- Radius: 32px.
- Shadow: elevation-3.

Floating cards:
- Use glass background.
- Max two cards.
- Suggested cards: Regular Tests, Personal Mentorship.

Motion:
- Badge fades in first.
- Heading fades up.
- CTA group fades up after copy.
- Visual scales from 96% to 100%.
- Floating cards drift in subtly, no looping motion required.

Responsive:
- Tablet/mobile stack text above visual.
- Mobile H1: 44-52px.
- CTA buttons stack full width on small mobile.
- Keep WhatsApp and Call available in sticky bottom actions.

Accessibility:
- H1 is the only page H1.
- Image needs descriptive alt text.
- Buttons have clear labels.

### Screen 2: Trust

Purpose:
- Prove credibility quickly after the hero.

Layout:
- Desktop: six-card grid.
- Tablet: three by two.
- Mobile: two-column compact cards or horizontal snap row.

Card content:
- Icon
- Number or trust label
- Title
- Supporting text

Recommended cards:
- 5000+ Students Guided
- Expert Faculty
- 12+ Years Experience
- Regular Tests
- Library and Transport
- Personal Mentorship

Visual style:
- Light surface section.
- Cards may use subtle glass only if background is tinted.

Hover:
- Lift -3px.
- Icon tile changes to accent background.

Motion:
- Stagger reveal, 60ms between cards.

### Screen 3: Courses

Purpose:
- Help users find the right academic path.

Layout:
- Section heading centered.
- Optional filter row below heading.
- Course grid: 3 columns desktop, 2 tablet, 1 mobile.

Course card:
- Icon tile
- Title
- Description
- Duration
- Eligibility
- CTA: Know More

Filtering:
- Tabs or segmented control: All, School, Competitive, Scholarship.
- Search appears only on full courses page, not necessary on homepage.

Hover:
- Card lift.
- Icon tile turns accent.
- CTA arrow moves 3px right.

Active state:
- Border accent.
- Subtle accent-light background.

Responsive:
- Mobile cards full width.
- Duration and eligibility can stack as small metadata rows.

### Screen 4: Why Choose Us

Purpose:
- Explain the academy’s academic operating system.

Layout:
- Desktop: left narrative column, right feature grid.
- Mobile: heading then stacked feature cards.

Visual storytelling:
- Position this as “how improvement happens.”
- Use features as a system, not isolated claims.

Feature cards:
- Experienced Teachers
- Weekly Tests
- Doubt Sessions
- Smart Classroom
- Study Materials
- Career Guidance
- Library
- Transport

Motion:
- Left text fades in.
- Feature cards reveal in pairs.

Hover:
- Icon color shifts to accent.
- Card border becomes accent at 25%.

### Screen 5: Results

Purpose:
- Show proof of outcomes.

Layout:
- Desktop: one large featured topper card left, result counters and smaller toppers right or below.
- Homepage alternative: counters row, four-card grid.
- Results page: filters by exam and year.

Topper card:
- Photo or initials placeholder
- Achievement badge
- Name
- Score/rank
- Exam/course

Counters:
- Use Instrument Serif numbers.
- Count once when visible.

Hover:
- Reveal small details: batch, course, year.

Responsive:
- Featured card stacks above grid.
- Counters stack on mobile.

### Screen 6: Faculty

Purpose:
- Build human trust.

Layout:
- Four cards desktop.
- Two cards tablet.
- One card mobile.

Card:
- Faculty image 1:1
- Name
- Subject
- Experience
- Qualification
- Optional LinkedIn/social icon

Hover:
- Image gently zooms.
- Subject badge appears or brightens.

Accessibility:
- Teacher image alt: “Faculty member [Name], [Subject] teacher.”

### Screen 7: Facilities

Purpose:
- Show environment, infrastructure, and safety.

Layout:
- Mix icon cards and large photography.
- Facilities page can use alternating image/text rows.

Homepage:
- 3-column card grid.

Facilities page:
- Alternating sections:
  - Image left, text right
  - Text left, image right

Motion:
- Image fades in, text slides slightly.

Visual style:
- Use real photos with soft shadows.
- Avoid overusing icons when photography exists.

### Screen 8: Gallery

Purpose:
- Make the academy feel real.

Layout:
- Masonry grid desktop.
- Two-column tablet.
- One or two-column mobile depending image density.

Filters:
- Classroom
- Events
- Students
- Seminars
- Results

Hover:
- Image zoom 1.04.
- Overlay title fades in.

Lightbox:
- Opens on click.
- Keyboard arrows navigate.
- Escape closes.
- Swipe on mobile.

Performance:
- Lazy load images.
- Use responsive image sizes.

### Screen 9: Testimonials

Purpose:
- Add social proof from students and parents.

Layout:
- Desktop: three cards or slider.
- Mobile: swipe slider.

Types:
- Parent review
- Student review
- Google review
- Video testimonial card

Slider rules:
- Auto-play optional, pause on hover.
- Do not auto-play video.
- Manual controls always visible.

Card:
- Quote
- Name
- Role
- Course/class
- Optional rating stars for Google review.

### Screen 10: Admission Process

Purpose:
- Reduce uncertainty and explain next steps.

Layout:
- Desktop horizontal timeline.
- Mobile vertical timeline.

Steps:
1. Fill Form
2. Counselling
3. Demo Class
4. Admission Confirm

CTA:
- Start Admission Enquiry after final step.

Motion:
- Progress line animates once when section enters view.
- Step cards reveal in order.

### Screen 11: FAQ

Purpose:
- Resolve objections before contact.

Layout:
- Centered accordion max width 760px.
- Search and category filters on dedicated FAQ page.

Categories:
- Admission
- Courses
- Tests
- Transport
- Fees
- Contact

Interaction:
- One item open by default.
- Allow multiple open only on dedicated FAQ page.
- Smooth height and opacity animation.

Keyboard:
- Enter/Space toggles.
- Arrow navigation optional.

### Screen 12: Contact

Purpose:
- Convert high intent into enquiry.

Layout:
- Desktop: form left, contact cards and map right.
- Mobile: quick contact actions first, then form.

Form:
- Student Name
- Class
- Course Interested
- Phone Number
- Message

Contact cards:
- Phone
- WhatsApp
- Address
- Email
- Office Hours
- Emergency Contact if relevant

Map:
- Rounded 32px container.
- Use embedded Google Map once available.

CTA:
- Submit Enquiry
- Call Now
- WhatsApp

Validation:
- Inline errors.
- Success confirmation.
- Loading state on submit.

### Screen 13: Footer

Purpose:
- Provide closure, navigation, and contact backup.

Layout:
- Desktop: 4 columns.
- Mobile: stacked groups.

Content:
- Brand summary
- Quick links
- Course links
- Contact
- Social icons
- Newsletter
- Legal links
- Copyright

Newsletter:
- Optional. Use only if academy plans ongoing communication.

Visual style:
- Dark primary surface is acceptable in footer.
- Text contrast must pass AA.

## 6. Image System

Hero:
- Authentic classroom or mentoring image.
- Aspect ratio: 4:3 or 5:4.
- Avoid dark, blurred, generic stock imagery.

Faculty:
- Square portraits.
- Consistent crop, lighting, and background.

Students/results:
- 4:3 cards.
- Use confident but natural photos.

Gallery:
- Mixed aspect ratios for masonry.
- Recommended ratios: 1:1, 4:3, 3:4, 16:9.

Illustrations:
- Use only if they match premium brand language.
- Prefer real photography for trust sections.

Loading:
- Lazy load all below-the-fold images.
- Use skeleton blocks with same radius as final image.

## 7. Interaction Guide

Button hover:
- Lift -2px.
- Shadow increases.
- Background transitions smoothly.

Card hover:
- Lift -4px.
- Border accent appears.
- Image zoom only when image exists.

Navbar:
- Transparent/glass at top.
- Solid glass with subtle shadow after scroll.
- Mobile drawer locks background scroll.

Forms:
- Focus ring visible.
- Success/error helper text.
- Submit button shows loading.

FAQ:
- Chevron rotates.
- Content expands smoothly.

Gallery:
- Hover overlay on desktop.
- Tap opens lightbox on mobile.

Statistics:
- Count once when visible.

## 8. Responsive Rules by Section

Hero:
- Desktop two columns.
- Tablet/mobile stacked.
- Mobile CTAs full width.

Trust:
- Desktop six cards.
- Tablet three columns.
- Mobile two columns or horizontal snap.

Courses:
- Desktop three columns.
- Tablet two columns.
- Mobile one column.

Why Choose:
- Desktop split layout.
- Mobile stacked cards.

Results:
- Desktop counters plus grid.
- Mobile counters stacked, cards stacked.

Faculty:
- Desktop four columns.
- Tablet two columns.
- Mobile one column.

Facilities:
- Desktop three columns.
- Mobile one column.

Gallery:
- Desktop masonry three columns.
- Tablet two columns.
- Mobile one or two columns.

Testimonials:
- Desktop three cards.
- Mobile slider or one column.

Admission:
- Desktop horizontal timeline.
- Mobile vertical timeline.

FAQ:
- Same accordion, full width mobile.

Contact:
- Desktop two columns.
- Mobile contact actions then form.

Footer:
- Desktop four columns.
- Mobile stacked.

## 9. Layout Diagrams

### Desktop Homepage

```text
NAV: Logo | Links | CTA

HERO:
[Copy 6 cols: badge, H1, subheading, CTAs, tags]
[Visual 6 cols: image/card, floating proof cards]

TRUST:
[Card][Card][Card][Card][Card][Card]

COURSES:
          Heading
      Filter / Tags
[Course][Course][Course]
[Course][Course][Course]
[Course][Course][Course]

WHY:
[Narrative 5 cols] [Feature Grid 7 cols]

RESULTS:
[Counters row]
[Topper][Topper][Topper][Topper]

FACULTY:
[Teacher][Teacher][Teacher][Teacher]

FACILITIES:
[Facility][Facility][Facility]
[Facility][Facility][Facility]

GALLERY:
[Masonry image grid]

TESTIMONIALS:
[Review][Review][Review]

ADMISSION:
[Step 1]---[Step 2]---[Step 3]---[Step 4]

FAQ:
[Accordion max 760px]

CONTACT:
[Form 6 cols] [Contact cards + Map 6 cols]

FOOTER:
[Brand][Links][Courses][Contact]
```

### Mobile Homepage

```text
TOP BAR:
Logo | Menu

BOTTOM CTA:
Call | WhatsApp | Demo

HERO:
Badge
H1
Subheading
CTA full width
Secondary CTAs
Course tags
Visual

TRUST:
2-column compact cards

COURSES:
Single-column cards

WHY:
Stacked feature cards

RESULTS:
Counters stacked
Topper cards stacked

FACULTY:
Teacher cards stacked

FACILITIES:
Cards stacked

GALLERY:
Compact grid

TESTIMONIALS:
Swipe cards

ADMISSION:
Vertical timeline

FAQ:
Accordion

CONTACT:
Contact cards
Form
Map

FOOTER:
Stacked groups
```

## 10. Accessibility Specification

Color:
- Body text must meet WCAG AA.
- Accent orange should not be used for small text on white unless contrast passes.

Keyboard:
- All interactive elements focusable.
- Focus order follows visual order.
- Mobile drawer traps focus while open.

ARIA:
- Nav has `aria-label`.
- Accordion buttons use `aria-expanded`.
- Icon-only buttons have labels.
- Form fields use visible labels.

Touch:
- Minimum target size: 44px.
- Sticky bottom actions must not cover form submit or footer links.

Motion:
- Respect `prefers-reduced-motion`.
- Disable parallax and long transitions for reduced motion.

## 11. Performance Guidelines

- Use optimized responsive images.
- Lazy load gallery, faculty, and testimonial media.
- Keep hero media optimized because it affects first impression.
- Prefer CSS gradients and real images over heavy animation libraries for decoration.
- Avoid autoplay video above the fold.
- Use skeleton loaders for future dynamic content.

## 12. Design QA Checklist

Visual consistency:
- Colors use design tokens.
- Radius is consistent.
- Shadows are subtle.
- Cards align to grid.
- Section spacing follows rhythm.

Typography:
- Hero and section headings use Instrument Serif.
- Body and UI use Inter.
- Line lengths remain readable.
- No negative letter spacing.

Responsive:
- No horizontal scrolling.
- Mobile CTAs are visible and thumb-friendly.
- Cards stack cleanly.
- Text does not overflow buttons or cards.

Accessibility:
- Contrast passes AA.
- Focus states visible.
- Forms have labels.
- Accordions expose state.
- Icon buttons have labels.

Motion:
- Animations are purposeful.
- No looping distraction.
- Reduced motion respected.
- Hover states do not shift layout.

Conversion:
- Hero CTA is visible.
- Book demo appears after key trust sections.
- Call and WhatsApp are persistent.
- Contact form is simple.
- Admission process is clear.

Trust:
- Results are prominent.
- Faculty is easy to evaluate.
- Parent testimonials are present.
- Facilities and safety are visible.
- Contact information is clear.

Professional finish:
- No stock-template clutter.
- No random decorative elements.
- No inconsistent card sizes in the same row unless masonry is intended.
- Dark sections are limited to CTA, timeline, or footer.

## 13. Developer Handoff Notes

Build order:
1. Tokens and global styles
2. Layout primitives
3. Buttons, inputs, badges, cards
4. Navigation and floating CTAs
5. Section components
6. Responsive QA
7. Accessibility QA
8. Motion polish

Developer should not make new visual decisions during implementation. Any missing design decision should be added to this blueprint or the design system before coding.

