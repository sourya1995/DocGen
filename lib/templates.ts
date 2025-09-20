// Built-in document templates

export const templates = {
  birthday: {
    name: 'Birthday Card',
    description: 'Celebrate special birthdays with style',
    type: 'birthday',
    content: `🎉 Happy Birthday, {name}! 🎉

Dear {name},

Wishing you a fantastic {age} birthday filled with joy, laughter, and all your favorite things!

{message}

May this new year of your life bring you:
• Amazing adventures and new experiences
• Success in all your endeavors  
• Health, happiness, and prosperity
• Wonderful memories with loved ones

Hope your special day is absolutely perfect!

With warm wishes,
{sender}

P.S. Time to celebrate! 🎂🎈

---
Sent with love on {date}`
  },
  
  promotion: {
    name: 'Promotion Announcement',
    description: 'Professional promotion notifications',
    type: 'promotion',
    content: `🎊 Congratulations on Your Promotion! 🎊

Dear {name},

We are thrilled to announce your promotion to {position}! This achievement is a testament to your hard work, dedication, and exceptional performance.

{message}

Your new role comes with:
• Expanded responsibilities and leadership opportunities
• Recognition of your valuable contributions
• Our full confidence in your continued success
• The respect and admiration of your colleagues

We look forward to seeing the great things you'll accomplish in this new position.

Please join us in celebrating {name}'s well-deserved promotion!

Congratulations once again!

Best regards,
{sender}
{company}

Effective Date: {date}`
  },
  
  reward: {
    name: 'Recognition & Rewards',
    description: 'Acknowledge achievements and contributions',
    type: 'reward',
    content: `⭐ Outstanding Achievement Recognition ⭐

Dear {name},

Congratulations! You have been selected for special recognition based on your exceptional performance and dedication.

{message}

Your achievements include:
• Exceeding performance expectations
• Demonstrating exceptional teamwork
• Contributing to our continued success
• Inspiring others through your work ethic

As a token of our appreciation, you will receive {amount} as a performance bonus.

Thank you for being an invaluable member of our team!

With appreciation,
{sender}
{company}

Recognition Date: {date}`
  },
  
  overdue: {
    name: 'Overdue Notice',
    description: 'Professional overdue payment reminders',
    type: 'overdue',
    content: `📋 Payment Reminder Notice

Dear {name},

We hope this message finds you well. This is a friendly reminder regarding your account with us.

{message}

Account Details:
• Amount Due: {amount}
• Original Due Date: [Due Date]
• Days Overdue: [Days]
• Account Number: [Account #]

To avoid any service interruptions or additional fees, please submit your payment at your earliest convenience.

Payment Options:
• Online at our website
• Phone payment: [Phone Number]
• Mail to: [Address]

If you have already sent payment, please disregard this notice. If you have any questions or need to discuss payment arrangements, please contact us immediately.

Thank you for your prompt attention to this matter.

Sincerely,
{sender}
{company}

Notice Date: {date}`
  },
  
  email: {
    name: 'Professional Email',
    description: 'Clean, professional email template',
    type: 'email',
    content: `Subject: {message}

Dear {name},

I hope this email finds you well.

{message}

Please let me know if you need any additional information or have questions.

Thank you for your time and attention.

Best regards,
{sender}
{company}

---
Sent on {date} at {time}`
  },
  
  generic: {
    name: 'Generic Document',
    description: 'Flexible template for any communication',
    type: 'generic',
    content: `Dear {name},

{message}

We appreciate your attention to this matter.

If you have any questions or need further assistance, please don't hesitate to reach out.

Thank you,
{sender}
{company}

Date: {date}`
  }
};