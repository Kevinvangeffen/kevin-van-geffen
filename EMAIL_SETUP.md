# Email Setup Instructions

To enable the contact form to send emails to kevinvangeffen86@gmail.com using your business email, you need to set up environment variables.

## Steps:

1. Create a `.env.local` file in the root directory
2. Add the following variables:

```
EMAIL_HOST=moose.mxrouting.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=info@mainstreamtravel.io
EMAIL_PASSWORD=Lev3cgLBFtxEB5XwNQyA
EMAIL_FROM=info@mainstreamtravel.io
```

## MX Route Configuration:

- **Host**: moose.mxrouting.net
- **Port**: 587 (SMTP with STARTTLS)
- **Security**: false (uses STARTTLS, not SSL)
- **From Address**: info@mainstreamtravel.io
- **Recipient**: kevinvangeffen86@gmail.com

## Security Features:

- Honeypot field to catch spam bots
- Email validation
- Required field validation
- Rate limiting (can be added if needed)

The contact form will send beautifully formatted emails from info@mainstreamtravel.io to kevinvangeffen86@gmail.com with the sender's information and message.
