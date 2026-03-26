export interface MenuItem {
  id: number;
  en: { name: string; desc: string };
  am: { name: string; desc: string };
  price: number;
  image: string;
  isSpecial: boolean;
  isSoldOut: boolean;
  isNew: boolean;
}

export interface MenuSection {
  category: string;
  id: string;
  items: MenuItem[];
}

export const initialMenuData: MenuSection[] = [
  {
    category: "Traditional Foods",
    id: "traditional",
    items: [
      { 
        id: 1, 
        en: { name: "Doro Wat", desc: "Spicy chicken stew with hard-boiled eggs." }, 
        am: { name: "ዶሮ ወጥ", desc: "በበርበሬ የሚሰራ ምርጥ የዶሮ ወጥ ከእንቁላል ጋር።" }, 
        price: 24, 
        image: "", 
        isSpecial: true, 
        isSoldOut: false,
        isNew: true 
      },
      { 
        id: 2, 
        en: { name: "Kitfo", desc: "Minced beef with mitmita and niter kibbeh." }, 
        am: { name: "ክትፎ", desc: "በሚጥሚጣና በንጥር ቅቤ የሚዘጋጅ ምርጥ የበሬ ስጋ።" }, 
        price: 26, 
        image: "", 
        isSpecial: false, 
        isSoldOut: true,
        isNew: false 
      },
      { 
        id: 3, 
        en: { name: "Yetsom Beyaynetu", desc: "Colorful variety of vegan stews." }, 
        am: { name: "የጾም በያይነቱ", desc: "የተለያዩ አይነት አልጫና የቀይ ወጥ የጾም ምግቦች።" }, 
        price: 20, 
        image: "", 
        isSpecial: true, 
        isSoldOut: false,
        isNew: false 
      },
      { 
        id: 8, 
        en: { name: "Tibs", desc: "Sautéed beef or lamb with rosemary." }, 
        am: { name: "ጥብስ", desc: "በሽንኩርትና በሮዝመሪ የሚጠበስ ምርጥ ስጋ።" }, 
        price: 22, 
        image: "", 
        isSpecial: true, 
        isSoldOut: false,
        isNew: true 
      },
    ]
  },
  {
    category: "Specialty Drinks",
    id: "drinks",
    items: [
      { 
        id: 4, 
        en: { name: "Coffee Ceremony", desc: "Hand-roasted beans in a clay jebena." }, 
        am: { name: "የቡና ቁርስ", desc: "በጀበና የሚፈላ ባህላዊ የኢትዮጵያ ቡና።" }, 
        price: 15, 
        image: "", 
        isSpecial: true, 
        isSoldOut: false,
        isNew: false 
      },
      { 
        id: 5, 
        en: { name: "Tej (Honey Wine)", desc: "Fermented honey wine with gesho." }, 
        am: { name: "ጠጅ", desc: "ከንጹህ ማርና ከጌሾ የሚዘጋጅ ባህላዊ መጠጥ።" }, 
        price: 12, 
        image: "", 
        isSpecial: false, 
        isSoldOut: false,
        isNew: true 
      },
      { 
        id: 9, 
        en: { name: "Tella", desc: "Traditional home-brewed grain beer." }, 
        am: { name: "ጠላ", desc: "ከእህል የሚጠመቅ ባህላዊ መጠጥ።" }, 
        price: 9, 
        image: "", 
        isSpecial: false, 
        isSoldOut: true,
        isNew: false 
      },
    ]
  },
  {
    category: "Side Dishes",
    id: "sides",
    items: [
      { 
        id: 6, 
        en: { name: "Gomen", desc: "Sautéed collard greens with spices." }, 
        am: { name: "ጎመን", desc: "በሽንኩርትና በነጭ ሽንኩርት የሚሰራ ጎመን።" }, 
        price: 9, 
        image: "", 
        isSpecial: false, 
        isSoldOut: false,
        isNew: false 
      },
      { 
        id: 7, 
        en: { name: "Extra Injera", desc: "Premium fermented Teff sourdough." }, 
        am: { name: "ተጨማሪ እንጀራ", desc: "ከምርጥ ጤፍ የሚዘጋጅ እንጀራ።" }, 
        price: 4, 
        image: "", 
        isSpecial: false, 
        isSoldOut: false,
        isNew: false 
      },
      { 
        id: 10, 
        en: { name: "Ayib", desc: "Mild Ethiopian cottage cheese." }, 
        am: { name: "አይብ", desc: "ለስላሳ የቤት ውስጥ አይብ።" }, 
        price: 6, 
        image: "", 
        isSpecial: false, 
        isSoldOut: false,
        isNew: false 
      },
    ]
  }
];
