import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="bg-[#131316] min-h-screen w-full ">
        <Navbar />
        {children}
    </div>
  );
}
