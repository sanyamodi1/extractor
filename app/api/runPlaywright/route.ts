import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  return new Promise<NextResponse>((resolve) => {
    const scriptPath = path.resolve("./playwright/formfiller.tsx");

    exec(`npx ts-node "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("Playwright execution error:", error);
        return resolve(
          NextResponse.json(
            { message: "Playwright failed", error: error.message },
            { status: 500 }
          )
        );
      }

      if (stderr) console.warn("Playwright stderr:", stderr);

      console.log("Playwright stdout:", stdout);
      resolve(
        NextResponse.json({ message: "Playwright triggered", output: stdout })
      );
    });
  });
}
