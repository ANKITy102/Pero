import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    redirect("/discover");
  }
  return (
    <div className="bg-[#131316] min-h-screen container relative">
      <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/videos/bg2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      {children}
    </div>
  );
}
