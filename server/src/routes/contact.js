const express = require('express');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');
const { protect, admin } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email transporter setup with comprehensive Gmail authentication fix
const createTransporter = () => {
  console.log('🔧 Setting up email transporter with config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 3) + '***' : 'not set',
    pass: process.env.EMAIL_PASS ? '***SET***' : 'not set',
    contactEmail: process.env.CONTACT_EMAIL,
    emailHostSet: !!process.env.EMAIL_HOST,
    emailPortSet: !!process.env.EMAIL_PORT,
    emailUserSet: !!process.env.EMAIL_USER,
    emailPassSet: !!process.env.EMAIL_PASS,
    contactEmailSet: !!process.env.CONTACT_EMAIL
  });

  // Gmail-specific configuration with multiple fallback options
  const isGmail = process.env.EMAIL_HOST?.includes('gmail.com') || !process.env.EMAIL_HOST;
  
  // Primary Gmail configuration
  const transporterConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates
    },
    debug: true, // Show debug output
    logger: true, // Log information to console
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 15000, // 15 seconds
    socketTimeout: 15000 // 15 seconds
  };

  // Gmail-specific optimizations for better reliability
  if (isGmail) {
    transporterConfig.requireTLS = true; // Gmail requires TLS
    transporterConfig.pool = false; // Disable pooling for better debugging
    transporterConfig.auth = {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    };
    
    // Additional Gmail-specific settings
    transporterConfig.auth.type = 'LOGIN'; // Explicitly set AUTH type
    transporterConfig.disableFileAccess = true;
    transporterConfig.disableUrlAccess = true;
  }

  console.log('📧 Using transporter config:', {
    host: transporterConfig.host,
    port: transporterConfig.port,
    secure: transporterConfig.secure,
    requireTLS: transporterConfig.requireTLS,
    authType: transporterConfig.auth.type,
    isGmail: isGmail
  });

  const transporter = nodemailer.createTransport(transporterConfig);
  
  // Add error event listeners for better debugging
  transporter.on('idle', () => {
    console.log('📧 Transporter is idle and ready to send emails');
  });
  
  transporter.on('error', (error) => {
    console.error('📧 Transporter error:', error);
  });

  return transporter;
};

// Fallback email transporter for Gmail with alternative configuration
const createFallbackTransporter = () => {
  console.log('🔄 Creating fallback Gmail transporter...');
  
  const fallbackConfig = {
    host: 'smtp.gmail.com',
    port: 465, // Try SSL port
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    debug: true,
    logger: true,
    connectionTimeout: 30000,
    greetingTimeout: 15000,
    socketTimeout: 15000
  };

  console.log('📧 Using fallback config:', {
    host: fallbackConfig.host,
    port: fallbackConfig.port,
    secure: fallbackConfig.secure,
    protocol: 'SSL'
  });

  return nodemailer.createTransport(fallbackConfig);
};

