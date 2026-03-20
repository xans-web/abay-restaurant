"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  updateMenuItem: (itemId: number, updates: Partial<MenuItem>) => Promise<boolean>;
  bulkUpdateItems: (itemIds: number[], updates: Partial<MenuItem>) => Promise<boolean>;
  addMenuItem: (categoryId: string, item: Omit<MenuItem, "id">) => Promise<boolean>;
  deleteMenuItem: (itemId: number) => Promise<boolean>;
  addCategory: (categoryName: string) => Promise<boolean>;
  renameCategory: (categoryId: string, newName: string) => Promise<boolean>;
  deleteCategory: (categoryId: string) => Promise<boolean>;
  updateSiteContent: (updates: Partial<SiteContent>) => Promise<boolean>;
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

  // Load menu data from server on mount
  useEffect(() => {
    fetch('/api/menu', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMenuData(data);
        }
      })
      .catch(err => console.error("Failed to load menu data from server", err));

    // Load site content from API
    fetch('/api/settings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSiteContent(data);
      })
      .catch(err => console.error("Failed to load settings", err));
  }, []);

  // Save menu data to server (fire-and-forget for responsiveness)
  const saveToServer = useCallback(async (data: MenuSection[]) => {
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.ok;
    } catch (err) {
      console.error("Failed to save menu data to server", err);
      return false;
    }
  }, []);

  const saveContentToServer = async (content: SiteContent) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      return res.ok;
    } catch (err) {
      console.error("Failed to save settings to server", err);
      return false;
    }
  };

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    const newContent = { ...siteContent, ...updates };
    setSiteContent(newContent);
    return await saveContentToServer(newContent);
  };

  const updateMenuItem = async (itemId: number, updates: Partial<MenuItem>) => {
    const newData = menuData.map(section => ({
      ...section,
      items: section.items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
    setMenuData(newData);
    return await saveToServer(newData);
  };

  const bulkUpdateItems = async (itemIds: number[], updates: Partial<MenuItem>) => {
    const newData = menuData.map(section => ({
      ...section,
      items: section.items.map(item => 
        itemIds.includes(item.id) ? { ...item, ...updates } : item
      )
    }));
    setMenuData(newData);
    return await saveToServer(newData);
  };

  const addMenuItem = async (categoryId: string, item: Omit<MenuItem, "id">) => {
    const newItem = { ...item, id: Date.now() };
    const newData = menuData.map(section => 
      section.id === categoryId 
        ? { ...section, items: [...section.items, newItem] } 
        : section
    );
    setMenuData(newData);
    return await saveToServer(newData);
  };

  const deleteMenuItem = async (itemId: number) => {
    const newData = menuData.map(section => ({
      ...section,
      items: section.items.filter(item => item.id !== itemId)
    }));
    setMenuData(newData);
    return await saveToServer(newData);
  };

  const addCategory = async (categoryName: string) => {
    const newCategory: MenuSection = {
      category: categoryName,
      id: categoryName.toLowerCase().replace(/\s+/g, '-'),
      items: []
    };
    const newData = [...menuData, newCategory];
    setMenuData(newData);
    return await saveToServer(newData);
  };

  const renameCategory = async (categoryId: string, newName: string) => {
    const newData = menuData.map(section => 
      section.id === categoryId 
        ? { ...section, category: newName } 
        : section
    );
    setMenuData(newData);
    return await saveToServer(newData);
  };

  const deleteCategory = async (categoryId: string) => {
    const newData = menuData.filter(section => section.id !== categoryId);
    setMenuData(newData);
    return await saveToServer(newData);
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
