// Simple test script to verify email configuration
// Run with: node test-email.js

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('Testing email configuration...');
  
  // Check if environment variables are loaded
  const requiredVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASSWORD', 'EMAIL_FROM'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars);
    return;
  }
  
  console.log('✅ All environment variables loaded');
  console.log('📧 Host:', process.env.EMAIL_HOST);
  console.log('📧 Port:', process.env.EMAIL_PORT);
  console.log('📧 From:', process.env.EMAIL_FROM);
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send test email
    const testEmail = {
      from: process.env.EMAIL_FROM,
      to: 'kevinvangeffen86@gmail.com',
      subject: 'Test Email from Portfolio Contact Form',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the contact form configuration.</p>
        <p>If you receive this, the email setup is working correctly!</p>
      `,
    };

    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
  }
}

testEmail();
