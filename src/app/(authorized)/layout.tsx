import Navbar from "@/components/navbar";
import { auth } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
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
    <div className="bg-[#0a2a36] min-h-screen w-full ">
      <Navbar />
      {children}
    </div>
  );
}
