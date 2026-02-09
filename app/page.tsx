import Homepage from "@/components/homepage/Homepage";

export async function getNextjsVersion(): Promise<string> {
  try {
    const response = await fetch("https://api.github.com/repos/vercel/next.js/releases/latest", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const data = await response.json();

    const version = data.tag_name?.replace(/^v/, "") || "16.0.1";
    return version;
  } catch (error) {
    console.error("Failed to fetch Next.js version:", error);

    return "16.0.1";
  }
}

export default async function Page() {
  const nextjsVersion = await getNextjsVersion();

  const majorVersion = nextjsVersion.split(".")[0];

  return <Homepage majorVersion={majorVersion} nextjsVersion={nextjsVersion} />;
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
