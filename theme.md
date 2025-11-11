# Claymorphism Design System

## Overview
This document defines the Claymorphism design system for every-website-ai. Claymorphism is a playful design style featuring soft, clay-like 3D elements with a puffy, inflated appearance that creates a tactile, approachable user experience.

## Core Principles

### 1. Soft, Puffy 3D Elements
- Elements should appear inflated and three-dimensional
- Use double shadows (inner and outer) to create depth
- Shadows should be soft and diffused, never harsh

### 2. Clay-like Texture
- Smooth, matte finish
- Organic, rounded shapes
- Subtle variations in color create depth

### 3. Tactile Appearance
- Elements should look touchable and inviting
- Hover states should enhance the 3D effect
- Active/pressed states should appear "pushed in"

## Color Palette

### Light Mode (Default)
```
Background:
  - Primary: #FFF5F0 (Soft warm white)
  - Secondary: #F8E8E0 (Light peach)

Clay Elements:
  - Peach: #FFD4B8 (Primary clay color)
  - Mint: #C8E6C9 (Success/accent)
  - Lavender: #E1BEE7 (Secondary accent)
  - Sky Blue: #B3E5FC (Info)
  - Coral: #FFAB91 (Warning/CTA)

Text:
  - Primary: #5D4037 (Warm brown)
  - Secondary: #8D6E63 (Light brown)
  - Muted: #A1887F (Very light brown)

Shadows:
  - Outer: rgba(93, 64, 55, 0.15)
  - Inner: rgba(255, 255, 255, 0.8)
```

### Dark Mode
```
Background:
  - Primary: #2C2416 (Dark warm brown)
  - Secondary: #3D3426 (Slightly lighter brown)

Clay Elements:
  - Peach: #D4A574 (Muted warm)
  - Mint: #8FAF8F (Muted green)
  - Lavender: #B19CB8 (Muted purple)
  - Sky Blue: #7FA8B8 (Muted blue)
  - Coral: #D49380 (Muted coral)

Text:
  - Primary: #F5E6D3 (Warm cream)
  - Secondary: #D4C4B0 (Light tan)
  - Muted: #B8A896 (Muted tan)

Shadows:
  - Outer: rgba(0, 0, 0, 0.4)
  - Inner: rgba(255, 255, 255, 0.1)
```

## Typography