// Verify email configuration with fallback support
const verifyEmailConfig = async () => {
  console.log('🔍 Verifying email configuration...');
  console.log('📧 Environment variables check:', {
    EMAIL_HOST: process.env.EMAIL_HOST || 'not set',
    EMAIL_PORT: process.env.EMAIL_PORT || 'not set',
    EMAIL_USER: process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 3)}***` : 'not set',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
    CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'not set'
  });

  // Try primary transporter first
  try {
    console.log('🔄 Trying primary transporter...');
    const transporter = createTransporter();
    const verification = await transporter.verify();
    console.log('✅ Primary email server connection verified successfully:', verification);
    return { success: true, transporter: 'primary' };
  } catch (primaryError) {
    console.error('❌ Primary transporter verification failed:', primaryError.message);
    
    // Try fallback transporter
    try {
      console.log('🔄 Trying fallback transporter...');
      const fallbackTransporter = createFallbackTransporter();
      const verification = await fallbackTransporter.verify();
      console.log('✅ Fallback email server connection verified successfully:', verification);
      return { success: true, transporter: 'fallback' };
    } catch (fallbackError) {
      console.error('❌ Fallback transporter verification failed:', fallbackError.message);
      
      // Detailed error analysis
      console.error('🔍 Primary error details:', {
        name: primaryError.name,
        message: primaryError.message,
        code: primaryError.code,
        command: primaryError.command,
        response: primaryError.response,
        responseCode: primaryError.responseCode
      });
      
      console.error('🔍 Fallback error details:', {
        name: fallbackError.name,
        message: fallbackError.message,
        code: fallbackError.code,
        command: fallbackError.command,
        response: fallbackError.response,
        responseCode: fallbackError.responseCode
      });
      
      // Gmail-specific troubleshooting
      if (primaryError.code === 'EAUTH' || fallbackError.code === 'EAUTH') {
        console.error('🔧 Gmail Authentication Error - SOLUTION:');
        console.error('   1. Go to: https://myaccount.google.com/security');
        console.error('   2. Enable 2-Factor Authentication');
        console.error('   3. Go to: https://myaccount.google.com/apppasswords');
        console.error('   4. Select "Mail" on "Select app" dropdown');
        console.error('   5. Select "Other (Custom name)" and enter "Portfolio Contact"');
        console.error('   6. Copy the 16-character password (no spaces)');
        console.error('   7. Update EMAIL_PASS in your .env file with this password');
      }
      
      if (primaryError.code === 'ECONNECTION' || fallbackError.code === 'ECONNECTION') {
        console.error('🔧 Connection Error - SOLUTION:');
        console.error('   1. Check internet connectivity');
        console.error('   2. Disable firewall/antivirus temporarily');
        console.error('   3. Try different network (mobile hotspot)');
        console.error('   4. Contact your ISP about SMTP blocking');
      }
      
      return { success: false, error: primaryError };
    }
  }
};

// @route   POST /api/contact
// @desc    Send contact message
// @access  Public
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('subject').trim().isLength({ min: 1, max: 100 }).withMessage('Subject must be between 1 and 100 characters'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors.array()
      });
    }

    const { name, email, subject, message, priority = 'medium' } = req.body;

    // Create message in database
    const messageDoc = await Message.create({
      name,
      email,
      subject,
      message,
      priority
    });

    // Send email notification with enhanced debugging and fallback support
    console.log('📧 Attempting to send email notification...');
    let emailSent = false;
    let emailError = null;
    let transporterUsed = 'none';

    try {
      // Skip email verification due to Railway network restrictions
      // Use primary transporter directly
      const transporter = createTransporter();
      console.log('📧 Using primary transporter (verification skipped due to Railway network restrictions)');
      
      transporterUsed = 'primary';
      console.log(`📧 Using ${transporterUsed} transporter for sending email`);
      
      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
        subject: `📬 New Contact Message: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Message</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #666; }
              .priority { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
              .priority.high { background: #ffebee; color: #c62828; }
              .priority.medium { background: #fff3e0; color: #ef6c00; }
              .priority.low { background: #e8f5e8; color: #2e7d32; }
              .message { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📬 New Contact Message</h2>
                <p>You've received a new message from your portfolio website!</p>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">From:</span> ${name} &lt;${email}&gt;
                </div>
                <div class="field">
                  <span class="label">Subject:</span> ${subject}
                </div>
                <div class="field">
                  <span class="label">Priority:</span> 
                  <span class="priority ${priority}">${priority.toUpperCase()}</span>
                </div>
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="message">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>Sent at: ${new Date().toLocaleString()}</p>
                  <p>Message ID: ${messageDoc._id}</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      };

      console.log('📨 Sending email with options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
      });

      console.log('📨 Attempting to send email...');
      const result = await transporter.sendMail(mailOptions);
      console.log('✅ Email notification sent successfully!');
      console.log('📧 Email details:', {
        messageId: result.messageId,
        response: result.response,
        accepted: result.accepted,
        rejected: result.rejected,
        pending: result.pending,
        envelope: result.envelope,
        transporterUsed: transporterUsed
      });
      emailSent = true;
    } catch (emailError) {
      console.error('❌ Email notification failed:', emailError);
      console.error('🔍 Email error details:', {
        name: emailError.name,
        message: emailError.message,
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode,
        stack: emailError.stack
      });
      
      // Specific Gmail error handling
      if (emailError.code === 'EAUTH') {
        console.error('🔧 Gmail Authentication Error - Check:');
        console.error('   1. 2-Factor Authentication is enabled on your Google account');
        console.error('   2. You are using an App Password (not your regular password)');
        console.error('   3. App Password is generated correctly: https://myaccount.google.com/apppasswords');
        console.error('   4. Email address in EMAIL_USER matches your Google account');
      }
      
      if (emailError.code === 'ECONNECTION') {
        console.error('🔧 Connection Error - Check:');
        console.error('   1. Internet connectivity');
        console.error('   2. Firewall/antivirus blocking port 587');
        console.error('   3. Gmail SMTP server is accessible');
        console.error('   4. Try using port 465 with secure: true');
      }
      
      emailError = emailError;
      // Don't fail the request if email fails, but log it thoroughly
    }

    const responseData = {
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        messageId: messageDoc._id,
        emailSent: emailSent,
        emailError: emailError ? emailError.message : null
      }
    };

    console.log('📋 Contact form submission completed:', {
      messageId: messageDoc._id,
      emailSent: emailSent,
      hasEmailError: !!emailError
    });

    res.status(201).json(responseData);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while sending message'
    });
  }
});

