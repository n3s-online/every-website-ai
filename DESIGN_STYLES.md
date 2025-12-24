# Design Styles Documentation

This project now supports **four different design styles** that can be applied to any page or component. Each style provides a unique visual aesthetic while maintaining consistency and usability.

## Available Design Styles

### 1. Neobrutalism (Default)
**Class:** No class needed (default)

**Characteristics:**
- Sharp corners (0px border radius)
- Bold, thick borders (4px solid black/white)
- Hard drop shadows with no blur
- Vibrant color palette (yellow, pink, blue, green)
- Uppercase, bold typography
- High contrast and playful aesthetic

**Colors:**
- Primary: Bright Yellow `#fde047`
- Secondary: Hot Pink `#f472b6`
- Accent: Blue `#60a5fa`
- Additional: Green `#4ade80`, Red `#f87171`

**Usage Example:**
```html
<!-- Default style, no class needed -->
<div class="border-4 border-black shadow-brutal bg-yellow-300 p-6">
  <h2 class="font-black uppercase">Neobrutalism Card</h2>
</div>
```

---

### 2. Clean Minimalism with Bold Typography
**Class:** `.style-minimalism`

**Characteristics:**
- Clean, simple layouts with minimal elements
- Bold typography as focal point
- Ample white space
- Rounded corners (8px)
- Subtle shadows with blur
- Monochromatic color palette (grays, whites, blacks)
- Thin, subtle borders (1px)
- Modern and professional look

**Colors:**
- Background: Off-white `oklch(0.99 0 0)`
- Foreground: Dark gray `oklch(0.15 0 0)`
- Primary: Dark gray `oklch(0.2 0 0)`
- Borders: Light gray `oklch(0.9 0 0)`

**Usage Example:**
```html
<div class="style-minimalism">
  <div class="border-4 border-black shadow-brutal bg-white p-8">
    <h1 class="text-4xl font-black mb-4">Bold Headline</h1>
    <p class="text-lg">Clean, minimalist content with lots of breathing room.</p>
  </div>
</div>
```

**Key Features:**
- Shadows automatically convert from hard "brutal" to soft, subtle blur
- Borders automatically thin to 1px for elegance
- Typography remains bold for impact
- Perfect for professional SaaS, portfolios, and content-focused sites

---

### 3. Modern Flat Design with Vibrant Colors
**Class:** `.style-flat`

**Characteristics:**
- Flat appearance with no shadows
- Darker backgrounds for contrast
- Vibrant accent colors (green, red, light blue)
- Strategic use of limited color palette
- Emphasis on clarity and CTAs
- Slightly rounded corners (6px)
- No borders on most elements

**Colors:**
- Background: Dark blue-gray `oklch(0.25 0.02 265)`
- Primary: Vibrant Green `oklch(0.65 0.19 145)`
- Secondary: Vibrant Red `oklch(0.62 0.24 25)`
- Accent: Light Blue `oklch(0.7 0.13 240)`

**Usage Example:**
```html
<div class="style-flat">
  <div class="shadow-brutal bg-card p-6"> <!-- Shadow will be removed -->
    <h2 class="text-2xl font-bold text-primary">Flat Design Header</h2>
    <p class="text-foreground">Clean, flat aesthetic with vibrant accents.</p>
    <button class="bg-primary text-white px-6 py-3">Call to Action</button>
  </div>
</div>
```

**Key Features:**
- ALL shadows automatically removed for true flat design
- Hover states use brightness changes instead of shadows
- Perfect for modern web apps, dashboards, and tools
- Dark theme by default with light text

---

### 4. Bento Grid Layouts
**Class:** `.style-bento`

**Characteristics:**
- Tile-based, grid-inspired layouts
- Customizable box sizes for emphasis
- Medium rounded corners (12px)
- Soft, subtle shadows
- Organized, sleek presentation
- Light backgrounds with colorful tile options
- Perfect for diverse content types

**Colors:**
- Background: Light gray `oklch(0.97 0 0)`
- Primary: Deep Blue `oklch(0.45 0.14 255)`
- Secondary: Purple `oklch(0.55 0.18 295)`
- Accent: Teal `oklch(0.6 0.13 195)`
- Tile colors: Light blue, green, orange, purple variants

**Usage Example:**
```html
<div class="style-bento">
  <!-- Simple grid -->
  <div class="bento-grid">
    <div class="bento-tile">
      <h3 class="font-bold mb-2">Standard Tile</h3>
      <p>Regular content goes here.</p>
    </div>
    <div class="bento-tile bento-tile-large">
      <h3 class="font-bold mb-2">Wide Tile</h3>
      <p>Spans 2 columns for emphasis.</p>
    </div>
    <div class="bento-tile bento-tile-tall">
      <h3 class="font-bold mb-2">Tall Tile</h3>
      <p>Spans 2 rows vertically.</p>
    </div>
    <div class="bento-tile bento-tile-feature bento-tile-1">
      <h2 class="text-2xl font-black mb-4">Feature Tile</h2>
      <p>Large 2x2 tile with light blue background.</p>
    </div>
  </div>
</div>
```

