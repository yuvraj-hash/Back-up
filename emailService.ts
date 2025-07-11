// Email service utility for sending emails
// In a real application, this would integrate with services like SendGrid, Mailgun, or AWS SES

interface EmailData {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, you would make an API call to your email service
    // Example with fetch to your backend:
    /*
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return true;
    */
    
    // For demo purposes, we'll just log the email data
    console.log('Email Service - Sending email:', {
      to: emailData.to,
      subject: emailData.subject,
      from: emailData.from || 'noreply@arenahub.com',
      timestamp: new Date().toISOString(),
      body: emailData.body
    });
    
    // Simulate successful email sending
    return true;
  } catch (error) {
    console.error('Email Service Error:', error);
    return false;
  }
};

export const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
  const emailData: EmailData = {
    to: email,
    subject: 'ArenaHub Admin - Password Reset Request',
    from: 'admin@arenahub.com',
    body: `
      Dear Admin,
      
      You have requested a password reset for your ArenaHub admin account.
      
      For security reasons, please contact the system administrator to reset your password.
      
      If you did not request this password reset, please ignore this email and contact support immediately.
      
      Security Information:
      - Request Time: ${new Date().toLocaleString()}
      - IP Address: [System will log actual IP]
      - User Agent: [System will log actual browser info]
      
      Best regards,
      ArenaHub Security Team
      
      ---
      This is an automated message. Please do not reply to this email.
      For support, contact: support@arenahub.com
    `
  };
  
  return await sendEmail(emailData);
};

export const sendNewAdminNotification = async (newAdminData: { username: string; email: string }): Promise<boolean> => {
  const emailData: EmailData = {
    to: 'yuva.tvm2001@gmail.com', // Main admin email
    subject: 'ArenaHub - New Admin Account Created',
    from: 'system@arenahub.com',
    body: `
      Dear System Administrator,
      
      A new admin account has been created in the ArenaHub system.
      
      New Admin Details:
      - Username: ${newAdminData.username}
      - Email: ${newAdminData.email}
      - Created: ${new Date().toLocaleString()}
      
      Please verify this account creation was authorized.
      
      Best regards,
      ArenaHub System
      
      ---
      This is an automated system notification.
    `
  };
  
  return await sendEmail(emailData);
};