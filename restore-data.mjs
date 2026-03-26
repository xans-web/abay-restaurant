import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLine = envContent.split('\n').find(line => line.includes('MONGODB_URI='));
const MONGODB_URI = envLine.substring(envLine.indexOf('=') + 1).trim().replace(/^"(.*)"$/, '$1');

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

const MenuItemSchema = new mongoose.Schema({
  id: Number,
  en: { name: String, desc: String },
  am: { name: String, desc: String },
  price: Number,
  image: { type: String, default: "" },
  isSpecial: { type: Boolean, default: false },
  isSoldOut: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  clicks: { type: Number, default: 0 },
  cartAdds: { type: Number, default: 0 }
});

const MenuSectionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: String,
  items: [MenuItemSchema]
});

const MenuSection = mongoose.model('MenuSection', MenuSectionSchema);

const menuData = [
  {
    id: "breakfast",
    category: "Traditional Breakfast (ቁርስ)",
    items: [
      { id: 101, en: { name: "Special Chechebsa", desc: "Torn flatbread mixed with spiced butter and honey, served with egg" }, am: { name: "ልዩ ጨጨብሳ", desc: "በባለ ቅመም ቅቤ የተዘጋጀ ጨጨብሳ" }, price: 280, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" },
      { id: 102, en: { name: "Special Ful Medames", desc: "Fava beans cooked with fresh oil, onion, green pepper, tomato, and egg" }, am: { name: "ልዩ ፉል", desc: "በባለ ቅመም ቅቤ የተዘጋጀ" }, price: 220, image: "https://images.unsplash.com/photo-1599387737281-807537380f76?w=500" },
      { id: 103, en: { name: "Enqulal Firfir", desc: "Ethiopian scrambled eggs with onions, tomatoes, and green chilies" }, am: { name: "እንቁላል ፍርፍር", desc: "በእንቁላል እና ሽንኩርት የተዘጋጀ" }, price: 220, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500" },
      { id: 104, en: { name: "Barley Genfo", desc: "Traditional barley porridge with a crater of spiced butter and mitmita" }, am: { name: "ገብስ ገንፎ", desc: "በባለ ቅመም ቅቤ የተዘጋጀ" }, price: 320, image: "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?w=500" },
      { id: 105, en: { name: "Kita Firfir", desc: "Sweet and spicy shredded flatbread with honey and niter kibbeh" }, am: { name: "ቂጣ ፍርፍር", desc: "በቂጣ እና ቅቤ የተዘጋጀ" }, price: 250, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 106, en: { name: "Bula Porridge", desc: "Silky smooth porridge made from Enset root (False Banana)" }, am: { name: "ቡላ ገንፎ", desc: "በቡላ የተዘጋጀ ገንፎ" }, price: 350, image: "https://images.unsplash.com/photo-1506084868730-3a239f289d4d?w=500" },
      { id: 107, en: { name: "Fetira with Honey", desc: "Crispy flaky pastry served with pure organic honey" }, am: { name: "ፈቲራ በማር", desc: "በማር የሚቀርብ ፈቲራ" }, price: 180, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500" },
      { id: 108, en: { name: "Honey & Butter Pancake", desc: "Soft fluffy pancakes drizzled with honey and melted butter" }, am: { name: "ፓንኬክ", desc: "በማር እና ቅቤ" }, price: 200, image: "https://images.unsplash.com/photo-1528452697217-c2904bcff71a?w=500" },
      { id: 109, en: { name: "Breakfast Combo", desc: "A majestic spread of Ful, Chechebsa, and Scrambled Eggs" }, am: { name: "ቁርስ ኮምቦ", desc: "የተለያዩ የቁርስ አይነቶች" }, price: 450, isSpecial: true, image: "https://images.unsplash.com/photo-1496042399014-dc73c4f2bde1?w=500" },
      { id: 110, en: { name: "Oats Porridge", desc: "Healthy oats cooked with milk, served with honey and nuts" }, am: { name: "አጃ ገንፎ", desc: "በወተት የተቀቀለ አጃ" }, price: 220, image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500" },
      { id: 111, en: { name: "Scrambled Eggs Plain", desc: "Simple farm-fresh scrambled eggs" }, am: { name: "እንቁላል", desc: "በቀላል መንገድ የተሰራ" }, price: 150, image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba9ff4e?w=500" },
      { id: 112, en: { name: "Shakshuka", desc: "Poached eggs in a spicy tomato and pepper sauce" }, am: { name: "ሻክሹካ", desc: "በቲማቲም የሚሰራ እንቁላል" }, price: 320, image: "https://images.unsplash.com/photo-1590412200988-a436bb7050a8?w=500" },
      { id: 113, en: { name: "Fruit Platter", desc: "Refreshing mix of seasonal tropical fruits" }, am: { name: "የፍራፍሬ ትሪ", desc: "የተለያዩ ፍራፍሬዎች" }, price: 250, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 114, en: { name: "French Toast", desc: "Cinnamon-infused bread toasted to perfection" }, am: { name: "ፈረንሳይ ቶስት", desc: "በቀረፋ የተዘጋጀ" }, price: 240, image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500" },
      { id: 115, en: { name: "Granola with Yogurt", desc: "Crunchy granola served with creamy plain yogurt" }, am: { name: "ግራኖላ በዮገርት", desc: "ከዮገርት ጋር" }, price: 300, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500" }
    ]
  },
  {
    id: "meat-specialties",
    category: "Meat Specialties (የፍስግ)",
    items: [
      { id: 201, en: { name: "Special Doro Wot", desc: "The king of stews: SPICY chicken stew with 2 eggs and chicken parts" }, am: { name: "ልዩ ዶሮ ወጥ", desc: "በባህላዊ መንገድ የተዘጋጀ" }, price: 950, isSpecial: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 202, en: { name: "Key Wot (Beef Stew)", desc: "Tender beef chunks simmered in a rich, spicy Berbere sauce" }, am: { name: "ቀይ ወጥ", desc: "በበሬ ስጋ የተሰራ" }, price: 650, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 203, en: { name: "Alicha Wot", desc: "Mild turmeric-based beef stew with garlic and ginger" }, am: { name: "አልጫ ወጥ", desc: "በአልጫ የሚሰራ የበሬ ወጥ" }, price: 620, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 204, en: { name: "Special Kitfo", desc: "Finely minced extra-lean beef with Mitmita, Cardamom, and warm butter" }, am: { name: "ልዩ ክትፎ", desc: "በሚጥሚጣ እና ቅቤ የተዘጋጀ" }, price: 1100, isSpecial: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 205, en: { name: "Zilzil Tibs", desc: "Strip-shredded beef sautéed with organic onions and green chili" }, am: { name: "ዝልዝል ጥብስ", desc: "በሽንኩርት የታሸ ስጋ" }, price: 780, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 206, en: { name: "Derek Tibs", desc: "Crisp-fried prime beef sautéed with herbs and spices" }, am: { name: "ደረት ጥብስ", desc: "በደንብ የተጠበሰ ስጋ" }, price: 750, image: "https://images.unsplash.com/photo-1529692236671-f1f6e9460272?w=500" },
      { id: 207, en: { name: "Shekla Tibs", desc: "Juicy beef cubes grilled over charcoal in a traditional clay pot" }, am: { name: "ሸክላ ጥብስ", desc: "በባህላዊ መንገድ የሚቀርብ" }, price: 850, isSpecial: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 208, en: { name: "Gomen be Siga", desc: "Fresh organic collard greens simmered with beef chunks" }, am: { name: "ጎመን በስጋ", desc: "በጎመን እና ስጋ የሚሰራ" }, price: 680, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500" },
      { id: 209, en: { name: "Beef Ribs (Goden)", desc: "Succulent beef ribs seasoned with rosemary and house spices" }, am: { name: "የበሬ ጎድን", desc: "በሮዝመሪ የተዘጋጀ" }, price: 820, image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500" },
      { id: 210, en: { name: "Awaze Tibs", desc: "Sautéed beef cooked with spicy chili paste (Awaze) and garlic" }, am: { name: "አዋዜ ጥብስ", desc: "በአዋዜ የሚሰራ ጥብስ" }, price: 720, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 211, en: { name: "Lega Tibs", desc: "Fresh tender beef sautéed with rosemary and green chili" }, am: { name: "ለጋ ጥብስ", desc: "ለጋ ስጋ ጥብስ" }, price: 700, image: "https://images.unsplash.com/photo-1529692236671-f1f6e9460272?w=500" },
      { id: 212, en: { name: "Minchet Abish", desc: "Finely chopped beef stew with fenu-greek and spices" }, am: { name: "ምንቸት አቢሽ", desc: "በሽንኩርት እና ቅቤ የሚሰራ" }, price: 580, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 213, en: { name: "Bozena Shiro", desc: "Spiced chickpea stew blended with tender beef chunks" }, am: { name: "ቦዘና ሽሮ", desc: "በስጋ የተሰራ ሽሮ" }, price: 480, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 214, en: { name: "Special Dulet", desc: "Finely chopped tripe, liver, and beef with mitmita" }, am: { name: "ልዩ ዱለት", desc: "በደንብ የተከተፈ ስጋ" }, price: 420, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
      { id: 215, en: { name: "Kuanta Firfir", desc: "Beef jerky stewed in spicy sauce and mixed with Injera" }, am: { name: "ቋንጣ ፍርፍር", desc: "በቋንጣ ስጋ የተሰራ" }, price: 550, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" }
    ]
  },
  {
    id: "vegan-fasting",
    category: "Vegan/Fasting (የጾም)",
    items: [
      { id: 301, en: { name: "Abay Beyaynetu", desc: "Grand platter featuring Shiro, Misir, Kik, Gomen, and more" }, am: { name: "አባይ በያይነቱ", desc: "የተለያዩ የፆም አይነቶች" }, price: 480, isSpecial: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 302, en: { name: "Special Shiro Wot", desc: "Creamy powdered chickpea stew with plenty of onions and garlic" }, am: { name: "ልዩ ሽሮ ወጥ", desc: "በሽንኩርት የሚሰራ" }, price: 380, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 303, en: { name: "Misir Wot", desc: "Traditional spicy red lentil stew with hearty Berbere" }, am: { name: "ምስር ወጥ", desc: "በቀይ ምስር የሚሰራ" }, price: 340, image: "https://images.unsplash.com/photo-1546241072-a51bb0af15f9?w=500" },
      { id: 304, en: { name: "Kik Alicha", desc: "Mild and buttery yellow split pea stew flavored with turmeric" }, am: { name: "ክክ አልጫ", desc: "ከሮዝመሪ ጋር የሚዘጋጅ" }, price: 320, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 305, en: { name: "Gomen Wot", desc: "Fresh collard greens slow-cooked with fresh ginger and garlic" }, am: { name: "ጎመን ወጥ", desc: "በነጭ ሽንኩርት የተሰራ" }, price: 280, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 306, en: { name: "Fosolia & Carrot", desc: "Green beans and carrots sautéed with onions and a hint of spice" }, am: { name: "ፎሶሊያ በካሮት", desc: "በአትክልት የተሰራ" }, price: 280, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 307, en: { name: "Suff Fitfit", desc: " sunflower seed juice mixed with torn Injera and green chilies" }, am: { name: "ሱፍ ፍርፍር", desc: "በሱፍ ወተት የሚሰራ" }, price: 320, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 308, en: { name: "Timatim Fitfit", desc: "Refreshing cold salad of tomatoes and Injera pieces" }, am: { name: "ቲማቲም ፍርፍር", desc: "በቲማቲም የሚሰራ" }, price: 250, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 309, en: { name: "Azifa", desc: "Chilled savory green lentil salad with mustard and onion" }, am: { name: "አዚፋ", desc: "ቀዝቃዛ የምስር ሰላጣ" }, price: 220, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 310, en: { name: "Lentil Soup", desc: "Healthy Creamy red lentil soup with herbs" }, am: { name: "ምስር ሾርባ", desc: "ትኩስ የምስር ሾርባ" }, price: 180, image: "https://images.unsplash.com/photo-1547592110-8036ee3e2851?w=500" },
      { id: 311, en: { name: "Vegetable Soup", desc: "Seasonal mixed vegetables in a clear light broth" }, am: { name: "የአትክልት ሾርባ", desc: "ትኩስ የአትክልት ሾርባ" }, price: 150, image: "https://images.unsplash.com/photo-1547592110-8036ee3e2851?w=500" },
      { id: 312, en: { name: "Potato Salad", desc: "Boiled potatoes with peppers, onions, and olive oil" }, am: { name: "ድንች ሰላጣ", desc: "በድንች የሚሰራ ሰላጣ" }, price: 200, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
      { id: 313, en: { name: "Fasting Pasta", desc: "Pasta served with a rich vegetable and tomato sauce" }, am: { name: "የፆም ፓስታ", desc: "በአትክልት ሰስ" }, price: 280, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500" },
      { id: 314, en: { name: "Fasting Pizza", desc: "Tomato base with assorted vegetables and no cheese" }, am: { name: "የፆም ፒዛ", desc: "በአትክልት የተሰራ" }, price: 350, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
      { id: 315, en: { name: "Miser Salata", desc: "Tangy cold salad of cooked whole brown lentils" }, am: { name: "ምስር ሰላጣ", desc: "በምስር የሚሰራ" }, price: 200, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" }
    ]
  },
  {
    id: "international",
    category: "International & Fast Food",
    items: [
      { id: 401, en: { name: "Abay Signature Burger", desc: "Double beef patty with special carmelized onions and cheese" }, am: { name: "አባይ በርገር", desc: "ልዩ አባይ በርገር" }, price: 650, isSpecial: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
      { id: 402, en: { name: "Classic Cheese Burger", desc: "Juicy beef patty topped with melted cheddar and pickles" }, am: { name: "ቺዝ በርገር", desc: "በቺዝ የተሰራ በርገር" }, price: 550, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
      { id: 403, en: { name: "Chicken Sandwich", desc: "Grilled chicken breast with honey mustard and fresh slaw" }, am: { name: "የዶሮ ሳንድዊች", desc: "በዶሮ ስጋ የሚሰራ" }, price: 520, image: "https://images.unsplash.com/photo-1521390188846-e2a3f9745b6f?w=500" },
      { id: 404, en: { name: "Club Sandwich Deluxe", desc: "Classic triple decker with eggs, chicken, and beef bacon" }, am: { name: "ክለብ ሳንድዊች", desc: "በእንቁላል እና ዶሮ" }, price: 600, isSpecial: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500" },
      { id: 405, en: { name: "Pasta Agli-Olio", desc: "Al dente spaghetti with garlic, olive oil, and chili flakes" }, am: { name: "ፓስታ አግሊ-ኦሊዮ", desc: "በነጭ ሽንኩርት የሚሰራ" }, price: 380, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500" },
      { id: 406, en: { name: "Pasta Bolognese", desc: "Hearty pasta with slow-cooked minced beef tomato sauce" }, am: { name: "ፓስታ ቦሎኔዝ", desc: "በስጋ ሰስ የሚሰራ" }, price: 550, image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500" },
      { id: 407, en: { name: "Spaghetti Carbonara", desc: "Creamy egg sauce with crispy beef and black pepper" }, am: { name: "ካርቦናራ", desc: "በክሬም የሚሰራ" }, price: 580, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500" },
      { id: 408, en: { name: "Lasagna al Forno", desc: "Layered pasta with Bolognese, Bechamel, and Mozzarella" }, am: { name: "ላዛኛ", desc: "የተነባበረ ፓስታ" }, price: 750, isSpecial: true, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500" },
      { id: 409, en: { name: "Pizza Margherita", desc: "Classic Italian pizza with tomato, basil, and mozzarella" }, am: { name: "ፒዛ ማርጌሪታ", desc: "በቲማቲም እና ቺዝ" }, price: 480, image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=500" },
      { id: 410, en: { name: "Beef Pepperoni Pizza", desc: "Beef pepperoni with extra cheese and tomato sauce" }, am: { name: "ፔፐሮኒ ፒዛ", desc: "በፔፐሮኒ የተሰራ" }, price: 650, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
      { id: 411, en: { name: "Grilled Sirloin Steak", desc: "Premium beef steak served with seasonal vegetables and fries" }, am: { name: "ቢፍ ስቴክ", desc: "የበሬ ስቴክ" }, price: 1500, isSpecial: true, image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500" },
      { id: 412, en: { name: "Fish and Chips", desc: "Golden fried fish fillets served with crispy potatoes" }, am: { name: "ፊሽ ኤንድ ቺፕስ", desc: "የተጠበሰ አሳ" }, price: 680, image: "https://images.unsplash.com/photo-1579208030886-b937fe0925dc?w=500" },
      { id: 413, en: { name: "Buffalo Chicken Wings", desc: "Spiced chicken wings (12pcs) with celery and ranch dip" }, am: { name: "ዶሮ ክንፍ", desc: "የተጠበሰ የዶሮ ክንፍ" }, price: 580, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500" },
      { id: 414, en: { name: "French Fries Large", desc: "A large portion of golden salted french fries" }, am: { name: "ትልቅ ቺፕስ", desc: "የተጠበሰ ድንች" }, price: 250, image: "https://images.unsplash.com/photo-1630384066252-19bc11e68297?w=500" },
      { id: 415, en: { name: "Onion Rings", desc: "Beer-battered crispy onion rings with spicy sauce" }, am: { name: "ቀለበት ሽንኩርት", desc: "የተጠበሰ ሽንኩርት" }, price: 220, image: "https://images.unsplash.com/photo-1639129938911-75a4401bb179?w=500" }
    ]
  },
  {
    id: "drinks",
    category: "Soft Drinks & Hot Drinks",
    items: [
      { id: 501, en: { name: "Double Macchiato", desc: "Strong double espresso with velvety foam" }, am: { name: "ደብል ማኪያቶ", desc: "ጠንከር ያለ ማኪያቶ" }, price: 70, image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=500" },
      { id: 502, en: { name: "Special Jebena Coffee", desc: "Authentic clay pot coffee brewed with incense" }, am: { name: "ልዩ የጀበና ቡና", desc: "በባህላዊ መንገድ የሚዘጋጅ" }, price: 120, isSpecial: true, image: "https://images.unsplash.com/photo-1447933631397-8a491a096b41?w=500" },
      { id: 503, en: { name: "Cafe Latte", desc: "Silky espresso with steamed milk and thin foam" }, am: { name: "ላቴ", desc: "ቡና በወተት" }, price: 130, image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=500" },
      { id: 504, en: { name: "Spiced Tea", desc: "Fresh tea infused with cardamom, cinnamon, and ginger" }, am: { name: "የቅመም ሻይ", desc: "በባህላዊ ቅመሞች" }, price: 80, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500" },
      { id: 505, en: { name: "Hot Chocolate", desc: "Rich and creamy hot cocoa with marshmallows" }, am: { name: "ሾኮላታ", desc: "ትኩስ ሾኮላታ" }, price: 180, image: "https://images.unsplash.com/photo-1544787210-22bb84aa1769?w=500" },
      { id: 506, en: { name: "Fresh Mango Juice", desc: "Thick and naturally sweet seasonal mango juice" }, am: { name: "ማንጎ ጁስ", desc: "ትኩስ የማንጎ ጭማቂ" }, price: 220, image: "https://images.unsplash.com/photo-1544787210-22bb84aa1769?w=500" },
      { id: 507, en: { name: "Avocado & Mango Mix", desc: "Layered treat of fresh avocado and mango" }, am: { name: "ተቀላቃይ ጁስ", desc: "አቮካዶ እና ማንጎ" }, price: 280, image: "https://images.unsplash.com/photo-1544787210-22bb84aa1769?w=500" },
      { id: 508, en: { name: "Mixed Fruit Juice", desc: "Hand-blended seasonal paradise fruits" }, am: { name: "ተቀላቃይ ጁስ", desc: "የተለያዩ ፍራፍሬዎች" }, price: 300, isSpecial: true, image: "https://images.unsplash.com/photo-1544787210-22bb84aa1769?w=500" },
      { id: 509, en: { name: "Papaya Juice", desc: "Healthy and refreshing papaya blend" }, am: { name: "ፓፓያ ጁስ", desc: "ትኩስ የፓፓያ ጭማቂ" }, price: 220, image: "https://images.unsplash.com/photo-1544787210-22bb84aa1769?w=500" },
      { id: 510, en: { name: "Coca-Cola (Glass)", desc: "Ice cold classic beverage" }, am: { name: "ኮካ ኮላ", desc: "ቀዝቃዛ ኮካ ኮላ" }, price: 80, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" },
      { id: 511, en: { name: "Mineral Water 1L", desc: "Pure high-altitude spring water" }, am: { name: "ውሃ 1ሊ", desc: "ታሸገ ውሃ" }, price: 90, image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=500" },
      { id: 512, en: { name: "Mineral Water 500ml", desc: "Refreshing bottled spring water" }, am: { name: "ውሃ 0.5ሊ", desc: "ታሸገ ውሃ" }, price: 60, image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=500" },
      { id: 513, en: { name: "Sparkling Water", desc: "Fizzy premium carbonated water" }, am: { name: "አምቦ ውሃ", desc: "ቀዝቃዛ አምቦ ውሃ" }, price: 110, image: "https://images.unsplash.com/photo-1551613204-2fd9fb48398e?w=500" },
      { id: 514, en: { name: "Iced Tea Lemon", desc: "Cold brewed tea with zest of lemon" }, am: { name: "አይስ ቲ", desc: "ቀዝቃዛ ሻይ" }, price: 150, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500" },
      { id: 515, en: { name: "Lemonade Fresh", desc: "Homemade lemonade with mint and honey" }, am: { name: "ሎሚ ጭማቂ", desc: "ከሎሚ የሚሰራ" }, price: 180, image: "https://images.unsplash.com/photo-1523360453027-2dc04a29a03b?w=500" }
    ]
  },
  {
    id: "alcohol",
    category: "Alcoholic Beverages",
    items: [
      { id: 601, en: { name: "Habesha Beer Cold", desc: "Premium local draught experience" }, am: { name: "ሐበሻ ቢራ", desc: "ቀዝቃዛ ሐበሻ ቢራ" }, price: 150, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 602, en: { name: "St. George Gold", desc: "The standard and pride of Ethiopia" }, am: { name: "ቅዱስ ጊዮርጊስ", desc: "ቀዝቃዛ ቅዱስ ጊዮርጊስ" }, price: 140, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 603, en: { name: "Meta Premium", desc: "Crisp and refreshing malt beer" }, am: { name: "ሜታ ቢራ", desc: "ቀዝቃዛ ሜታ ቢራ" }, price: 140, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 604, en: { name: "Walia Beer", desc: "Light and smooth local beer" }, am: { name: "ዋሊያ ቢራ", desc: "ቀዝቃዛ ዋሊያ ቢራ" }, price: 140, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 605, en: { name: "Acacia Red Wine", desc: "Award-winning local red wine (Dry)" }, am: { name: "አካሺያ ቀይ ወይን", desc: "የተመረጠ ቀይ ወይን" }, price: 1800, isSpecial: true, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500" },
      { id: 606, en: { name: "Acacia White Wine", desc: "Crisp local white wine with fruity notes" }, am: { name: "አካሺያ ነጭ ወይን", desc: "የተመረጠ ነጭ ወይን" }, price: 1850, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500" },
      { id: 607, en: { name: "Red Wine (Glass)", desc: "Daily selection of premium red wine" }, am: { name: "ቀይ ወይን በብርጭቆ", desc: "የተመረጠ ቀይ ወይን" }, price: 450, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500" },
      { id: 608, en: { name: "Tej Honey Wine", desc: "AUTHENTIC home-brewed honey wine (Tej)" }, am: { name: "ጠጅ", desc: "በባህላዊ መንገድ የተዘጋጀ" }, price: 200, isSpecial: true, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500" },
      { id: 609, en: { name: "Black Label Whisky", desc: "Premium blended scotch whisky (Shot)" }, am: { name: "ብላክ ሌብል", desc: "የበሰለ ዊስኪ" }, price: 650, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 610, en: { name: "Gin & Tonic", desc: "Classic citrusy gin mixed with tonic" }, am: { name: "ጂን", desc: "ከቶኒክ ጋር" }, price: 450, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 611, en: { name: "Draft Beer 500ml", desc: "Freshly poured draught beer" }, am: { name: "ድራፍት ቢራ", desc: "ቀዝቃዛ ድራፍት" }, price: 110, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 612, en: { name: "Vodka Shot", desc: "Premium chilled vodka" }, am: { name: "ቮድካ", desc: "ቀዝቃዛ ቮድካ" }, price: 400, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 613, en: { name: "Baileys Irish Cream", desc: "Creamy liqueur with coffee notes" }, am: { name: "ቤይሊስ", desc: "ክሬም ያለው ሊከር" }, price: 550, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500" },
      { id: 614, en: { name: "Jägermeister Shot", desc: "Herbal digestif served ice cold" }, am: { name: "ለገርሚስተር", desc: "ቀዝቃዛ ሾት" }, price: 500, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" },
      { id: 615, en: { name: "Local Araki", desc: "Traditional strong distilled spirit" }, am: { name: "አረቄ", desc: "በባህላዊ መንገድ የተዘጋጀ" }, price: 150, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" }
    ]
  }
];

async function restoreData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await MenuSection.deleteMany({});
    console.log('Cleared existing MenuSections');

    await MenuSection.insertMany(menuData);
    console.log(`Succesfully inserted ${menuData.reduce((acc, cat) => acc + cat.items.length, 0)} real items across 6 categories`);

    await mongoose.connection.close();
    console.log('Database restoration complete');
  } catch (err) {
    console.error('Migration Error:', err);
    process.exit(1);
  }
}

restoreData();