**Utility Classes:**

Grid Layout:
- `.bento-grid` - Responsive grid container
- `.bento-tile` - Basic tile with hover effect

Size Variations:
- `.bento-tile-large` - Spans 2 columns
- `.bento-tile-tall` - Spans 2 rows
- `.bento-tile-feature` - Spans 2x2 (feature tile)

Color Variations:
- `.bento-tile-1` - Light blue
- `.bento-tile-2` - Light green
- `.bento-tile-3` - Light orange
- `.bento-tile-4` - Light purple

---

## How to Apply Styles

### 1. Wrapping a Section
Apply the style class to a wrapper element:

```html
<section class="style-minimalism">
  <!-- All children inherit minimalism styles -->
  <div class="border-4 shadow-brutal">Content</div>
</section>
```

### 2. Whole Page
Apply to the root layout or body:

```html
<body class="style-flat">
  <!-- Entire page uses flat design -->
</body>
```

### 3. Component-Level
Apply to individual components:

```html
<div class="style-bento">
  <div class="bento-grid">
    <!-- Bento grid layout -->
  </div>
</div>
```

---

## Dark Mode Support

All styles include dark mode variants:

```html
<div class="style-minimalism dark">
  <!-- Minimalism with dark mode -->
</div>
```

Dark mode automatically adjusts:
- Background and foreground colors
- Shadow intensities
- Border colors
- Text contrast

---

## Mixing Styles (Advanced)

You can mix styles within the same page:

```html
<div>
  <!-- Neobrutalism header -->
  <header class="bg-yellow-300 border-4 border-black shadow-brutal">
    <h1 class="font-black uppercase">Site Title</h1>
  </header>

  <!-- Minimalist main content -->
  <main class="style-minimalism">
    <article class="border-4 shadow-brutal bg-white">
      <!-- Automatically gets minimalist styling -->
    </article>
  </main>

  <!-- Bento footer -->
  <footer class="style-bento">
    <div class="bento-grid">
      <div class="bento-tile">Footer content</div>
    </div>
  </footer>
</div>
```

---

## CSS Variables Reference

Each style overrides these CSS variables:

| Variable | Neobrutalism | Minimalism | Flat | Bento |
|----------|-------------|------------|------|-------|
| `--radius` | 0rem | 0.5rem | 0.375rem | 0.75rem |
| `--background` | White | Off-white | Dark blue-gray | Light gray |
| `--foreground` | Black | Dark gray | Light gray | Dark gray |
| Border width | 4px | 1px | 0px | 1px |
| Shadows | Hard, no blur | Soft blur | None | Soft blur |

---

## Best Practices

### Clean Minimalism
- Use bold typography (font-black, font-bold)
- Maximize white space
- Keep color usage minimal
- Focus on content hierarchy

### Modern Flat
- Use vibrant colors strategically for CTAs
- Avoid shadows entirely
- Rely on color contrast for depth
- Keep layouts clean and organized

### Bento Grid
- Vary tile sizes for visual interest
- Use `.bento-tile-feature` for important content
- Apply color variants to differentiate sections
- Maintain consistent spacing

---

## Browser Support

All styles use modern CSS features:
- CSS Custom Properties (CSS Variables)
- OKLch color format
- CSS Grid (for Bento)
- Tailwind CSS 4

Supported browsers:
- Chrome/Edge 111+
- Firefox 113+
- Safari 16.4+

---

## Examples in Production

**Neobrutalism:**
- Playful apps
- Creative portfolios
- Youth-oriented products

**Clean Minimalism:**
- Dropbox, Ghost, Copilot
- Professional SaaS
- Content platforms

**Modern Flat:**
- Web dashboards
- Admin panels
- Modern web tools

**Bento Grid:**
- Linear, Traf
- Feature showcase pages
- Content aggregators
- Portfolio sites

---

## Migration Guide

### From Neobrutalism to Minimalism

```diff
- <div class="border-4 border-black shadow-brutal bg-yellow-300">
+ <div class="style-minimalism border-4 shadow-brutal bg-white">
```

The `border-4` and `shadow-brutal` classes automatically adapt to minimalist styling!

### From Neobrutalism to Flat

```diff
- <div class="border-4 border-black shadow-brutal bg-pink-400">
+ <div class="style-flat border-4 shadow-brutal bg-primary">
```

Borders and shadows are automatically removed in flat design.

### From Any Style to Bento

```diff
- <div class="grid grid-cols-3 gap-4">
-   <div class="border-4 shadow-brutal">Content</div>
- </div>
+ <div class="style-bento bento-grid">
+   <div class="bento-tile">Content</div>
+ </div>
```

---

## Contributing

When adding new styles:
1. Define CSS variables in globals.css
2. Override shadow utilities in @layer utilities
3. Override border utilities if needed
4. Include both light and dark mode variants
5. Document the style in this file

---

## Questions?

For more information about the design system, see:
- `theme.md` - Neobrutalism design system guide
- `src/app/globals.css` - CSS implementation
- Component examples in `src/components/`
