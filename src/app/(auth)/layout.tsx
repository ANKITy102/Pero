import Navbar from "@/components/navbar";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="bg-[#0a2a36] min-h-screen container bg-[url('../assets/landingPage/MaskGroup.png')] bg-cover bg-center">
        {children}
      </div>
  );
}
