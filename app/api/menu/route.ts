import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { MenuSection } from '@/lib/models';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    
    // Stop auto-overwriting entire DB collections
    // Use upsert mechanism per unique category_en to prevent wipe-outs
    for (const section of body) {
      if (section && section.category_en) {
        await MenuSection.findOneAndUpdate(
          { category_en: section.category_en },
          { $set: section },
          { upsert: true, new: true }
        );
      }
    }

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
        await MenuSection.updateOne(
          { "items.id": itemId },
          { $set: { "items.$": updates } }
        );
        break;
      }
      case 'bulkUpdateItems': {
        const { itemIds, updates } = payload;
        // Mongoose doesn't have an easy "update multiple nested items" in one go with different parents
        // but we can loop through the sections or do multiple updates.
        // For simplicity and safety, we'll do individual updates for the specific items.
        for (const id of itemIds) {
          await MenuSection.updateOne(
            { "items.id": id },
            { $set: { "items.$": updates } }
          );
        }
        break;
      }
      case 'addItem': {
        const { categoryId, item } = payload;
        const newItem = { ...item, id: Date.now() };
        await MenuSection.updateOne(
          { id: categoryId },
          { $push: { items: newItem } }
        );
        break;
      }
      case 'addCategory': {
        const { categoryName } = payload;
        const id = categoryName.toLowerCase().replace(/\s+/g, '-');
        await MenuSection.findOneAndUpdate(
          { id: id },
          { 
            $set: { 
              category_en: categoryName,
              category_am: categoryName, // default both to the name provided
              id: id,
              items: []
            } 
          },
          { upsert: true }
        );
        break;
      }
      case 'renameCategory': {
        const { categoryId, newName } = payload;
        await MenuSection.updateOne(
          { id: categoryId },
          { $set: { category_en: newName } }
        );
        break;
      }
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
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
        await MenuSection.updateOne(
          { "items.id": itemId },
          { $pull: { items: { id: itemId } } }
        );
        break;
      }
      case 'deleteCategory': {
        const { categoryId } = payload;
        await MenuSection.deleteOne({ id: categoryId });
        break;
      }
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    const updatedMenu = await MenuSection.find({}).select('-_id -__v -items._id').lean();
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, data: updatedMenu });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
