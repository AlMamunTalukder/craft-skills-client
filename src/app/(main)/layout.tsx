
import Footer from "@/src/components/shared/Footer";
import  { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
