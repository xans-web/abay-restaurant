import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { MenuSection } from '@/lib/models';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    // Use select to omit internal Mongo fields that the frontend doesn't need
    const menu = await MenuSection.find({}).select('-_id -__v -items._id').lean();
    return NextResponse.json(menu, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read menu data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Menu data must be an array' }, { status: 400 });
    }

    await connectToDatabase();
    await MenuSection.deleteMany({});
    await MenuSection.insertMany(body);
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save menu data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { action, payload } = await request.json();
    await connectToDatabase();
    const sections = await MenuSection.find({});
    let menu = sections.map(s => s.toObject());

    switch (action) {
      case 'updateItem': {
        const { itemId, updates } = payload;
        menu = menu.map((section: any) => ({
          ...section,
          items: section.items.map((item: any) =>
            item.id === itemId ? { ...item, ...updates } : item
          )
        }));
        break;
      }
      case 'bulkUpdateItems': {
        const { itemIds, updates } = payload;
        menu = menu.map((section: any) => ({
          ...section,
          items: section.items.map((item: any) =>
            itemIds.includes(item.id) ? { ...item, ...updates } : item
          )
        }));
        break;
      }
      case 'addItem': {
        const { categoryId, item } = payload;
        const newItem = { ...item, id: Date.now() };
        menu = menu.map((section: any) =>
          section.id === categoryId
            ? { ...section, items: [...section.items, newItem] }
            : section
        );
        break;
      }
      case 'addCategory': {
        const { categoryName } = payload;
        menu.push({
          category: categoryName,
          id: categoryName.toLowerCase().replace(/\s+/g, '-'),
          items: []
        });
        break;
      }
      case 'renameCategory': {
        const { categoryId, newName } = payload;
        menu = menu.map((section: any) =>
          section.id === categoryId
            ? { ...section, category: newName }
            : section
        );
        break;
      }
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    await MenuSection.deleteMany({});
    if (menu.length > 0) {
      menu.forEach((s: any) => delete s._id);
      await MenuSection.insertMany(menu);
    }

    const updatedMenu = await MenuSection.find({}).select('-_id -__v -items._id').lean();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, data: updatedMenu });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu data' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { action, payload } = await request.json();
    await connectToDatabase();
    const sections = await MenuSection.find({});
    let menu = sections.map(s => s.toObject());

    switch (action) {
      case 'deleteItem': {
        const { itemId } = payload;
        menu = menu.map((section: any) => ({
          ...section,
          items: section.items.filter((item: any) => item.id !== itemId)
        }));
        break;
      }
      case 'deleteCategory': {
        const { categoryId } = payload;
        menu = menu.filter((section: any) => section.id !== categoryId);
        break;
      }
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    await MenuSection.deleteMany({});
    if (menu.length > 0) {
      menu.forEach((s: any) => delete s._id);
      await MenuSection.insertMany(menu);
    }

    const updatedMenu = await MenuSection.find({}).select('-_id -__v -items._id').lean();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, data: updatedMenu });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
