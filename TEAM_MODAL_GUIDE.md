# Team Member Modal - Implementation Guide

## ✅ Features Implemented

### 1. **Modal Popup System**

- Click any team card to open a profile details modal
- Smooth zoom + fade animations
- Dark modern UI matching your site design
- Fully responsive (mobile, tablet, desktop)

### 2. **Modal Content Display**

- Member image (from card)
- Name (from `<h4>`)
- Meta information (from `.team-meta`, e.g., "CS — 3rd Year")
- Skills/description (from `.tags`)
- LinkedIn button (auto-populated from card link)
- WhatsApp button (conditional - only if data-whatsapp attribute exists)

### 3. **Close Functionality**

- Click the × button
- Click outside the modal
- Press Escape key
- All methods properly restore page scroll

### 4. **Keyboard & Accessibility**

- Tab navigation support
- Enter/Space to open modal from card
- ARIA labels for screen readers
- Focus management

---

## 📌 How to Add WhatsApp Button to a Team Card

### Step 1: Add `data-whatsapp` attribute to the card

```html
<article
  id="member-ibrahim"
  class="team-card"
  tabindex="0"
  data-whatsapp="962791234567"
>
  <div class="team-card-image">
    <img src="img/team/kayo.jpg" alt="Ibrahim Khwira" />
  </div>
  <div class="team-card-content">
    <h4 data-i18n="team.m1.name">Ibrahim Khwira</h4>
    <p class="team-meta" data-i18n="team.m1.meta">CS — 3rd Year</p>
    <div class="tags">Master of Web Developer • Game Dev</div>
    <a
      class="btn small"
      href="https://linkedin.com/in/..."
      target="_blank"
      rel="noopener"
    >
      Connect on LinkedIn
    </a>
  </div>
</article>
```

### Step 2: Format the WhatsApp Number

Use international format WITHOUT the "+" symbol:

- Jordan: `962791234567` (not +962791234567)
- US: `12025551234`
- UK: `441632960000`

### Result:

When a user clicks the card:

1. Modal opens with member profile
2. **LinkedIn button appears** (always)
3. **WhatsApp button appears** (only because `data-whatsapp` is present)
4. Clicking WhatsApp opens: `https://wa.me/962791234567`

---

## 🎨 Modal Styling Overview

### Colors & Theme

- Uses your site's dark theme variables (--bg, --surface, --accent, etc.)
- LinkedIn button: Blue accent color
- WhatsApp button: Green (#25d366)

### Animation

- Entry: Smooth zoom scale + fade (cubic-bezier easing)
- Hover effects on buttons with lift and glow

### Responsive Design

- Desktop: Side-by-side button layout
- Mobile: Stacked button layout with full width

---

## 📂 Files Added/Modified

### New Files:

1. **`js/team-modal.js`** - Modal logic and event handlers

### Modified Files:

1. **`ourTeam.html`** - Added modal HTML structure
2. **`css/style.css`** - Added 250+ lines of modal CSS
3. **`ourTeam.html`** - Added script reference at bottom

---

## 🔍 HTML Structure (Already Added)

The modal is added before the footer:

```html
<!-- Team Member Modal -->
<div id="team-member-modal" class="modal-overlay" aria-hidden="true">
  <div class="modal-content team-modal">
    <button class="modal-close" aria-label="Close modal">×</button>

    <div class="modal-body">
      <div class="modal-image-wrapper">
        <img id="modal-member-image" src="" alt="Team member" />
      </div>

      <div class="modal-info">
        <h2 id="modal-title" class="modal-member-name"></h2>
        <p class="modal-member-meta"></p>
        <p class="modal-member-description"></p>

        <div class="modal-actions">
          <a
            id="modal-linkedin-btn"
            class="btn btn-primary"
            href="#"
            target="_blank"
          >
            <!-- LinkedIn SVG icon + text -->
          </a>
          <a
            id="modal-whatsapp-btn"
            class="btn btn-whatsapp"
            href="#"
            target="_blank"
          >
            <!-- WhatsApp SVG icon + text -->
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 💻 JavaScript Logic (Already Added)

The `team-modal.js` file:

1. **Queries all `.team-card` elements**
2. **On click**, extracts:

   - `<h4>` text → member name
   - `.team-meta` text → job title/year
   - `.tags` text → skills
   - `.team-card-image img` → profile image
   - `.btn` href → LinkedIn URL
   - `data-whatsapp` attribute → WhatsApp number

3. **Populates modal** with extracted data
4. **Shows/hides WhatsApp button** based on `data-whatsapp` presence
5. **Handles all close events** (button, outside click, Escape)

---

## ✨ Quick Start Checklist

- [x] Modal HTML added to `ourTeam.html`
- [x] CSS styling added to `css/style.css`
- [x] JavaScript logic added to `js/team-modal.js`
- [x] Script reference added to `ourTeam.html`

**Next Step:** Add `data-whatsapp="XXXXXXXXXXXX"` to any team card to enable WhatsApp button!

Example:

```html
<article class="team-card" data-whatsapp="962791234567">...</article>
```

---

## 🐛 Troubleshooting

| Issue                       | Solution                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------ |
| Modal doesn't open          | Check browser console for errors; verify `.team-card` elements exist                 |
| WhatsApp button not showing | Ensure `data-whatsapp` attribute is on the `<article>` tag, not child elements       |
| Links don't work            | Verify LinkedIn URL is valid; WhatsApp format should be country code + number (no +) |
| Styling looks off           | Clear browser cache; check that `style.css` saved correctly                          |

---

## 🎯 Features Summary

✅ Click team card → Modal opens  
✅ Displays all member info dynamically  
✅ LinkedIn button always visible  
✅ WhatsApp button shows only if `data-whatsapp` present  
✅ Smooth animations & transitions  
✅ Fully responsive design  
✅ Keyboard accessible (Tab, Enter, Escape)  
✅ Dark modern UI  
✅ No changes to existing card structure

Enjoy! 🎉
