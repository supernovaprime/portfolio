const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting server without MongoDB...');
console.log('📧 Email Configuration:');
console.log('  - EMAIL_USER:', process.env.EMAIL_USER ? '***SET***' : 'NOT SET');
console.log('  - EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : 'NOT SET');
console.log('  - EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('  - EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('  - CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

// Basic middleware
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Contact endpoint for testing email
app.post('/api/contact', (req, res) => {
  console.log('📧 Contact form submission received!');
  console.log('📧 Email logging test - this is where email would be sent');
  res.json({ success: true, message: 'Contact endpoint working!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log('🔗 Test URL: http://localhost:' + PORT + '/api/test');
});
