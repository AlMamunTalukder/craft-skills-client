import ImageGalleryWithSlider from "./SwiperClient";
import SectionTitle from "../shared/SectionTitle";
import r1 from "../../../public/img/review/Screenshot_1-1.webp";
import r2 from "../../../public/img/review/Screenshot_2-1-1.webp";
import r3 from "../../../public/img/review/Screenshot_5-1.webp";
import r4 from "../../../public/img/review/WhatsApp-Image-2024-06-11-at-01.webp";

export default async function Testimonials() {
  const reviews = [
    {
      image: r1,
    },
    {
      image: r2,
    },
    {
      image: r3,
    },
    {
      image: r4,
    },
  ];

  return (
    <div id="reviews" className="bg-[#4F0187] pb-20">
      <SectionTitle text="লিখিত মতামত" className="text-white" />
      <ImageGalleryWithSlider
        images={reviews.map((img) => img.image.src) as string[]}
      />
    </div>
  );
}
