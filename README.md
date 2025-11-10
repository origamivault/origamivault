# QR code generator for your secrets

[A simple web app](https://declegacy.github.io/origamivault/) to encrypt & decrypt text messages and share them securely via QR codes.

## How It Works

1. **Encrypt**: Enter your secret message and a password to generate an encrypted QR code
2. **Share**: Share the QR code image with anyone
3. **Decrypt**: Scan the QR code with your phone camera and enter the password to reveal the message

## Features

- 🔒 AES-256 encryption for secure messaging
- 📱 QR code generation and scanning
- 🚀 No server required - runs entirely in the browser
- 🔐 Password-protected decryption

## Redundancy

This app is mirrored across multiple platforms for reliability:
- **GitHub**: https://github.com/declegacy/origamivault
- **GitLab**: https://gitlab.com/declegacy/origamivault

You can also save the app locally (Ctrl+S or Cmd+S) to decrypt content even when both platforms are offline.

## Usage

Simply open `index.html` in your web browser or visit the live app at: https://declegacy.github.io/origamivault/

### Encrypt a Message

1. Open the encrypt page
2. Enter your message
3. Choose a strong password
4. Click "Encrypt & Generate QR Code"
5. Share the generated QR code

### Decrypt a Message

1. Open the decrypt page
2. Click "Start QR Code Scanner"
3. Scan the encrypted QR code
4. Enter the password
5. View your decrypted message

## Technologies

- CryptoJS for AES encryption
- QRCode.js for QR code generation
- html5-qrcode for camera scanning
- Pure HTML, CSS, and JavaScript

## License

MIT License - feel free to use and modify as needed.
