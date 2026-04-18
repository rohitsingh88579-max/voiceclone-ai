# Design Brief: Voice Cloning AI System

## Purpose & Context
Audio-first AI tool for voice cloning and synthesis. Users record or upload voice samples, clone voices via ElevenLabs, and generate TTS in cloned voices. Emotional context: precision, control, technical capability.

## Tone & Aesthetic
Brutalist minimalism meets precision tech. Deep charcoal dark mode as hero. Audio waveforms and voice states are visual centerpieces, not decoration. Sharp geometry (0px corners) for structure, soft 12px for interactive zones.

## Color Palette

| Token | OKLCH Value | Purpose |
|-------|-------------|---------|
| Background | 0.08 0 0 | Deep charcoal UI base, near-black for focus |
| Foreground | 0.93 0 0 | Light neutral text on dark backgrounds |
| Primary | 0.62 0.21 262 | Electric indigo/cyan—voice states, active indicators |
| Accent | 0.6 0.24 244 | Blue accent—waveform highlights, CTA emphasis |
| Card | 0.12 0 0 | Slightly elevated cards for content zones |
| Border | 0.25 0 0 | Subtle dividers, low-contrast structure |
| Destructive | 0.63 0.25 16 | Alert red for error/delete actions |

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Geist Mono | Headers, labels, UI chrome—technical precision |
| Body | DM Sans | Form inputs, descriptions, body text—legible, friendly |
| Mono | JetBrains Mono | Status badges, recording timers, code-like data |

## Shape Language
- Borders: 0px (sharp brutalist) for major zones; 12px (soft) for buttons, cards, inputs
- Shadows: elevated (dark mode appropriate), glow effect on active voice indicators
- Spacing: dense vertical rhythm; 8px base unit

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | bg-card border-b border-border | Title + user menu, fixed top |
| Recording Panel | bg-card with ring-accent | Microphone input, waveform, timer |
| Voice Library | grid layout, bg-background | Voice cards with actions (play, delete, clone) |
| Synthesis Interface | bg-card vertical stack | Text input, voice selector, stability/style sliders |
| Footer | bg-sidebar border-t | Status bar, processing indicators |

## Component Patterns
- **Voice Card**: bg-card, rounded-md, border-border, action buttons in primary. Shows voice name, duration, creation date.
- **Recording Indicator**: animated ring-accent, mono timer font, pulse animation on active record.
- **Waveform Visualization**: cyan accent color, geometric sharp lines, 2-3 pixel width bars.
- **Button Hierarchy**: Primary (bg-primary, text-primary-foreground), Secondary (bg-muted, text-muted-foreground), Tertiary (text only).

## Motion & Micro-interactions
- Record start: waveform pulse-accent animation (2s smooth loop)
- Clone progress: indeterminate progress bar with primary color
- Voice selection: ring-accent appears, smooth 300ms transition
- Hover states: text-accent, shadow-elevated on cards

## Differentiation
Audio-first visual metaphors. Waveform is the hero UI element—shown during recording, cloning, and synthesis. Microphone icon prominence. Voice state badges (Recording, Processing, Cloned, Ready). Every action has acoustic/visual feedback metaphor.

## Constraints
- No gradients or generic glow effects
- No rainbow palettes
- Minimize transparency; rely on solid OKLCH colors
- Waveforms rendered as sharp geometric SVG lines
- All animations sub-500ms for snappy interaction feel
