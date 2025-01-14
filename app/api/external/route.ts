import { NextResponse } from "next/server";





export async function GET() {
    const externalApiUrl = "https://jsonplaceholder.typicode.com/posts";
  
    try {
      const response = await fetch(externalApiUrl);
      if (!response.ok) {
        return NextResponse.json(
          { success: false, message: "Fetching failed" },
          { status: response.status }
        );
      }
  
      const data: Array<{ id: number; title: string; body: string }> = await response.json();
      return NextResponse.json({ success: true, data });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Fetching Error",
        error: (error as Error).message,
      });
    }
  }
  