// @route   GET /api/contact/messages
// @desc    Get all contact messages
// @access  Private (Admin only)
router.get('/messages', protect, admin, async (req, res) => {
  try {
    const { 
      status, 
      priority, 
      page = 1, 
      limit = 20,
      sort = 'createdAt' 
    } = req.query;

    // Build query
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (priority && priority !== 'all') {
      query.priority = priority;
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'name':
        sortObj = { name: 1 };
        break;
      case 'subject':
        sortObj = { subject: 1 };
        break;
      default:
        sortObj = { priority: -1, createdAt: -1 };
    }

    // Execute query with pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const messages = await Message.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    const total = await Message.countDocuments(query);

    // Get counts for dashboard
    const statusCounts = await Message.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const priorityCounts = await Message.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        messages,
        pagination: {
          current: pageNum,
          pages: Math.ceil(total / limitNum),
          total,
          limit: limitNum
        },
        stats: {
          statusCounts: statusCounts.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          priorityCounts: priorityCounts.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {})
        }
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching messages'
    });
  }
});

// @route   GET /api/contact/messages/:id
// @desc    Get single contact message
// @access  Private (Admin only)
router.get('/messages/:id', protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        message
      }
    });
  } catch (error) {
    console.error('Get message error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching message'
    });
  }
});

// @route   PUT /api/contact/messages/:id
// @desc    Update message status
// @access  Private (Admin only)
router.put('/messages/:id', protect, admin, [
  body('status').isIn(['unread', 'read', 'replied']).withMessage('Invalid status')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors.array()
      });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message status updated successfully',
      data: {
        message
      }
    });
  } catch (error) {
    console.error('Update message error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating message'
    });
  }
});

// @route   DELETE /api/contact/messages/:id
// @desc    Delete contact message
// @access  Private (Admin only)
router.delete('/messages/:id', protect, admin, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting message'
    });
  }
});

