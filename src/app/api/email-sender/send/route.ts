import { NextRequest, NextResponse } from "next/server";

import { IEmailData } from "../types";

export async function POST(request: NextRequest) {
  try {
    const emailPayload = (await request.json()) as IEmailData;
    // Insert here your logic to send the email using the payload of the form
    const isSuccess = true;

    return NextResponse.json(
      { success: true },
      {
        status: isSuccess ? 200 : 500,
      }
    );
  } catch (error) {
    console.error("ERROR WHEN SENDING EMAIL", error);
    return NextResponse.json(
      { success: false },
      {
        status: 500,
      }
    );
  }
}
