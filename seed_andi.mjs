const rawData = [
  {
    "category": "Traditional Foods / የባህል ምግቦች",
    "items": [
      { "name": "Special Kitfo / ልዩ ክትፎ", "price": 850, "description": "Fresh minced beef with spiced butter. / በቅቤና በሚጥሚጣ የተዘጋጀ የላም ስጋ።" },
      { "name": "Doro Wat / የዶሮ ወጥ", "price": 950, "description": "Spicy chicken stew with eggs. / በቅመም የተዘጋጀ የዶሮ ወጥ ከእንቁላል ጋር።" },
      { "name": "Beyaynetu / የጾም በያይነቱ", "price": 450, "description": "Assorted vegan dishes. / የተለያዩ የጾም ምግቦች ጥምረት።" },
      { "name": "Beef Tibs / የበሬ ጥብስ", "price": 600, "description": "Sautéed beef with onions. / በሽንኩርትና በቃሪያ የተጠበሰ የበሬ ስጋ።" },
      { "name": "Gored Gored / ጎረድ ጎረድ", "price": 750, "description": "Raw beef cubes with awaze. / በአዋዜ የተዘጋጀ ጥሬ የበሬ ስጋ።" },
      { "name": "Shiro Tegabino / ሽሮ ተጋቢኖ", "price": 350, "description": "Thick chickpea stew. / በትኩስ ድስት የሚቀርብ የሽንብራ ሽሮ።" },
      { "name": "Bozena Shiro / ቦዘና ሽሮ", "price": 550, "description": "Shiro with minced beef. / ከበሬ ስጋ ጋር የተዘጋጀ ሽሮ።" },
      { "name": "Quanta Firfir / ቋንጣ ፍርፍር", "price": 500, "description": "Injera with dried beef jerky. / በቋንጣ ስጋ የተሰራ የእንጀራ ፍርፍር።" },
      { "name": "Chicken Cutlet / የዶሮ ኩትሌት", "price": 580, "description": "Breaded chicken breast. / በዳቦ ዱቄት ተለውሶ የተጠበሰ የዶሮ ስጋ።" },
      { "name": "Fish Dullet / የአሳ ዱለት", "price": 420, "description": "Minced fish with spices. / በቅመማ ቅመም የተከካ የአሳ ስጋ።" }
    ]
  },
  {
    "category": "Breakfast / የቁርስ ምግቦች",
    "items": [
      { "name": "Ful Medames / ፉል መዳመስ", "price": 320, "description": "Fava beans with oil and onions. / በሽንኩርትና በዘይት የተዘጋጀ ፉል።" },
      { "name": "Chechebsa / ጨጨብሳ", "price": 380, "description": "Shredded bread with honey. / ከማርና ከቅቤ ጋር የተቆራረሰ ቂጣ።" },
      { "name": "Egg Firfir / የእንቁላል ፍርፍር", "price": 280, "description": "Scrambled eggs with tomato. / በቲማቲምና ሽንኩርት የተሰራ እንቁላል።" },
      { "name": "Special Fetira / ልዩ ፈጢራ", "price": 350, "description": "Pastry with honey and egg. / ከማርና ከእንቁላል ጋር የተሰራ ፈጢራ።" },
      { "name": "Genfo / ገንፎ", "price": 400, "description": "Traditional thick porridge. / በገብስ ወይም በስንዴ ዱቄት የተሰራ ገንፎ።" }
    ]
  },
  {
    "category": "Drinks & Desserts / መጠጦችና ጣፋጮች",
    "items": [
      { "name": "Traditional Coffee / የባህል ቡና", "price": 60, "description": "Roasted coffee ceremony. / በባህላዊ መንገድ የተዘጋጀ ቡና።" },
      { "name": "Macchiato / ማኪያቶ", "price": 80, "description": "Strong espresso with milk. / ወተት ያለው ብርቱ ቡና።" },
      { "name": "Fresh Mango / የማንጎ ጭማቂ", "price": 180, "description": "Freshly squeezed mango. / ትኩስ የማንጎ ጭማቂ።" },
      { "name": "Spriss Juice / ስፕሪስ ጭማቂ", "price": 200, "description": "Mixed avocado and mango. / የተደባለቀ አቮካዶና ማንጎ።" },
      { "name": "Tea with Milk / ሻይ በወተት", "price": 50, "description": "Brewed tea with hot milk. / ሻይ ከወተት ጋር።" }
    ]
  }
];

const mappedData = rawData.map((section, sectionIndex) => ({
  category: section.category,
  id: section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${sectionIndex}`,
  items: section.items.map((item, itemIndex) => ({
    id: parseInt(`${sectionIndex + 1}0${itemIndex}`),
    en: { name: item.name, desc: item.description },
    am: { name: item.name, desc: item.description },
    price: item.price,
    image: "",
    isSpecial: false,
    isSoldOut: false,
    isNew: false
  }))
}));

async function seed() {
  try {
    console.log("Sending POST request to /api/menu to wipe and seed...");
    const res = await fetch('http://localhost:3000/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mappedData)
    });
    
    if (res.ok) {
      const result = await res.json();
      console.log("✅ Seed successful. Result:", result);
    } else {
      const errText = await res.text();
      console.error("❌ Failed to seed. Status:", res.status, errText);
    }
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
  }
}

seed();
