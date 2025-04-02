import { ReactNode } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--cms-gray-lighter)] font-sans text-[var(--cms-gray-darker)]">
      <Header />
      <Navigation />
      <main className="py-6 flex-grow">
        <div className="max-w-[900px] mx-auto px-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
