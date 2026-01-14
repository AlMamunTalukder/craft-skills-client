// import DebugAuth from "@/src/components/DebugAuth";
import Footer from "@/src/components/shared/Footer";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className="grow">{children}</main>
      <Footer />
      {/* <DebugAuth/> */}
    </div>
  );
};

export default layout;
