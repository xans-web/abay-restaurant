import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Settings, MenuSection } from "@/lib/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, itemId } = body;
    
    await connectToDatabase();

    if (action === "pageView") {
      await Settings.findByIdAndUpdate("global", { $inc: { totalViews: 1 } }, { upsert: true });
      return NextResponse.json({ success: true });
    }

    if (action === "itemClick" && typeof itemId === "number") {
      await MenuSection.updateOne(
        { "items.id": itemId },
        { $inc: { "items.$.clicks": 1 } }
      );
      return NextResponse.json({ success: true });
    }

    if (action === "cartAdd" && typeof itemId === "number") {
      await MenuSection.updateOne(
        { "items.id": itemId },
        { $inc: { "items.$.cartAdds": 1 } }
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
