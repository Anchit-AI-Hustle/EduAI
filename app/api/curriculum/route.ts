import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get("boardId");
  const yearId = searchParams.get("yearId");

  const root = process.cwd();

  if (boardId && yearId) {
    const filePath = path.join(
      root,
      "content",
      "curriculum",
      boardId,
      `${boardId}-${yearId}-curriculum.json`
    );
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `No curriculum file found for ${boardId} / ${yearId}` },
        { status: 404 }
      );
    }
    const doc = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return NextResponse.json(doc);
  }

  const indexPath = path.join(root, "content", "index", "curriculum-master-index.json");
  const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  return NextResponse.json(indexData);
}
