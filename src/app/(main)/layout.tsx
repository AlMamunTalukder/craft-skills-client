import WhatsApp from "@/src/components/WhatsApp";
import ScrollToTop from "@/src/components/ScrolltoTop";
import Footer from "@/src/components/shared/Footer";
import { ReactNode } from "react";
import FBMessenger from "@/src/components/FBMessanger";


const layout = async ({ children }: { children: ReactNode }) => {

  return (
    <div>
      <ScrollToTop />
      <WhatsApp />
      <FBMessenger />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
