const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  authStrategy: new LocalAuth()
});

let qrCodeString = '';

client.on('qr', qr => {
  qrCodeString = qr;
  console.log('🔄 QR CODE READY');
});

client.on('ready', () => {
  console.log('✅ WhatsApp Bot Ready');
});

client.initialize();

app.get('/', (req, res) => {
  if (qrCodeString) {
    qrcode.toDataURL(qrCodeString, (err, url) => {
      res.send(`<img src="${url}"><p>Scan QR to link WhatsApp</p>`);
    });
  } else {
    res.send('✅ Already linked or loading...');
  }
});

app.listen(port, () => {
  console.log(`🌐 Server running at http://localhost:${port}`);
});
