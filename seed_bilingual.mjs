const rawData = [
  {
    "category_en": "Traditional Foods",
    "category_am": "የባህል ምግቦች",
    "items": [
      { "name_en": "Special Kitfo", "name_am": "ልዩ ክትፎ", "price": 850, "description_en": "Fresh minced beef with spiced butter.", "description_am": "በቅቤና በሚጥሚጣ የተዘጋጀ የላም ስጋ።" },
      { "name_en": "Doro Wat", "name_am": "የዶሮ ወጥ", "price": 950, "description_en": "Spicy chicken stew with eggs.", "description_am": "በቅመም የተዘጋጀ የዶሮ ወጥ ከእንቁላል ጋር።" },
      { "name_en": "Beyaynetu", "name_am": "የጾም በያይነቱ", "price": 450, "description_en": "Assorted vegan dishes.", "description_am": "የተለያዩ የጾም ምግቦች ጥምረት።" },
      { "name_en": "Beef Tibs", "name_am": "የበሬ ጥብስ", "price": 600, "description_en": "Sautéed beef with onions.", "description_am": "በሽንኩርትና በቃሪያ የተጠበሰ የበሬ ስጋ።" },
      { "name_en": "Gored Gored", "name_am": "ጎረድ ጎረድ", "price": 750, "description_en": "Raw beef cubes with awaze.", "description_am": "በአዋዜ የተዘጋጀ ጥሬ የበሬ ስጋ።" },
      { "name_en": "Shiro Tegabino", "name_am": "ሽሮ ተጋቢኖ", "price": 350, "description_en": "Thick chickpea stew.", "description_am": "በትኩስ ድስት የሚቀርብ የሽንብራ ሽሮ።" },
      { "name_en": "Bozena Shiro", "name_am": "ቦዘና ሽሮ", "price": 550, "description_en": "Shiro with minced beef.", "description_am": "ከበሬ ስጋ ጋር የተዘጋጀ ሽሮ።" },
      { "name_en": "Quanta Firfir", "name_am": "ቋንጣ ፍርፍር", "price": 500, "description_en": "Injera with dried beef jerky.", "description_am": "በቋንጣ ስጋ የተሰራ የእንጀራ ፍርፍር።" },
      { "name_en": "Merek Tibs", "name_am": "መረቅ ጥብስ", "price": 650, "description_en": "Juicy beef stir-fry with sauce.", "description_am": "በመረቅ የተዘጋጀ የበሬ ጥብስ።" },
      { "name_en": "Awaze Tibs", "name_am": "አዋዜ ጥብስ", "price": 620, "description_en": "Beef stir-fry with spicy awaze sauce.", "description_am": "በአዋዜ የተጠበሰ የበሬ ስጋ።" },
      { "name_en": "Shekla Tibs", "name_am": "ሸክላ ጥብስ", "price": 700, "description_en": "Charcoal roasted beef served on clay.", "description_am": "በሸክላ ምጣድ የሚቀርብ ምርጥ ጥብስ።" },
      { "name_en": "Zilzil Tibs", "name_am": "ዝልዝል ጥብስ", "price": 750, "description_en": "Strips of tender beef pan-roasted.", "description_am": "የተዘለዘለ ጥብስ ስጋ።" },
      { "name_en": "Minchet Abish", "name_am": "ምንቸት አብሽ", "price": 480, "description_en": "Spicy ground beef stew.", "description_am": "በቅመም የተዘጋጀ የተፈጨ ስጋ።" },
      { "name_en": "Kik Wot", "name_am": "ክክ ወጥ", "price": 300, "description_en": "Split pea stew with turmeric.", "description_am": "በአልጫ የተሰራ የክክ ወጥ።" },
      { "name_en": "Misir Wot", "name_am": "ምስር ወጥ", "price": 320, "description_en": "Spicy red lentil stew.", "description_am": "በበርበሬ የተሰራ የምስር ወጥ።" },
      { "name_en": "Gomen Be Siga", "name_am": "ጎመን በስጋ", "price": 550, "description_en": "Collard greens mixed with beef.", "description_am": "ጎመን ከበሬ ስጋ ጋር የተዘጋጀ።" },
      { "name_en": "Key Wot", "name_am": "ቀይ ወጥ", "price": 600, "description_en": "Traditional spicy beef stew.", "description_am": "በበርበሬ የተሰራ የበሬ ቀይ ወጥ።" },
      { "name_en": "Alicha Wot", "name_am": "አልጫ ወጥ", "price": 580, "description_en": "Mild beef stew with turmeric.", "description_am": "የበሬ አልጫ ወጥ።" },
      { "name_en": "Dirkosh Firfir", "name_am": "ድርቆሽ ፍርፍር", "price": 450, "description_en": "Sun-dried injera tossed in sauce.", "description_am": "ከድርቆሽ የተሰራ ፍርፍር።" },
      { "name_en": "Dinich Be Siga", "name_am": "ድንች በስጋ", "price": 480, "description_en": "Potato and beef stew.", "description_am": "ድንች ከስጋ ጋር የተሰራ።" }
    ]
  },
  {
    "category_en": "Breakfast",
    "category_am": "የቁርስ ምግቦች",
    "items": [
      { "name_en": "Ful Medames", "name_am": "ፉል መዳመስ", "price": 320, "description_en": "Fava beans with oil and onions.", "description_am": "በሽንኩርትና በዘይት የተዘጋጀ ፉል።" },
      { "name_en": "Chechebsa", "name_am": "ጨጨብሳ", "price": 380, "description_en": "Shredded bread with honey.", "description_am": "ከማርና ከቅቤ ጋር የተቆራረሰ ቂጣ።" },
      { "name_en": "Egg Firfir", "name_am": "የእንቁላል ፍርፍር", "price": 280, "description_en": "Scrambled eggs with tomato.", "description_am": "በቲማቲምና ሽንኩርት የተሰራ እንቁላል።" },
      { "name_en": "Special Fetira", "name_am": "ልዩ ፈጢራ", "price": 350, "description_en": "Pastry with honey and egg.", "description_am": "ከማርና ከእንቁላል ጋር የተሰራ ፈጢራ።" },
      { "name_en": "Genfo", "name_am": "ገንፎ", "price": 400, "description_en": "Traditional thick porridge.", "description_am": "በገብስ ወይም በስንዴ ዱቄት የተሰራ ገንፎ።" },
      { "name_en": "Bullula", "name_am": "ቡሉላ", "price": 200, "description_en": "Sweetened dough cooked with butter.", "description_am": "በቅቤ የተዘጋጀ ቡሉላ።" },
      { "name_en": "Enqulal Sils", "name_am": "እንቁላል ስልስ", "price": 250, "description_en": "Eggs cooked in spicy tomato sauce.", "description_am": "በስልስ የተሰራ እንቁላል።" },
      { "name_en": "Kinche", "name_am": "ክንጬ", "price": 220, "description_en": "Cracked wheat boiled with butter.", "description_am": "በቅቤ የተሰራ የክንጬ ቁርስ።" },
      { "name_en": "Bula", "name_am": "ቡላ", "price": 300, "description_en": "Enset root porridge.", "description_am": "የቡላ ገንፎ።" },
      { "name_en": "Injera Beqibe", "name_am": "እንጀራ በቅቤ", "price": 180, "description_en": "Injera rolled with spiced butter.", "description_am": "በለወስ ያለ እንጀራ በቅቤ።" },
      { "name_en": "Pancake", "name_am": "ፓንኬክ", "price": 300, "description_en": "Fluffy pancakes with syrup.", "description_am": "ፓንኬክ ከማር ጋር።" },
      { "name_en": "French Toast", "name_am": "ፍሬንች ቶስት", "price": 280, "description_en": "Bread soaked in eggs and fried.", "description_am": "የተጠበሰ ዳቦ በእንቁላል።" },
      { "name_en": "Omelette", "name_am": "ኦሜሌት", "price": 250, "description_en": "Eggs with veggies and cheese.", "description_am": "የተለያዩ አትክልቶች ያሉበት ኦሜሌት።" },
      { "name_en": "Oatmeal", "name_am": "ኦትሚል", "price": 220, "description_en": "Oats with warm milk and honey.", "description_am": "ኦትሚል ከወተት ጋር።" },
      { "name_en": "Fruit Salad", "name_am": "የፍራፍሬ ሰላጣ", "price": 260, "description_en": "Fresh seasonal fruits.", "description_am": "የተለያዩ ፍራፍሬዎች ሰላጣ።" }
    ]
  },
  {
    "category_en": "Drinks & Desserts",
    "category_am": "መጠጦችና ጣፋጮች",
    "items": [
      { "name_en": "Traditional Coffee", "name_am": "የባህል ቡና", "price": 60, "description_en": "Roasted coffee ceremony.", "description_am": "በባህላዊ መንገድ የተዘጋጀ ቡና።" },
      { "name_en": "Macchiato", "name_am": "ማኪያቶ", "price": 80, "description_en": "Strong espresso with milk.", "description_am": "ወተት ያለው ብርቱ ቡና።" },
      { "name_en": "Fresh Mango", "name_am": "የማንጎ ጭማቂ", "price": 180, "description_en": "Freshly squeezed mango.", "description_am": "ትኩስ የማንጎ ጭማቂ።" },
      { "name_en": "Spriss Juice", "name_am": "ስፕሪስ ጭማቂ", "price": 200, "description_en": "Mixed avocado and mango.", "description_am": "የተደባለቀ አቮካዶና ማንጎ።" },
      { "name_en": "Tea with Milk", "name_am": "ሻይ በወተት", "price": 50, "description_en": "Brewed tea with hot milk.", "description_am": "ሻይ ከወተት ጋር።" },
      { "name_en": "Avocado Juice", "name_am": "የአቮካዶ ጭማቂ", "price": 180, "description_en": "Creamy avocado juice.", "description_am": "የአቮካዶ ጭማቂ።" },
      { "name_en": "Papaya Juice", "name_am": "የፓፓያ ጭማቂ", "price": 160, "description_en": "Fresh papaya juice.", "description_am": "የፓፓያ ጭማቂ።" },
      { "name_en": "Pineapple Juice", "name_am": "የአናናስ ጭማቂ", "price": 170, "description_en": "Fresh pineapple juice.", "description_am": "የአናናስ ጭማቂ።" },
      { "name_en": "Orange Juice", "name_am": "የብርቱካን ጭማቂ", "price": 150, "description_en": "Fresh squeezed oranges.", "description_am": "የብርቱካን ጭማቂ።" },
      { "name_en": "Strawberry Juice", "name_am": "የእንጆሪ ጭማቂ", "price": 220, "description_en": "Fresh strawberry blend.", "description_am": "የእንጆሪ ጭማቂ።" },
      { "name_en": "Black Tea", "name_am": "ጥቁር ሻይ", "price": 30, "description_en": "Spiced black tea.", "description_am": "በቅመም የተፈላ ሻይ።" },
      { "name_en": "Espresso", "name_am": "ኤስፕሬሶ", "price": 60, "description_en": "Short strong coffee.", "description_am": "ብርቱ ቡና።" },
      { "name_en": "Cafe Latte", "name_am": "ካፌ ላቴ", "price": 90, "description_en": "Coffee with lots of milk.", "description_am": "ቡና በወተት።" },
      { "name_en": "Hot Chocolate", "name_am": "ሆት ቾኮሌት", "price": 120, "description_en": "Warm chocolate drink.", "description_am": "ትኩስ የቾኮሌት መጠጥ።" },
      { "name_en": "Tej", "name_am": "ጠጅ", "price": 150, "description_en": "Honey wine.", "description_am": "የማር ጠጅ።" },
      { "name_en": "Tella", "name_am": "ጠላ", "price": 80, "description_en": "Traditional beer.", "description_am": "ባህላዊ የገብስ ጠላ።" },
      { "name_en": "Mineral Water", "name_am": "አምቦ ውሃ", "price": 40, "description_en": "Sparkling water.", "description_am": "አምቦ ውሃ።" },
      { "name_en": "Bottled Water", "name_am": "የታሸገ ውሃ", "price": 30, "description_en": "Purified water.", "description_am": "የታሸገ ንፁህ ውሃ።" },
      { "name_en": "Coca Cola", "name_am": "ኮካ ኮላ", "price": 50, "description_en": "Soft drink.", "description_am": "ለስላሳ መጠጥ።" },
      { "name_en": "Sprite", "name_am": "ስፕራይት", "price": 50, "description_en": "Lemon soft drink.", "description_am": "ስፕራይት።" },
      { "name_en": "Fanta", "name_am": "ፋንታ", "price": 50, "description_en": "Orange soft drink.", "description_am": "ፋንታ።" },
      { "name_en": "Mirinda", "name_am": "ሚሪንዳ", "price": 50, "description_en": "Apple soft drink.", "description_am": "ሚሪንዳ።" },
      { "name_en": "Ice Cream", "name_am": "አይስክሬም", "price": 150, "description_en": "Vanilla or Chocolate.", "description_am": "የተለያየ አይስክሬም።" },
      { "name_en": "Cake Slice", "name_am": "ኬክ", "price": 120, "description_en": "Chocolate or Vanilla.", "description_am": "የኬክ ቁራጭ።" },
      { "name_en": "Tiramisu", "name_am": "ቲራሚሱ", "price": 180, "description_en": "Coffee flavored dessert.", "description_am": "በቡና ጣዕም የተሰራ ጣፋጭ።" }
    ]
  }
];

const mappedData = rawData.map((section, sectionIndex) => ({
  category_en: section.category_en,
  category_am: section.category_am,
  id: section.category_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  items: section.items.map((item, itemIndex) => ({
    id: parseInt(`${sectionIndex + 1}0${itemIndex}`),
    name_en: item.name_en,
    name_am: item.name_am,
    description_en: item.description_en,
    description_am: item.description_am,
    price: item.price,
    image: "",
    isSpecial: false,
    isSoldOut: false,
    isNew: false
  }))
}));

async function seed() {
  try {
    const res = await fetch('http://localhost:3000/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mappedData)
    });
    
    if (res.ok) {
      console.log("✅ Bilingual Seed completed successfully!");
    } else {
      console.error("❌ Failed to seed:", await res.text());
    }
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
  }
}

seed();
