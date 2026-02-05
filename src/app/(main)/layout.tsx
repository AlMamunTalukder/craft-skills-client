// import DebugAuth from "@/src/components/DebugAuth";
import WhatsApp from "@/src/components/WhatsApp";
import ScrollManager from "@/src/components/ScrollManager";
import ScrollToTop from "@/src/components/ScrolltoTop";
import Footer from "@/src/components/shared/Footer";
import { ReactNode } from "react";
import Messenger from "@/src/components/Messenger";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ScrollManager />
      <ScrollToTop />
      <WhatsApp />
      <Messenger/>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
