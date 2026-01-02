
// import AllReviews from "@/components/home/AllReviews";
// import Header from "@/components/shared/Header";
// import SectionTitle from "@/components/shared/SectionTitle";
// import { db } from "@/prisma/db";
// import Loading from "../../loading";

// export default async function Reviews() {
//   const siteData = await db.siteContent.findFirst({});

//   const images = await db.reviews.findMany({
//     select: { image: true },
//   });

//   if (!siteData) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <Header siteData={siteData} logo={siteData.logoLight || ""} />

//       <div className="bg-linear-to-br from-purple-100 via-white to-purple-50 pb-20">
//         {/* Grid of 2x2 images */}
//         <SectionTitle text="কোর্স রিভিউ" className="text-[#4F0187]" />

//         <AllReviews images={images.map((img) => img.image) as string[]} />
//       </div>
//     </>
//   );
// }

import React from 'react';

const page = () => {
  return (
    <div>
      review
    </div>
  );
};

export default page;
