import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=:]+?)[=:](.*)/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/(^['"]|['"]$)/g, '');
      process.env[key] = value;
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please set MONGODB_URI in .env.local");
  process.exit(1);
}

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

const MenuSection = mongoose.models.MenuSection || mongoose.model('MenuSection', MenuSectionSchema);

const inputData = [
  {
    "categoryEn": "Yefisig (Meat Specialties)",
    "categoryAm": "የፍስክ ምግቦች",
    "items": [
      { "nameEn": "Doro Wot", "nameAm": "ዶሮ ወጥ", "descEn": "Spicy chicken stew with egg and spices.", "descAm": "በቅመም የተከሸነ የዶሮ ወጥ ከእንቁላል ጋር።", "price": 850 },
      { "nameEn": "Key Wot", "nameAm": "ቀይ ወጥ", "descEn": "Beef stew in spicy berbere sauce.", "descAm": "በበርበሬና በሽንኩርት የበሰለ የበሬ ስጋ ወጥ።", "price": 650 },
      { "nameEn": "Yebeg Alicha", "nameAm": "የበግ አልጫ", "descEn": "Mild lamb stew with turmeric and ginger.", "descAm": "በቱርሜሪክና በቅመማ ቅመም የተሰራ የበግ ወጥ።", "price": 600 },
      { "nameEn": "Special Kitfo", "nameAm": "ልዩ ክትፎ", "descEn": "Minced beef with spiced butter and chili.", "descAm": "በንጥር ቅቤና በሚጥሚጣ የሚዘጋጅ የላም ስጋ።", "price": 950 },
      { "nameEn": "Zilzil Tibs", "nameAm": "ዝልዝል ጥብስ", "descEn": "Strip-cut beef sautéed with rosemary.", "descAm": "ረዘም ተደርገው የተቆረጡ የተጠበሱ የበሬ ስጋዎች።", "price": 750 },
      { "nameEn": "Lega Tibs", "nameAm": "ለጋ ጥብስ", "descEn": "Juicy beef cubes with onions and pepper.", "descAm": "ለስላሳ ሆኖ በሽንኩርትና በቃሪያ የተጠበሰ ስጋ።", "price": 700 },
      { "nameEn": "Minchet Abish", "nameAm": "ምንቸት አቢሽ", "descEn": "Minced beef stew with fenugreek.", "descAm": "በደቅቅ የተከተፈና በአቢሽ የተከሸነ የበሬ ወጥ።", "price": 550 }
    ]
  },
  {
    "categoryEn": "Yetsom (Vegan/Fasting)",
    "categoryAm": "የጾም ምግቦች",
    "items": [
      { "nameEn": "Beyaynetu", "nameAm": "የጾም በያይነቱ", "descEn": "A platter of various vegan stews.", "descAm": "የተለያዩ የጾም ወጦችና አትክልቶች ጥንቅር።", "price": 450 },
      { "nameEn": "Shiro Wot", "nameAm": "ሽሮ ወጥ", "descEn": "Roasted chickpea flour savory stew.", "descAm": "በሚገባ ተቆልቶ በተፈጨ ሽንብራ የሚሰራ ወጥ።", "price": 350 },
      { "nameEn": "Misir Wot", "nameAm": "ምስር ወጥ", "descEn": "Spicy red lentil stew with garlic.", "descAm": "በበርበሬ የተሰራ የሚጥም የቀይ ምስር ወጥ።", "price": 320 },
      { "nameEn": "Kik Alicha", "nameAm": "ክክ አልጫ", "descEn": "Mild yellow split pea stew.", "descAm": "በእርድና በነጭ ሽንኩርት የሚሰራ የክክ ወጥ።", "price": 300 },
      { "nameEn": "Gomen", "nameAm": "ጎመን", "descEn": "Sautéed collard greens with onions.", "descAm": "በሽንኩርትና በነጭ ሽንኩርት የታሸ የቆስጣ ጎመን።", "price": 280 },
      { "nameEn": "Fosolia", "nameAm": "ፎሶሊያ", "descEn": "Sautéed green beans and carrots.", "descAm": "ከካሮት ጋር የተጠበሰ ጣፋጭ የፎሶሊያ አትክልት።", "price": 280 },
      { "nameEn": "Suff Fitfit", "nameAm": "ሱፍ ፍትፍት", "descEn": "Injera in sunflower seed dressing.", "descAm": "የተፈጨ የሱፍ ወተት ከእንጀራ ጋር የተፈተፈተ።", "price": 320 }
    ]
  },
  {
    "categoryEn": "Soft Drinks",
    "categoryAm": "ቀዝቃዛ መጠጦች",
    "items": [
      { "nameEn": "Coca-Cola", "nameAm": "ኮካ ኮላ", "descEn": "Classic carbonated soda (300ml).", "descAm": "ቀዝቃዛ የለስላሳ መጠጥ (300 ሚሊ)።", "price": 80 },
      { "nameEn": "Mineral Water", "nameAm": "የታሸገ ውሃ", "descEn": "Bottled natural spring water.", "descAm": "ንጹህና የታሸገ የተፈጥሮ ማዕድን ውሃ።", "price": 60 },
      { "nameEn": "Mango Juice", "nameAm": "የማንጎ ጭማቂ", "descEn": "Freshly squeezed local mango.", "descAm": "ከተመረጡ ትኩስ ማንጎዎች የተዘጋጀ ጭማቂ።", "price": 220 },
      { "nameEn": "Mixed Juice", "nameAm": "የተቀላቀለ ጭማቂ", "descEn": "Avocado, mango, and papaya mix.", "descAm": "የአቮካዶ፣ ማንጎ እና ፓፓያ ድብልቅ ጭማቂ።", "price": 250 },
      { "nameEn": "Ambo Water", "nameAm": "አምቦ ውሃ", "descEn": "Naturally sparkling mineral water.", "descAm": "ተፈጥሯዊ ጋዝ ያለው የአምቦ ማዕድን ውሃ።", "price": 90 },
      { "nameEn": "Iced Tea", "nameAm": "ቀዝቃዛ ሻይ", "descEn": "House-made lemon and mint tea.", "descAm": "በሎሚና በናና የተዘጋጀ ቀዝቃዛ ሻይ።", "price": 120 },
      { "nameEn": "Sprite", "nameAm": "ስፕራይት", "descEn": "Lemon-lime carbonated soda.", "descAm": "የሎሚ ጣዕም ያለው ቀዝቃዛ የለስላሳ መጠጥ።", "price": 80 }
    ]
  },
  {
    "categoryEn": "Alcoholic Drinks",
    "categoryAm": "የአልኮል መጠጦች",
    "items": [
      { "nameEn": "Habesha Beer", "nameAm": "ሐበሻ ቢራ", "descEn": "Premium local lager beer.", "descAm": "ቀዝቃዛና ጥራት ያለው የሀገር ውስጥ ቢራ።", "price": 150 },
      { "nameEn": "St. George", "nameAm": "ቅዱስ ጊዮርጊስ", "descEn": "Historic historic beer.", "descAm": "ታዋቂውና ተወዳጁ የሀገር ውስጥ ቢራ።", "price": 140 },
      { "nameEn": "Tej (Glass)", "nameAm": "ጠጅ", "descEn": "Traditional honey wine.", "descAm": "ከንጹህ ማር የሚዘጋጅ ባህላዊ መጠጥ።", "price": 200 },
      { "nameEn": "Red Wine", "nameAm": "ቀይ ወይን", "descEn": "Locally produced dry red wine.", "descAm": "ጥራት ካለው ወይን የተዘጋጀ ቀይ መጠጥ።", "price": 450 },
      { "nameEn": "White Wine", "nameAm": "ነጭ ወይን", "descEn": "Smooth and sweet white wine.", "descAm": "ቀለል ያለና ጣፋጭነት ያለው ነጭ ወይን።", "price": 550 },
      { "nameEn": "Whisky (Shot)", "nameAm": "ዊስኪ", "descEn": "Imported blended Scotch whisky.", "descAm": "የተመረጠ ስኮች ዊስኪ በልኬት የሚቀርብ።", "price": 650 },
      { "nameEn": "Draft Beer", "nameAm": "ድራፍት ቢራ", "descEn": "Cold draft beer served in a glass.", "descAm": "በብርጭቆ የሚቀርብ ቀዝቃዛ ድራፍት ቢራ።", "price": 110 }
    ]
  },
  {
    "categoryEn": "Hot Drinks",
    "categoryAm": "ትኩስ መጠጦች",
    "items": [
      { "nameEn": "Jebena Coffee", "nameAm": "የጀበና ቡና", "descEn": "Traditionally brewed clay pot coffee.", "descAm": "በባህላዊ መንገድ በጀበና የሚፈላል ቡና።", "price": 100 },
      { "nameEn": "Spiced Tea", "nameAm": "የቅመም ሻይ", "descEn": "Tea with cinnamon and cloves.", "descAm": "ቀረፋና ቅርንፉድ የገባበት ትኩስ ሻይ።", "price": 80 },
      { "nameEn": "Macchiato", "nameAm": "ማኪያቶ", "descEn": "Strong espresso with steamed milk.", "descAm": "ጥቁር ቡና ከወተት ጋር የተቀላቀለ።", "price": 120 },
      { "nameEn": "Cafe Latte", "nameAm": "ላቴ", "descEn": "Creamy milk with a shot of coffee.", "descAm": "በሚገባ የፈላ ወተት ከቡና ጋር።", "price": 150 },
      { "nameEn": "Hot Chocolate", "nameAm": "ትኩስ ቸኮሌት", "descEn": "Rich cocoa with warm milk.", "descAm": "ጥራት ካለው ቸኮሌትና ወተት የሚዘጋጅ።", "price": 180 },
      { "nameEn": "Green Tea", "nameAm": "አረንጓዴ ሻይ", "descEn": "Light and healthy herbal tea.", "descAm": "የተለያዩ ጠቃሚ ቅጠላ ቅጠሎች ያሉበት ሻይ።", "price": 90 },
      { "nameEn": "Milk with Honey", "nameAm": "ወተት በማር", "descEn": "Warm milk with organic honey.", "descAm": "ትኩስ ወተት ከተፈጥሮ ማር ጋር።", "price": 140 }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");
    
    await MenuSection.deleteMany({});
    console.log("Cleared existing menu data.");

    let globalId = 1;

    for (const catData of inputData) {
      const section = new MenuSection({
        id: catData.categoryEn.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        category: catData.categoryEn,
        items: catData.items.map(item => ({
          id: globalId++,
          en: { name: item.nameEn, desc: item.descEn },
          am: { name: item.nameAm, desc: item.descAm },
          price: Number(item.price),
          image: "",
          isSpecial: false,
          isSoldOut: false, /* 'active: true' by default */
          isNew: false
        }))
      });

      await section.save();
      console.log(`Saved section: ${catData.categoryEn} with ${catData.items.length} items.`);
    }

    console.log("Bulk upload complete!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seed();
