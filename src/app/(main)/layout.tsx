// import DebugAuth from "@/src/components/DebugAuth";
import ChatBot from "@/src/components/ChatBot";
import ScrollManager from "@/src/components/ScrollManager";
import ScrollToTop from "@/src/components/ScrolltoTop";
import Footer from "@/src/components/shared/Footer";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ScrollManager />
      <ScrollToTop />
      <ChatBot />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
