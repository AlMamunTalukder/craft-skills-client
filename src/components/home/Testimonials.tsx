import ImageGalleryWithSlider from "./SwiperClient";
import SectionTitle from "../shared/SectionTitle";
import nesar from "../../../public/img/review/Screenshot_1-1.webp";
import samapan from "../../../public/img/review/Screenshot_2-1-1.webp";
import imteaz from "../../../public/img/review/Screenshot_5-1.webp";
import salim from "../../../public/img/review/WhatsApp-Image-2024-06-11-at-01.webp";

export default async function Testimonials() {
  const reviews = [
    {
      image: nesar,
    },
    {
      image: samapan,
    },
    {
      image: imteaz,
    },
    {
      image: salim,
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
