# Neobrutalism Design Theme

## Overview
This project uses **Neobrutalism** - a bold, unapologetic design style featuring thick borders, hard shadows, and high-contrast colors. The aesthetic is playful, energetic, and deliberately raw.

## Core Principles

### 1. Bold Borders
- **Thickness**: 4px black borders on all major UI elements
- **Color**: Pure black (#000000)
- **Application**: Cards, buttons, inputs, containers, images

### 2. Hard Shadows
- **Style**: Offset shadows with NO blur
- **Pattern**: `4px 4px 0 0 rgba(0, 0, 0, 1)` for standard elements
- **Larger elements**: `6px 6px 0 0 rgba(0, 0, 0, 1)` or `8px 8px 0 0 rgba(0, 0, 0, 1)`
- **No gradients** in shadows - pure hard edges

### 3. Sharp Corners
- **Border radius**: 0px (sharp) or minimal (max 2px)
- **No rounded corners** on primary elements
- Exceptions only for small UI details where necessary

### 4. High Contrast Typography
- **Font weights**:
  - Headings: 900 (Black)
  - Subheadings: 700-800 (Bold/Extra Bold)
  - Body: 400-600 (Regular/Medium)
- **Text transform**: UPPERCASE for emphasis on headings and buttons
- **Font family**: Sans-serif system fonts (Inter, -apple-system, system-ui)
- **Letter spacing**: Tight (-0.02em to -0.05em for headings)

### 5. Vibrant Color Palette

#### Primary Colors
- **Yellow**: `#fde047` (Bright Yellow) - Primary brand color
- **Pink**: `#f472b6` (Hot Pink) - Accent color
- **Black**: `#000000` - Borders, text, shadows
- **White**: `#ffffff` - Backgrounds, contrast text

#### Secondary Colors
- **Blue**: `#60a5fa` - Links, info states
- **Green**: `#4ade80` - Success states
- **Red**: `#f87171` - Error/warning states
- **Orange**: `#fb923c` - Alert states

#### Neutral Grays
- **Gray 950**: `#0a0a0a` - Darkest backgrounds
- **Gray 900**: `#171717` - Dark backgrounds
- **Gray 100**: `#f5f5f5` - Light backgrounds
- **Gray 200**: `#e5e5e5` - Subtle borders

## Component Styling Guide

### Buttons
```tsx
// Primary Button
className="bg-yellow-300 text-black font-black uppercase px-6 py-3 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"

// Secondary Button (Outlined)
className="bg-white text-black font-bold uppercase px-6 py-3 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-gray-100 transition-colors"

// Accent Button (Pink)
className="bg-pink-400 text-white font-black uppercase px-6 py-3 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
```

### Cards
```tsx
className="bg-white border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] p-6"
```

### Input Fields
```tsx
className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:border-black focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-medium"
```

### Containers
```tsx
// Section background
className="bg-yellow-300 border-4 border-black p-8"

// Alternating sections
className="bg-pink-400 border-4 border-black p-8"
className="bg-blue-400 border-4 border-black p-8"
```

### Links
```tsx
className="text-blue-500 font-bold underline decoration-4 underline-offset-4 hover:text-blue-600"
```

### Icons
- Stroke width: 2.5-3 (bolder than default)
- Sizes: 24px, 32px, 48px (avoid odd sizes)
- Style: Match the playful, geometric aesthetic

## Layout Guidelines

### Spacing
- **Generous padding**: Use `p-6`, `p-8`, `p-12` for breathing room
- **Gap spacing**: `gap-4`, `gap-6`, `gap-8` for grid/flex layouts
- **Section spacing**: `my-12`, `my-16`, `my-24` between major sections

### Grid Systems
- **Cards**: 3-column grid on desktop, 1-column on mobile
- **Responsive breakpoints**: Standard Tailwind (sm, md, lg, xl)
- **Grid gaps**: Generous spacing with `gap-6` or `gap-8`

### Maximum Widths
- **Content containers**: `max-w-6xl` or `max-w-7xl`
- **Text content**: `max-w-2xl` or `max-w-3xl`
- **Full-width sections**: Allowed for visual impact

## Animation & Interactions

### Hover States
- **Buttons**: Reduce shadow and translate element
  ```css
  hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]
  hover:translate-x-[2px]
  hover:translate-y-[2px]
  ```
- **Cards**: Subtle lift or border color change
- **Links**: Underline thickness increase or color shift

### Active States
- **Buttons**: Remove shadow completely, translate fully
  ```css
  active:shadow-none
  active:translate-x-1
  active:translate-y-1
  ```

### Transitions
- **Duration**: Fast and snappy - `transition-all` or `duration-150`
- **Easing**: Default or `ease-in-out`
- **Avoid**: Slow, smooth transitions (not neobrutalist)

### Loading States
- **Style**: Geometric, bold animations
- **Avoid**: Subtle spinners - use bold, chunky indicators

## Accessibility

### Color Contrast
- **Text on yellow**: Use black text (AAA compliant)
- **Text on pink**: Use white or black depending on shade
- **Text on white**: Use black text
- **Links**: Maintain 4.5:1 contrast ratio minimum

### Focus States
- **Outline**: Thick black outline (4px)
- **Offset**: 2px offset for visibility
- **Shadow**: Add hard shadow on focus
  ```css
  focus:outline-4 focus:outline-black focus:outline-offset-2
  ```

### Interactive Elements
- **Minimum size**: 44x44px touch target
- **Clear affordances**: Borders and shadows make clickability obvious

## Dark Mode Considerations

While Neobrutalism traditionally uses light backgrounds, a dark mode variant can be implemented:

### Dark Mode Palette
- **Background**: `#0a0a0a` or `#171717`
- **Foreground**: White or yellow
- **Borders**: White (4px)
- **Shadows**: White hard shadows (inverted)
  ```css
  dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]
  ```
- **Accent colors**: Maintain vibrant yellow, pink, blue

## Implementation Notes

### Tailwind CSS Setup
This theme uses Tailwind CSS 4 with CSS custom properties in `globals.css`:
- Color variables defined in OKLch format
- Border radius set to 0px or minimal
- Shadow utilities configured for hard shadows
- Custom utility classes for neobrutalist patterns

### Component Library
Built with:
- **shadcn/ui** - Base components (heavily customized)
- **Radix UI** - Accessible primitives
- **Lucide React** - Icon system

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for shadow/border not needed (well-supported)
- Test on mobile devices for touch interactions

## Examples from the App

### Homepage Hero
- Yellow background (`bg-yellow-300`)
- Black heading text with font-black weight
- White card with thick black border
- Hard shadow on input field

### Loading States
- Geometric spinner with black borders
- Bold "LOADING" text in uppercase
- High-contrast color scheme

### Error Pages
- Red background for destructive states
- White card with black border
- Bold error messages in uppercase

### Success States
- Green background for confirmations
- Playful checkmark icons
- Energetic, positive messaging

## Best Practices

1. **Consistency**: Use the same border thickness (4px) throughout
2. **Hierarchy**: Use size, weight, and color for visual hierarchy
3. **White space**: Don't be afraid of generous spacing
4. **Contrast**: Always ensure text is readable
5. **Playfulness**: Embrace the bold, fun aesthetic
6. **Performance**: Avoid over-animating - keep it snappy
7. **Responsiveness**: Maintain the style across all screen sizes

## Resources

- **Design inspiration**: [neobrutalism.design](https://neobrutalism.design)
- **Color tool**: [Coolors.co](https://coolors.co)
- **Tailwind docs**: [tailwindcss.com](https://tailwindcss.com)
- **Accessibility**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Last Updated**: 2025-11-11
**Design System Version**: 1.0.0
