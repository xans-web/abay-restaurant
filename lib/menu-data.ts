export interface MenuItem {
  id: number;
  en: { name: string; desc: string };
  am: { name: string; desc: string };
  price: number;
  image: string;
  isSpecial: boolean;
  isSoldOut: boolean;
  isNew: boolean;
  clicks?: number;
  cartAdds?: number;
}

export interface MenuSection {
  category: string;
  id: string;
  items: MenuItem[];
}

export const initialMenuData: MenuSection[] = [];
