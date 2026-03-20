import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import connectToDatabase from '@/lib/db';
import { Settings } from '@/lib/models';
import { revalidatePath } from 'next/cache';

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

// Auto-migrate function
async function getSettings() {
  await connectToDatabase();
  let settings = await Settings.findById('global');
  
  if (!settings) {
    try {
      const data = JSON.parse(await fs.readFile(SETTINGS_FILE, 'utf-8'));
      settings = await Settings.create({ _id: 'global', ...data });
    } catch (e) {
      settings = await Settings.create({ _id: 'global' });
    }
  }
  return settings;
}

export async function GET() {
  try {
    const settings = await getSettings();
    const data = settings.toObject();
    
    // Omit adminPassword from the public API response for security
    const { adminPassword, _id, __v, ...publicSettings } = data;
    return NextResponse.json(publicSettings);
  } catch (error) {
    console.error("Settings GET Error:", error);
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const settings = await getSettings();
    const actualPassword = settings.adminPassword || 'admin123';

    // Verify Password Action (Admin Login)
    if (body.action === 'verifyLogin') {
      if (body.password === actualPassword) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Change Password Action
    if (body.action === 'changePassword') {
      if (body.currentPassword !== actualPassword) {
        return NextResponse.json({ error: 'Incorrect current password' }, { status: 401 });
      }
      settings.adminPassword = body.newPassword;
      await settings.save();
      revalidatePath('/', 'layout');
      return NextResponse.json({ success: true });
    }

    // Default setting updates (hotel name, slogan, etc.)
    // Explicitly delete adminPassword from body just in case to prevent clients from overwriting it
    if ('adminPassword' in body) delete body.adminPassword; 
    
    Object.assign(settings, body);
    await settings.save();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings POST Error:", error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
