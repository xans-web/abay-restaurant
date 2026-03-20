import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  en: {
    name: { type: String, required: true },
    desc: { type: String, required: true }
  },
  am: {
    name: { type: String, required: true },
    desc: { type: String, required: true }
  },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  isSpecial: { type: Boolean, default: false },
  isSoldOut: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false }
});

const MenuSectionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  items: [MenuItemSchema]
});

const SettingsSchema = new mongoose.Schema({
  _id: { type: String, default: 'global' },
  hotelName: { type: String, default: 'ABAY HOTEL' },
  hotelSlogan: { type: String, default: 'PREMIUM LUXURY DINING' },
  logo: { type: String, default: '/logo.png' },
  storyTitle: { type: String, default: 'The Essence of Ethiopia' },
  storyText: { type: String, default: '' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  adminPassword: { type: String, default: 'admin123' },
  adminEmail: { type: String, default: 'admin@abayhotel.com' },
  resetOtp: { type: String, default: null },
  resetOtpExpiry: { type: Date, default: null }
});

export const MenuSection = mongoose.models.MenuSection || mongoose.model('MenuSection', MenuSectionSchema);
export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