// @route   POST /api/contact/test-email
// @desc    Test email configuration
// @access  Private (Admin only) - for testing purposes
router.post('/test-email', protect, admin, async (req, res) => {
  console.log('🧪 Testing email configuration...');
  
  try {
    const isEmailConfigValid = await verifyEmailConfig();
    
    if (!isEmailConfigValid) {
      return res.status(400).json({
        success: false,
        message: 'Email configuration is invalid',
        config: {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          user: process.env.EMAIL_USER ? '***SET***' : 'NOT SET',
          pass: process.env.EMAIL_PASS ? '***SET***' : 'NOT SET',
          contactEmail: process.env.CONTACT_EMAIL
        }
      });
    }

    const transporter = createTransporter();
    
    const testMailOptions = {
      from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: '🧪 Email Configuration Test',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Email Test</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .success { color: #4CAF50; }
            .test-info { background: #f0f0f0; padding: 15px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h2 class="success">✅ Email Configuration Test Successful!</h2>
          <div class="test-info">
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
            <p><strong>To:</strong> ${process.env.CONTACT_EMAIL || process.env.EMAIL_USER}</p>
            <p><strong>SMTP Host:</strong> ${process.env.EMAIL_HOST}</p>
            <p><strong>SMTP Port:</strong> ${process.env.EMAIL_PORT}</p>
          </div>
          <p>Your email system is working correctly! 🎉</p>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(testMailOptions);
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Test email details:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    });

    res.status(200).json({
      success: true,
      message: 'Test email sent successfully!',
      data: {
        messageId: result.messageId,
        sentTo: testMailOptions.to,
        sentAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).json({
      success: false,
      message: 'Test email failed',
      error: error.message,
      config: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER ? '***SET***' : 'NOT SET',
        pass: process.env.EMAIL_PASS ? '***SET***' : 'NOT SET',
        contactEmail: process.env.CONTACT_EMAIL
      }
    });
  }
});

// @route   GET /api/contact/diagnose
// @desc    Diagnose email configuration issues
// @access  Public (for testing)
router.get('/diagnose', async (req, res) => {
  console.log('🔍 Running email diagnostics...');
  
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      EMAIL_HOST: process.env.EMAIL_HOST || 'NOT SET',
      EMAIL_PORT: process.env.EMAIL_PORT || 'NOT SET',
      EMAIL_USER: process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 3)}***` : 'NOT SET',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
      CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT SET'
    },
    tests: {
      environmentVariables: false,
      transporterCreation: false,
      connectionVerification: false,
      emailSending: false
    },
    errors: [],
    recommendations: []
  };

  // Test 1: Check environment variables
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    diagnostics.tests.environmentVariables = true;
    console.log('✅ Environment variables check passed');
  } else {
    diagnostics.errors.push('EMAIL_USER or EMAIL_PASS not set');
    diagnostics.recommendations.push('Set EMAIL_USER and EMAIL_PASS in your .env file');
    console.log('❌ Environment variables check failed');
  }

  // Test 2: Create transporter
  try {
    const transporter = createTransporter();
    diagnostics.tests.transporterCreation = true;
    console.log('✅ Transporter creation successful');
    
    // Test 3: Verify connection
    try {
      await transporter.verify();
      diagnostics.tests.connectionVerification = true;
      console.log('✅ Connection verification successful');
      
      // Test 4: Send test email
      try {
        const testMailOptions = {
          from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
          to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
          subject: '🧪 Email Diagnostic Test',
          text: `This is a diagnostic test email sent at ${new Date().toLocaleString()}`,
          html: `
            <h2>🧪 Email Diagnostic Test</h2>
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Status:</strong> <span style="color: green;">✅ SUCCESS</span></p>
            <p>Your email system is working correctly!</p>
          `
        };
        
        const result = await transporter.sendMail(testMailOptions);
        diagnostics.tests.emailSending = true;
        diagnostics.emailResult = {
          messageId: result.messageId,
          response: result.response,
          accepted: result.accepted,
          rejected: result.rejected
        };
        console.log('✅ Test email sent successfully');
        
      } catch (emailError) {
        diagnostics.errors.push(`Email sending failed: ${emailError.message}`);
        diagnostics.recommendations.push('Check Gmail App Password configuration');
        console.log('❌ Email sending test failed:', emailError.message);
      }
      
    } catch (verifyError) {
      diagnostics.errors.push(`Connection verification failed: ${verifyError.message}`);
      diagnostics.recommendations.push('Check SMTP credentials and network connectivity');
      console.log('❌ Connection verification failed:', verifyError.message);
    }
    
  } catch (transportError) {
    diagnostics.errors.push(`Transporter creation failed: ${transportError.message}`);
    diagnostics.recommendations.push('Check nodemailer configuration');
    console.log('❌ Transporter creation failed:', transportError.message);
  }

  // Generate recommendations based on common Gmail issues
  if (process.env.EMAIL_HOST?.includes('gmail.com') || !process.env.EMAIL_HOST) {
    diagnostics.recommendations.push('For Gmail: Enable 2-Factor Authentication');
    diagnostics.recommendations.push('For Gmail: Use an App Password (not regular password)');
    diagnostics.recommendations.push('For Gmail: Generate App Password at: https://myaccount.google.com/apppasswords');
  }

  const allTestsPassed = Object.values(diagnostics.tests).every(test => test === true);
  
  res.status(200).json({
    success: allTestsPassed,
    message: allTestsPassed ? 'All email tests passed! 🎉' : 'Some email tests failed. Check diagnostics.',
    diagnostics: diagnostics
  });
});

module.exports = router;
