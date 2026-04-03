import WhatsApp from "@/src/components/WhatsApp";
import ScrollManager from "@/src/components/ScrollManager";
import ScrollToTop from "@/src/components/ScrolltoTop";
import Footer from "@/src/components/shared/Footer";
import { ReactNode } from "react";
import Messenger from "@/src/components/Messenger";
import FBMessenger from "@/src/components/FBMessanger";
// import AdmissionPopup from "@/src/components/shared/AdmissionPopUp";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ScrollManager />
      <ScrollToTop />
      <Messenger/>
      <WhatsApp />
      <FBMessenger/>
      <main className="grow">{children}</main>
      <Footer />
      {/* <AdmissionPopup/> */}
    </div>
  );
};

export default layout;
