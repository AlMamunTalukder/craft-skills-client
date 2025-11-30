// import { db } from "@/prisma/db";
// import ImageGalleryWithSlider from "./SwiperClient";
// import SectionTitle from "../shared/SectionTitle";

// export default async function Testimonials() {
//   const images = await db.reviews.findMany({
//     select: { image: true },
//     take: 4,
//   });

//   return (
//     <div id="reviews" className="bg-[#4F0187] pb-20">
//       <SectionTitle text="লিখিত মতামত" className="text-white" />{" "}
//       <ImageGalleryWithSlider
//         images={images.map((img) => img.image) as string[]}
//       />
//     </div>
//   );
// }


import React from 'react';

const Testimonials = () => {
  return (
    <div>
      Testimonials
    </div>
  );
};

export default Testimonials;