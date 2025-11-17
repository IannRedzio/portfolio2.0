# CLAUDE.md - AI Assistant Guide for Portfolio 2.0

## Project Overview

**Personal portfolio website** for Ian Redzio built with Astro and Tailwind CSS. Single-page application showcasing professional experience, projects, and technical skills. Content is in **Spanish**.

- **Live Site**: https://ianredzio-portfolio.vercel.app/
- **Repository**: https://github.com/IannRedzio/portfolio2.0

## Quick Reference

### Common Commands

```bash
npm run dev      # Start development server (http://localhost:4321)
npm run build    # Build for production (output: dist/)
npm run preview  # Preview production build locally
```

### Project Structure

```
src/
├── pages/index.astro          # Main entry - single page with 5 sections
├── layouts/Layout.astro       # Root layout with theme system
├── components/                 # Reusable Astro components
│   ├── Nav.astro              # Navigation + mobile menu + theme toggle
│   ├── Hero.astro             # Hero section with typewriter effect
│   ├── Experience.astro       # Professional experience grid
│   ├── ExperienceCard.astro   # Individual experience card
│   ├── AboutMe.astro          # Bio section
│   ├── TechStack.astro        # Technology icons display
│   ├── Projects.astro         # Featured projects grid
│   ├── Button.astro           # Reusable button (primary/outline variants)
│   └── TypewriterText.astro   # Animated typing effect
├── icons/                      # SVG icon components
├── styles/global.css          # Global CSS + Tailwind utilities
└── utils/fullpage-navigation.ts  # Smooth scroll navigation logic

public/
├── images/                    # Project screenshots
└── Ian-Redzio-CV-DevFullStack.pdf  # Downloadable CV
```

## Technology Stack

- **Framework**: Astro 5.7.11
- **Styling**: Tailwind CSS 3.4.17
- **Language**: TypeScript
- **Build Tool**: Vite (via Astro)
- **Icons**: Simple Icons 14.14.0

## Key Architectural Patterns

### 1. Full-Page Scrolling Navigation

Custom scroll-snap navigation in `src/utils/fullpage-navigation.ts`:
- Wheel and touch swipe detection
- Prevents default scroll behavior
- Manages section transitions with 800ms cooldown
- **Important**: Does NOT update URL hashes (intentional design choice)

### 2. Theme System (Dark/Light Mode)

Implemented in `src/layouts/Layout.astro` and `src/components/Nav.astro`:
- Stored in `localStorage` as 'theme'
- Falls back to `prefers-color-scheme` system preference
- Defaults to dark mode
- Applied via `dark` class on `<html>` element
- Toggle button in navigation bar

### 3. Component-Based Architecture

- **Astro components** (.astro files) for static rendering
- Props interfaces defined with TypeScript
- Inline `<script>` tags for client-side interactivity
- Scoped CSS within components

## Code Conventions

### File Naming
- **Components**: PascalCase (`ExperienceCard.astro`)
- **Utilities**: kebab-case (`fullpage-navigation.ts`)
- **CSS classes**: kebab-case (`fullpage-section`, `mobile-nav-link`)
- **JavaScript variables**: camelCase (`currentSectionIndex`)

### TypeScript
- Strict configuration (extends `astro/tsconfigs/strict`)
- Interface definitions for all component props
- Type exports for shared interfaces

### Styling Approach
- Tailwind utility classes preferred
- Custom utilities in `global.css` using `@layer utilities`
- CSS custom properties for theme colors
- Responsive design using Tailwind breakpoints + custom media queries

### Important CSS Variables

```css
--color-primary: #0E0E29 (dark mode) / #FFFFFF (light mode)
--color-accent: #3B82F6 (blue)
--color-highlight: #FBBF24 (amber)
--nav-height: 4rem
```

## Common Modification Patterns

### Adding a New Section

1. Create component in `src/components/NewSection.astro`
2. Add section to `src/pages/index.astro`:
```astro
<section id="new-section" class="fullpage-section">
  <div class="content-container">
    <NewSection />
  </div>
</section>
```
3. Update navigation in `src/components/Nav.astro`:
   - Add link to desktop nav
   - Add link to mobile menu
4. Section ID becomes navigation anchor (e.g., `#new-section`)

### Adding a New Project

Edit `src/components/Projects.astro`:
```typescript
const projects: Project[] = [
  // ... existing projects
  {
    title: "Project Name",
    description: "Description here",
    technologies: ["Tech1", "Tech2"],
    liveUrl: "https://...",
    codeUrl: "https://github.com/...",
    imageUrl: "/images/project.png"
  }
];
```

### Adding a New Experience

Edit `src/components/Experience.astro`:
```typescript
const experiences = [
  // ... existing experiences
  {
    title: "Job Title",
    company: "Company Name",
    period: "Month Year - Present",
    description: "Job description...",
    skills: ["Skill1", "Skill2"]
  }
];
```

