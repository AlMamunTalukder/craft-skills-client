// // app/admission/_components/SubHeaderWrapper.tsx

// import SubHeaderAdmission from "@/components/shared/SubHeaderAdmission";
// import { db } from "@/prisma/db";
// import { getActiveBatch } from "@/queries/course/batch";

// export default async function SubHeaderWrapper() {
//   // ✅ This component fetches its own data independently.
//   const [batch, siteData] = await Promise.all([
//     getActiveBatch(),
//     db.siteContent.findFirst({
//       select: {
//         facebook: true,
//         facebookGroup: true,
//         telegram: true,
//         whatsapp: true,
//         youtube: true,
//       },
//     }),
//   ]);

//   return <SubHeaderAdmission siteData={siteData || {}} batch={batch} />;
// }