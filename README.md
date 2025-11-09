# Secret QR code generator with encryption and decription mechanism

[A simple web app](https://declegacy.github.io/secretqr/) to encrypt text messages and share them securely via QR codes.

https://declegacy.github.io/secretqr/

## How It Works

1. **Encrypt**: Enter your secret message and a password to generate an encrypted QR code
2. **Share**: Share the QR code image with anyone
3. **Decrypt**: Scan the QR code with your phone camera and enter the password to reveal the message

## Features

- 🔒 AES-256 encryption for secure messaging
- 📱 QR code generation and scanning
- 🚀 No server required - runs entirely in the browser
- 🔐 Password-protected decryption

## Usage

Simply open `index.html` in your web browser or visit the live app at: https://declegacy.github.io/secretqr/

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