### Modifying Theme Colors

Update `tailwind.config.mjs`:
```javascript
theme: {
  extend: {
    colors: {
      dark: {
        primary: '#0E0E29',
        // ... other colors
      },
      light: {
        // ... light mode colors
      }
    }
  }
}
```

Also update corresponding CSS variables in `src/styles/global.css`.

## Critical Files

### Must Understand Before Major Changes

1. **`src/utils/fullpage-navigation.ts`** (227 lines)
   - Core navigation logic
   - Event listeners for wheel/touch
   - Section transition management
   - Mobile detection and menu state

2. **`src/components/Nav.astro`** (~340 lines)
   - Complex client-side JavaScript
   - Theme toggle logic
   - Mobile menu with focus trapping
   - Active link highlighting
   - Keyboard accessibility

3. **`src/styles/global.css`** (377 lines)
   - Custom Tailwind utilities
   - Responsive breakpoints
   - Theme-specific styles
   - Accessibility focus states

4. **`tailwind.config.mjs`**
   - Custom color palette
   - Extended breakpoints (xs: 475px)
   - Font configuration

## Testing Considerations

**No testing framework configured**. When testing manually:

1. **Cross-browser**: Check Chrome, Firefox, Safari
2. **Responsive**: Test at 375px, 768px, 1024px+
3. **Theme toggle**: Verify localStorage persistence
4. **Accessibility**: Keyboard navigation, screen reader
5. **Mobile gestures**: Swipe navigation on touch devices
6. **Performance**: Lighthouse audit for Core Web Vitals

## Deployment

- **Platform**: Vercel (automatic deploys from main branch)
- **Build output**: Static files in `dist/`
- **No server-side code**: Pure static site

## Known Patterns and Edge Cases

### URL Hash Behavior
The `fullpage-navigation.ts` intentionally comments out hash updates:
```typescript
// history.pushState({}, '', `#${id}`);  // Commented out
```
This keeps URLs clean but means direct linking to sections won't work.

### Mobile Menu Lock
When mobile menu is open, page scrolling is disabled:
```typescript
if (isMobile && isMenuOpen) return;
```

### Image Fallbacks
Project images have fallback handlers:
```javascript
onerror="this.onerror=null; this.src='...fallback.svg';"
```

### Theme Flash Prevention
Inline script in Layout.astro runs before page render to prevent FOUC:
```javascript
<script is:inline>
  // Runs immediately, not deferred
</script>
```

## Security Considerations

- No user input forms (contact via email/LinkedIn links)
- All content is static/hardcoded
- No API calls or external data fetching
- External links use `target="_blank"` with `rel="noopener noreferrer"`

## Performance Optimizations

- **Lazy loading**: `loading="lazy"` on project images
- **Async decoding**: `decoding="async"` on images
- **Minimal JS**: Only essential client-side code
- **Static generation**: Pre-rendered at build time
- **Tree-shaking**: Astro optimizes bundle size

## Common Issues and Solutions

### Theme Not Persisting
Check `localStorage` access in browser. The theme system requires:
- localStorage availability
- No privacy/incognito restrictions on storage

### Navigation Not Working
Ensure `fullpage-navigation.ts` is initialized:
```typescript
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});
```

### Mobile Menu Not Closing
Check `isMenuOpen` state synchronization in Nav.astro's inline script.

### Tailwind Classes Not Applied
Run `npm run build` to regenerate CSS. Purge might exclude dynamically constructed classes.

## Git Workflow

- Main branch for production
- Feature branches prefixed appropriately
- Commit messages in English, descriptive
- PRs merged through GitHub

## Language Note

**Content is in Spanish** but:
- Code and comments are primarily English
- Variable names are English
- Configuration files are English
- Some inline comments may be Spanish

## Future Extensibility Points

1. **CMS Integration**: Projects/Experience arrays ready for external data
2. **Blog Section**: Could add markdown support via Astro
3. **Contact Form**: Would require backend service
4. **i18n**: Structure supports adding language files
5. **Analytics**: Can add tracking scripts to Layout.astro

## Quick Debugging

### Check Active Section
```javascript
// In browser console
document.querySelectorAll('.fullpage-section')[currentSectionIndex]
```

### Check Theme State
```javascript
localStorage.getItem('theme')
document.documentElement.classList.contains('dark')
```

### Check Mobile Detection
```javascript
window.innerWidth < 768 // Mobile breakpoint
```

---

## Summary for AI Assistants

When working on this codebase:
1. **Prefer editing existing files** over creating new ones
2. **Follow Tailwind utility-first** approach for styling
3. **Maintain TypeScript type safety** in all modifications
4. **Test responsive behavior** at key breakpoints
5. **Preserve accessibility features** (focus states, ARIA labels)
6. **Keep content in Spanish** unless instructed otherwise
7. **Use consistent naming conventions** as described above
8. **Consider full-page navigation implications** when adding sections
