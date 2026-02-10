import { NextRequest, NextResponse } from "next/server";

import action from "@/utils/functions/admin/adminActions";
import { getSiteType } from "@/utils/functions/domain";
import { notFound } from "next/navigation";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => {
  try {
    const siteType = await getSiteType();
    if (siteType !== "admin") {
      return notFound();
    }

    const request = await req.json();

    const actionPrefix = (await params).path.join("-");

    // @ts-ignore
    const response = await action(actionPrefix, ...request);

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

export const revalidate = 0;

export const dynamic = "force-dynamic";