### Font Stack
Primary: `'Fredoka', 'Nunito', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700 (use sparingly)

### Type Scale
```
Heading 1: 3rem (48px) / 1.2 line-height / 600 weight
Heading 2: 2.25rem (36px) / 1.3 line-height / 600 weight
Heading 3: 1.875rem (30px) / 1.4 line-height / 600 weight
Heading 4: 1.5rem (24px) / 1.4 line-height / 500 weight
Body Large: 1.125rem (18px) / 1.6 line-height / 400 weight
Body: 1rem (16px) / 1.6 line-height / 400 weight
Body Small: 0.875rem (14px) / 1.5 line-height / 400 weight
Caption: 0.75rem (12px) / 1.4 line-height / 500 weight
```

## Border Radius

```
Small: 12px - For tags, badges, small buttons
Medium: 20px - For buttons, inputs, cards
Large: 32px - For large cards, sections
Extra Large: 48px - For hero sections, large containers
Full: 9999px - For pills, circular buttons
```

## Spacing System

Based on 8px grid:
```
2xs: 4px (0.25rem)
xs: 8px (0.5rem)
sm: 12px (0.75rem)
md: 16px (1rem)
lg: 24px (1.5rem)
xl: 32px (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
4xl: 96px (6rem)
```

## Shadow System

### Clay Shadow (Default)
Creates the signature puffy, inflated appearance
```css
box-shadow:
  inset -4px -4px 8px rgba(255, 255, 255, 0.8),
  inset 4px 4px 8px rgba(93, 64, 55, 0.1),
  8px 8px 16px rgba(93, 64, 55, 0.15),
  -4px -4px 12px rgba(255, 255, 255, 0.7);
```

### Clay Shadow Hover (Enhanced depth)
```css
box-shadow:
  inset -5px -5px 10px rgba(255, 255, 255, 0.9),
  inset 5px 5px 10px rgba(93, 64, 55, 0.12),
  12px 12px 24px rgba(93, 64, 55, 0.2),
  -6px -6px 16px rgba(255, 255, 255, 0.8);
```

### Clay Shadow Active (Pressed in)
```css
box-shadow:
  inset 4px 4px 8px rgba(93, 64, 55, 0.2),
  inset -2px -2px 6px rgba(255, 255, 255, 0.5),
  2px 2px 4px rgba(93, 64, 55, 0.1);
```

### Clay Shadow Small (Subtle elements)
```css
box-shadow:
  inset -2px -2px 4px rgba(255, 255, 255, 0.8),
  inset 2px 2px 4px rgba(93, 64, 55, 0.1),
  4px 4px 8px rgba(93, 64, 55, 0.12),
  -2px -2px 6px rgba(255, 255, 255, 0.6);
```

## Component Patterns

### Buttons

**Primary Button (Clay)**
- Background: Peach (#FFD4B8)
- Text: Warm brown (#5D4037)
- Border radius: 20px
- Padding: 12px 24px
- Shadow: Clay shadow default
- Hover: Enhanced clay shadow + slight scale (1.02)
- Active: Pressed shadow + scale (0.98)

**Secondary Button**
- Background: Lavender (#E1BEE7)
- Same shadow and interaction patterns

**Ghost Button**
- Background: Transparent
- Border: 2px solid with clay color
- Shadow: Small clay shadow
- Hover: Fill with color + clay shadow

### Cards

**Standard Card**
- Background: Slightly darker/lighter than page background
- Border radius: 32px
- Padding: 32px
- Shadow: Clay shadow default
- Hover: Enhanced shadow + translate Y(-2px)

**Small Card**
- Border radius: 20px
- Padding: 20px
- Shadow: Clay shadow small

### Forms

**Input Fields**
- Background: White/lighter background
- Border radius: 16px
- Padding: 12px 16px
- Shadow: Inset clay shadow (appears recessed)
- Focus: Add outer glow with primary color

**Textarea**
- Same as input but with min-height
- Border radius: 20px

### Navigation

**Nav Bar**
- Background: Translucent clay background
- Backdrop blur for depth
- Shadow: Clay shadow small
- Sticky positioning with smooth reveal

### Loading States

**Spinner**
- Clay-colored dots or shapes
- Bouncing animation with elastic easing
- Soft shadows follow the movement

**Skeleton**
- Clay background with subtle shine animation
- Rounded corners matching content
- Pulsing opacity for "breathing" effect

### Error States

**Error Card**
- Coral background (#FFAB91)
- Warm warning feel, not harsh red
- Icon with clay shadow
- Rounded container (32px)

### Micro-interactions

**Hover Effects**
- Scale: 1.02 (subtle growth)
- Shadow: Enhanced clay shadow
- Transition: 200ms ease-out

**Active/Press Effects**
- Scale: 0.98 (subtle shrink)
- Shadow: Pressed clay shadow
- Transition: 100ms ease-in

**Focus States**
- Outline: 3px solid accent color
- Outline offset: 4px
- Rounded to match element

## Accessibility

### Contrast Ratios
- All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Clay colors chosen for sufficient contrast with text colors

### Focus Indicators
- Clear focus rings on all interactive elements
- High contrast focus colors
- Minimum 3px focus ring width

### Motion
- Respect `prefers-reduced-motion`
- Disable scaling and shadow transitions
- Keep opacity changes only

## Implementation Notes

### Tailwind CSS Classes

Custom classes to add to globals.css:

```css
.clay-shadow {
  box-shadow:
    inset -4px -4px 8px rgba(255, 255, 255, 0.8),
    inset 4px 4px 8px rgba(93, 64, 55, 0.1),
    8px 8px 16px rgba(93, 64, 55, 0.15),
    -4px -4px 12px rgba(255, 255, 255, 0.7);
}

.clay-shadow-hover {
  box-shadow:
    inset -5px -5px 10px rgba(255, 255, 255, 0.9),
    inset 5px 5px 10px rgba(93, 64, 55, 0.12),
    12px 12px 24px rgba(93, 64, 55, 0.2),
    -6px -6px 16px rgba(255, 255, 255, 0.8);
}

.clay-shadow-active {
  box-shadow:
    inset 4px 4px 8px rgba(93, 64, 55, 0.2),
    inset -2px -2px 6px rgba(255, 255, 255, 0.5),
    2px 2px 4px rgba(93, 64, 55, 0.1);
}

.clay-shadow-sm {
  box-shadow:
    inset -2px -2px 4px rgba(255, 255, 255, 0.8),
    inset 2px 2px 4px rgba(93, 64, 55, 0.1),
    4px 4px 8px rgba(93, 64, 55, 0.12),
    -2px -2px 6px rgba(255, 255, 255, 0.6);
}

.clay-inset {
  box-shadow:
    inset 4px 4px 8px rgba(93, 64, 55, 0.15),
    inset -2px -2px 6px rgba(255, 255, 255, 0.7);
}
```

### Dark Mode Adjustments

For dark mode, shadows need adjustment:
```css
.dark .clay-shadow {
  box-shadow:
    inset -3px -3px 6px rgba(255, 255, 255, 0.1),
    inset 3px 3px 6px rgba(0, 0, 0, 0.3),
    8px 8px 16px rgba(0, 0, 0, 0.4),
    -4px -4px 12px rgba(255, 255, 255, 0.05);
}
```

## Design Checklist

When implementing a new component, ensure:

- [ ] Background uses clay color palette
- [ ] Border radius is 20px minimum (unless small element)
- [ ] Clay shadow applied (appropriate size)
- [ ] Text uses rounded font family
- [ ] Hover state enhances 3D effect
- [ ] Active state shows pressed appearance
- [ ] Focus state is clearly visible
- [ ] Colors meet contrast requirements
- [ ] Animations respect reduced motion preference
- [ ] Component works in both light and dark modes

## Examples

### Hero Section
```tsx
<section className="relative bg-clay-peach clay-shadow rounded-[48px] p-12 md:p-16">
  <h1 className="text-5xl font-semibold text-clay-brown-dark">
    Welcome to Every Website AI
  </h1>
  <p className="text-lg text-clay-brown mt-4">
    Generate any website instantly with AI
  </p>
</section>
```

### Button
```tsx
<button className="
  bg-clay-peach text-clay-brown-dark
  rounded-[20px] px-6 py-3
  clay-shadow
  hover:clay-shadow-hover hover:scale-[1.02]
  active:clay-shadow-active active:scale-[0.98]
  transition-all duration-200
  font-medium
">
  Generate Website
</button>
```

### Card
```tsx
<div className="
  bg-clay-mint clay-shadow
  rounded-[32px] p-8
  hover:clay-shadow-hover hover:-translate-y-0.5
  transition-all duration-200
">
  <h3 className="text-2xl font-semibold text-clay-brown-dark">Card Title</h3>
  <p className="text-clay-brown mt-2">Card content goes here.</p>
</div>
```

---

Last updated: 2025-11-11
Version: 1.0.0
