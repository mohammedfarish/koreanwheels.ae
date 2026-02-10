import { logos } from "@/utils/companyData";

export async function GET(request: Request, { params }: { params: Promise<{ img: string }> }) {
  const { img } = await params;

  let url: string | undefined = undefined;

  if (img === "logo") {
    url = logos.main;
  }

  if (img === "logo-light") {
    url = logos.mainLight;
  }

  if (!url) {
    return new Response("Image not found", { status: 404 });
  }

  const image = await fetch(url);

  if (!image.ok) {
    return new Response("Image not found", { status: 404 });
  }

  const blob = await image.blob();

  return new Response(blob, {
    headers: {
      "Content-Type": blob.type,
    },
  });
}
