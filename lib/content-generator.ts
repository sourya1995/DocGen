// Document type detection and content generation utilities

export function detectDocumentType(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('birthday') || lowerPrompt.includes('happy birthday')) {
    return 'birthday';
  }
  
  if (lowerPrompt.includes('promotion') || lowerPrompt.includes('promoted') || lowerPrompt.includes('congratulations')) {
    return 'promotion';
  }
  
  if (lowerPrompt.includes('reward') || lowerPrompt.includes('achievement') || lowerPrompt.includes('bonus')) {
    return 'reward';
  }
  
  if (lowerPrompt.includes('overdue') || lowerPrompt.includes('reminder') || lowerPrompt.includes('late')) {
    return 'overdue';
  }
  
  if (lowerPrompt.includes('email') || lowerPrompt.includes('message')) {
    return 'email';
  }
  
  return 'generic';
}

export function extractPlaceholders(prompt: string, name: string, message: string): Record<string, string> {
  const placeholders: Record<string, string> = {
    name: name,
    message: message,
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    year: new Date().getFullYear().toString(),
    company: 'Your Company',
    sender: 'Your Name'
  };

  // Extract specific details from the prompt
  const ageMatch = prompt.match(/(\d+)(st|nd|rd|th)?\s*(birthday|year)/i);
  if (ageMatch) {
    placeholders.age = ageMatch[1];
  }

  const positionMatch = prompt.match(/(promoted to|new position as|role as)\s+([^,.\n]+)/i);
  if (positionMatch) {
    placeholders.position = positionMatch[2].trim();
  }

  const amountMatch = prompt.match(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (amountMatch) {
    placeholders.amount = amountMatch[0];
  }

  return placeholders;
}

export function generateDocumentContent(template: any, placeholders: Record<string, string>): string {
  let content = template.content;
  
  // Replace all placeholders in the template
  Object.entries(placeholders).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    content = content.replace(new RegExp(placeholder, 'g'), value);
  });

  // Generate additional AI-like content based on document type
  if (template.type === 'birthday') {
    content = enhanceBirthdayContent(content, placeholders);
  } else if (template.type === 'promotion') {
    content = enhancePromotionContent(content, placeholders);
  } else if (template.type === 'reward') {
    content = enhanceRewardContent(content, placeholders);
  } else if (template.type === 'overdue') {
    content = enhanceOverdueContent(content, placeholders);
  }

  return content;
}

function enhanceBirthdayContent(content: string, placeholders: Record<string, string>): string {
  const wishes = [
    "May this special day bring you joy, happiness, and wonderful memories!",
    "Wishing you a fantastic year ahead filled with success and happiness!",
    "Hope your birthday is as amazing as you are!",
    "May all your birthday wishes come true!"
  ];
  
  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  
  if (!content.includes('wish') && !content.includes('hope')) {
    content += `\n\n${randomWish}`;
  }
  
  return content;
}

function enhancePromotionContent(content: string, placeholders: Record<string, string>): string {
  const congratulations = [
    "Your hard work and dedication have truly paid off!",
    "This promotion is well-deserved recognition of your excellent contributions!",
    "We're excited to see the great things you'll accomplish in your new role!",
    "Your leadership qualities and expertise make you perfect for this position!"
  ];
  
  const randomCongratulation = congratulations[Math.floor(Math.random() * congratulations.length)];
  
  if (!content.includes('congratulations') && !content.includes('well-deserved')) {
    content += `\n\n${randomCongratulation}`;
  }
  
  return content;
}

function enhanceRewardContent(content: string, placeholders: Record<string, string>): string {
  const appreciations = [
    "Your outstanding performance has not gone unnoticed!",
    "Thank you for your exceptional contribution to our success!",
    "Your dedication and hard work are truly inspiring!",
    "Keep up the excellent work - you're making a real difference!"
  ];
  
  const randomAppreciation = appreciations[Math.floor(Math.random() * appreciations.length)];
  
  if (!content.includes('outstanding') && !content.includes('exceptional')) {
    content += `\n\n${randomAppreciation}`;
  }
  
  return content;
}

function enhanceOverdueContent(content: string, placeholders: Record<string, string>): string {
  const reminders = [
    "We understand things can get busy, and we're here to help if needed.",
    "Please let us know if you have any questions or concerns.",
    "We appreciate your prompt attention to this matter.",
    "Thank you for your cooperation in resolving this quickly."
  ];
  
  const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
  
  if (!content.includes('understand') && !content.includes('appreciate')) {
    content += `\n\n${randomReminder}`;
  }
  
  return content;
}