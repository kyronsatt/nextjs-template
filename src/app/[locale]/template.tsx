import { Footer } from "@/components/molecules/footer";
import { HeaderBar } from "@/components/molecules/header-bar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-full w-screen flex flex-col overflow-x-hidden">
      <HeaderBar />
      {children}
      <Footer />
    </div>
  );
}
