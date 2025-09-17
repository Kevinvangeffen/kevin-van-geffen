# Email Setup Instructions

To enable the contact form to send emails to kevinvangeffen86@gmail.com, you need to set up environment variables.

## Steps:

1. Create a `.env.local` file in the root directory
2. Add the following variables:

```
EMAIL_USER=kevinvangeffen86@gmail.com
EMAIL_PASS=your-gmail-app-password
```

## Gmail App Password Setup:

1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. At the bottom, click "App passwords"
4. Generate a new app password for "Mail"
5. Use this password (not your regular Gmail password) in the EMAIL_PASS variable

## Security Features:

- Honeypot field to catch spam bots
- Email validation
- Required field validation
- Rate limiting (can be added if needed)

The contact form will send beautifully formatted emails to kevinvangeffen86@gmail.com with the sender's information and message.
