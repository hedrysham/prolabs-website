/**
 * ProLabs Digital - Contact Configuration
 * 
 * Update your contact information here.
 * All contact forms will automatically use these values.
 */

const CONTACT_CONFIG = {
  // ===== EMAIL CONFIGURATION =====
  email: {
    address: 'purequality255@gmail.com',
    subject: 'New Inquiry from ProLabs Digital Website'
  },

  // ===== WHATSAPP CONFIGURATION =====
  whatsapp: {
    // Enter your WhatsApp number without spaces or special characters
    // Format: Country code + number (no + sign, no spaces)
    // Example: For +60 14-364 6023, enter: 60143646023
    number: '60143646023'
  },

  // ===== SOCIAL MEDIA LINKS (Optional) =====
  social: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    twitter: '#',
    github: '#'
  }
};

// Make configuration available globally
window.CONTACT_CONFIG = CONTACT_CONFIG;
