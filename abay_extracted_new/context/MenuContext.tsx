"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuSection, initialMenuData, MenuItem } from '@/lib/menu-data';

interface SiteContent {
  hotelName: string;
  hotelSlogan: string;
  storyTitle: string;
  storyText: string;
  address: string;
  phone: string;
  email: string;
}

interface MenuContextType {
  menuData: MenuSection[];
  siteContent: SiteContent;
  updateMenuItem: (itemId: number, updates: Partial<MenuItem>) => void;
  bulkUpdateItems: (itemIds: number[], updates: Partial<MenuItem>) => void;
  addMenuItem: (categoryId: string, item: Omit<MenuItem, "id">) => void;
  deleteMenuItem: (itemId: number) => void;
  addCategory: (categoryName: string) => void;
  renameCategory: (categoryId: string, newName: string) => void;
  deleteCategory: (categoryId: string) => void;
  updateSiteContent: (updates: Partial<SiteContent>) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const initialSiteContent: SiteContent = {
  hotelName: "ABAY INTERNATIONAL HOTEL",
  hotelSlogan: "THE ESSENCE OF ETHIOPIA",
  storyTitle: "The Essence of Addis",
  storyText: "Established in 1998, Addis Culinary brings the rich heritage of Ethiopian hospitality to your table. Every dish is prepared with love and authentic spices imported directly from the highlands. Our mission is to share the vibrant flavors and communal dining traditions of our motherland with the world.",
  address: "123 Cultural Way, Addis Ababa, Ethiopia",
  phone: "+251 11 123 4567",
  email: "info@abayhotel.com"
};

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuData, setMenuData] = useState<MenuSection[]>(initialMenuData);
  const [siteContent, setSiteContent] = useState<SiteContent>(initialSiteContent);

  // Load initial data and setup cross-tab sync
  useEffect(() => {
    const savedData = localStorage.getItem('addis_culinary_menu');
    if (savedData) {
      setMenuData(JSON.parse(savedData));
    }

    // Load site content from API
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSiteContent(data);
      })
      .catch(err => console.error("Failed to load settings", err));

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'addis_culinary_menu' && e.newValue) {
        setMenuData(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveToStorage = (data: MenuSection[]) => {
    localStorage.setItem('addis_culinary_menu', JSON.stringify(data));
  };

  const saveContentToServer = async (content: SiteContent) => {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
    } catch (err) {
      console.error("Failed to save settings to server", err);
    }
  };

  const updateSiteContent = (updates: Partial<SiteContent>) => {
    const newContent = { ...siteContent, ...updates };
    setSiteContent(newContent);
    saveContentToServer(newContent);
  };

  const updateMenuItem = (itemId: number, updates: Partial<MenuItem>) => {
    const newData = menuData.map(section => ({
      ...section,
      items: section.items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
    setMenuData(newData);
    saveToStorage(newData);
  };

  const bulkUpdateItems = (itemIds: number[], updates: Partial<MenuItem>) => {
    const newData = menuData.map(section => ({
      ...section,
      items: section.items.map(item => 
        itemIds.includes(item.id) ? { ...item, ...updates } : item
      )
    }));
    setMenuData(newData);
    saveToStorage(newData);
  };

  const addMenuItem = (categoryId: string, item: Omit<MenuItem, "id">) => {
    const newItem = { ...item, id: Date.now() };
    const newData = menuData.map(section => 
      section.id === categoryId 
        ? { ...section, items: [...section.items, newItem] } 
        : section
    );
    setMenuData(newData);
    saveToStorage(newData);
  };

  const deleteMenuItem = (itemId: number) => {
    const newData = menuData.map(section => ({
      ...section,
      items: section.items.filter(item => item.id !== itemId)
    }));
    setMenuData(newData);
    saveToStorage(newData);
  };

  const addCategory = (categoryName: string) => {
    const newCategory: MenuSection = {
      category: categoryName,
      id: categoryName.toLowerCase().replace(/\s+/g, '-'),
      items: []
    };
    const newData = [...menuData, newCategory];
    setMenuData(newData);
    saveToStorage(newData);
  };

  const renameCategory = (categoryId: string, newName: string) => {
    const newData = menuData.map(section => 
      section.id === categoryId 
        ? { ...section, category: newName } 
        : section
    );
    setMenuData(newData);
    saveToStorage(newData);
  };

  const deleteCategory = (categoryId: string) => {
    const newData = menuData.filter(section => section.id !== categoryId);
    setMenuData(newData);
    saveToStorage(newData);
  };

  return (
    <MenuContext.Provider value={{ 
      menuData, 
      siteContent,
      updateMenuItem, 
      bulkUpdateItems, 
      addMenuItem, 
      deleteMenuItem, 
      addCategory, 
      renameCategory, 
      deleteCategory,
      updateSiteContent
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
