# OrigamiVault — Encrypted Paper Storage

**Offline. Secure. Printable. Recoverable.**

OrigamiVault is a tiny web app for encrypting sensitive data and storing it on paper using QR codes or OCR-friendly printed code.
Nothing is uploaded or stored online. Everything runs locally in your browser.

👉 **Live app:** https://origamivault.github.io/origamivault/

![1116](https://github.com/user-attachments/assets/8a6c070e-3a5e-44d9-9110-1770f3de021c)

👉 **Video Demo:** https://www.youtube.com/watch?v=zzQkq5Qjri8

Perfect for backing up **master passwords**, **crypto private keys**, **2FA seeds**, **recovery phrases**, and **emergency access information**.

### Codebase mirrors

👉 **GitHub:** https://github.com/origamivault/origamivault

👉 **GitLab mirror:** https://gitlab.com/origamivault/origamivault

---

## ✨ Why OrigamiVault?

Digital storage fails. Password managers break. Hard drives die. Cloud accounts lock you out.

Paper lasts for decades.

OrigamiVault lets you:

- Create **encrypted**, durable paper backups
- Store them safely in a drawer, safe, or envelope
- Share the password + location with someone trusted (digital legacy)
- Restore using nothing but a browser — even years later
- Fork this repository, turn on GitHub Pages hosting (deploy via `main` branch) and make it 100% yours

Simple. Durable. Open-source.

---

## 🚀 How It Works

1. **Encrypt**  
   Enter your secret and a password. OrigamiVault encrypts it using AES-GCM.

2. **Print**  
   Choose between:

   - **Encrypted QR code**, or
   - **OCR-friendly JavaScript snippet**  
     (contains the encrypted payload + tiny decryption logic)

3. **Store**  
   Keep the printed page somewhere safe.

4. **Decrypt**
   - Scan the QR code **or**
   - OCR the JS snippet and paste it in a browser  
     Then enter your password to reveal the original message.

Everything runs locally. No servers involved.

---

## 🧾 Dual Backup Format: QR Code + OCR-Friendly Text

OrigamiVault gives you **two independent long-term recovery methods**, designed for durability and future-proofing.

### 1. Encrypted QR Code

- Fast to scan with any phone
- Compact and easy to print
- Works offline

### 2. Printable JavaScript Decryption Snippet

OrigamiVault also prints a **self-contained JS snippet**, including:

- The encrypted payload
- A minimal decryption function
- Instructions for restoring your secret

This means your data stays recoverable even if:

- QR scanners stop working
- The print is damaged
- Cameras can’t capture the code cleanly
- Future technology changes formats

### OCR-Optimized Typography

The printed snippet uses **Azeret Mono**, one of the most OCR-accurate monospaced fonts, chosen because:

- Characters are highly distinguishable
- OCR engines read it with minimal error
- Glyph ambiguity is minimized (0/O, l/1, etc.)
- Prints crisply on low-quality printers

This ensures that even **decades from now**, your encrypted backup remains readable and decryptable.

---

## 🛡 Security Overview

- AES-GCM 128-bit encryption
- Key derived with PBKDF2 (SHA-256)
- Zero data leaves your device
- No analytics, no tracking, no back-end
- Fully usable offline via JavaScript snippet (or save `decrypt.html`)
- Open-source and auditable

OrigamiVault **never** sends or stores your secrets anywhere.

---

## 📦 Features

- 🔒 Strong client-side encryption
- 📄 Printable QR and OCR backups
- 📱 Built-in QR code scanner
- 💻 Works completely offline
- 🧩 Pure HTML/CSS/JavaScript
- 🔁 Redundant mirrors on GitHub & GitLab
- 🪶 Ideal for emergency kits and digital legacy planning

---

## 📘 Quick Start

### Encrypt a Message

1. Open OrigamiVault
2. Enter your secret
3. Choose a strong password
4. Select QR code or JS snippet output
5. Save or print the result

### Decrypt a Message

**QR code:**

1. Open OrigamiVault
2. Click **Start QR Scanner**
3. Scan the code
4. Enter your password

**Printed JS snippet:**

1. OCR-scan the code
2. Paste the snippet into your browser console
3. Enter your password
4. Decrypt offline

You can save the entire app locally:

**File → Save Page As…**

This ensures decryption works even if GitHub and GitLab are offline.

---

## 🧱 Technologies Used

- Web Crypto API (AES-GCM + PBKDF2)
- QRCode.js
- html5-qrcode
- Azeret Mono for OCR reliability
- Fully offline architecture

---

## 📝 License

MIT License — free to use, modify, and redistribute.

---

## Contributors

[@knagode](https://github.com/knagode)
[@Dalewn](https://github.com/Dalewn)
[@shollyethan](https://github.com/shollyethan)
[@selfhst](https://github.com/selfhst)
