<!-- Example: Team Cards with WhatsApp Numbers -->
<!-- Add data-whatsapp="COUNTRY_CODE+PHONE" to enable WhatsApp button in modal -->

<!-- Example 1: With WhatsApp -->
<article id="member-ibrahim" class="team-card" tabindex="0" data-whatsapp="962791234567">
  <div class="team-card-image">
    <img src="img/team/kayo.jpg" alt="Ibrahim Khwira" />
  </div>
  <div class="team-card-content">
    <h4 data-i18n="team.m1.name">Ibrahim Khwira</h4>
    <p class="team-meta" data-i18n="team.m1.meta">CS — 3rd Year</p>
    <div class="tags">Master of Web Developer • Game Dev</div>
    <a class="btn small" href="https://linkedin.com/in/ibrahim" target="_blank" rel="noopener">
      Connect on LinkedIn
    </a>
  </div>
</article>

<!-- Example 2: Without WhatsApp (WhatsApp button won't show) -->
<article id="member-yazan" class="team-card" tabindex="0">
  <div class="team-card-image">
    <img src="img/team/yzn.jpg" alt="Yazan Al-Mustafa" />
  </div>
  <div class="team-card-content">
    <h4 data-i18n="team.m2.name">Yazan Al-Mustafa</h4>
    <p class="team-meta" data-i18n="team.m2.meta">AI — 3rd Year</p>
    <div class="tags">Master of AI • Cyber Security</div>
    <a class="btn small" href="https://linkedin.com/in/yazan" target="_blank" rel="noopener">
      Connect on LinkedIn
    </a>
  </div>
</article>

<!-- Example 3: Another with WhatsApp -->
<article id="member-aman" class="team-card" tabindex="0" data-whatsapp="962798765432">
  <div class="team-card-image">
    <img src="img/team/aman.jpg" alt="Aman Abu-Haded" />
  </div>
  <div class="team-card-content">
    <h4 data-i18n="team.m3.name">Aman Abu-Haded</h4>
    <p class="team-meta" data-i18n="team.m3.meta">CS — 3rd Year</p>
    <div class="tags">Game Dev • Web Dev</div>
    <a class="btn small" href="https://linkedin.com/in/aman" target="_blank" rel="noopener">
      Connect on LinkedIn
    </a>
  </div>
</article>

---

## 🌍 WhatsApp Number Format by Country

### Middle East

- **Jordan**: `962` + phone number (e.g., `962791234567`)
- **Saudi Arabia**: `966` + phone number
- **UAE**: `971` + phone number
- **Egypt**: `20` + phone number
- **Palestine**: `970` + phone number

### Popular Countries

- **US**: `1` + phone number (e.g., `12025551234`)
- **UK**: `44` + phone number
- **Germany**: `49` + phone number
- **France**: `33` + phone number
- **Canada**: `1` + phone number

### How to Build the Number

1. Take the phone number: `079 1234 567`
2. Remove spaces and leading zeros: `791234567`
3. Add country code: `962` + `791234567` = `962791234567`
4. Use in data attribute: `data-whatsapp="962791234567"`

---

## ⚙️ Implementation Steps

### Step 1: Get WhatsApp Numbers

Ask team members for their WhatsApp phone numbers in international format.

### Step 2: Update HTML Cards

Add `data-whatsapp="NUMBER"` to each `<article class="team-card">` tag:

**Before:**

```html
<article id="member-ibrahim" class="team-card" tabindex="0"></article>
```

**After:**

```html
<article
  id="member-ibrahim"
  class="team-card"
  tabindex="0"
  data-whatsapp="962791234567"
></article>
```

### Step 3: Test

1. Click a card with WhatsApp number → Modal shows both buttons
2. Click a card without WhatsApp → Modal shows only LinkedIn button
3. Click WhatsApp button → Opens WhatsApp chat

---

## 📋 Checklist for All Team Members

Copy this checklist and add WhatsApp data for each member:

- [ ] Ibrahim Khwira - `data-whatsapp="962791234567"`
- [ ] Yazan Al-Mustafa - `data-whatsapp="962798765432"`
- [ ] Aman Abu-Haded - `data-whatsapp="962789123456"`
- [ ] Ayman Al Shwarbeh - `data-whatsapp="962777654321"`
- [ ] Abdaljaleel Al-Naqeez - `data-whatsapp="962779876543"`
- [ ] Ahmad Ghazawi - `data-whatsapp="962781234567"`
- [ ] Mahmoud Al-Mustafa - `data-whatsapp="962785555555"`

---

## 🔗 Result

### Without `data-whatsapp` attribute:

```
┌──────────────────────────┐
│                          │
│    Member Profile        │
│                          │
│   [ LinkedIn Only ]      │
│                          │
└──────────────────────────┘
```

### With `data-whatsapp` attribute:

```
┌──────────────────────────┐
│                          │
│    Member Profile        │
│                          │
│  [ LinkedIn ] [ WhatsApp ]
│                          │
└──────────────────────────┘
```

---

## ✨ Features Enabled

✅ Users can view member profiles  
✅ Users can connect on LinkedIn  
✅ Users can message on WhatsApp (if number provided)  
✅ Modal opens/closes smoothly  
✅ Fully responsive design  
✅ Dark modern UI  
✅ Keyboard accessible

---

## 📞 Tips

- **Always use international format** (no + symbol)
- **Test before deploying** - Click each card to verify
- **Update LinkedIn URLs** - Ensure links are correct
- **Mobile friendly** - WhatsApp opens in mobile app if installed
- **Optional feature** - WhatsApp button only shows if data attribute exists

Enjoy connecting your team members with your users! 🚀
