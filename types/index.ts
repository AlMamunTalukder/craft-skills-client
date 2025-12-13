// import { Student, Batch, Course, StudentAttendance, AttendanceRoutine } from "@prisma/client";

export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
};
export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
};
export type LoginProps = {
  email: string;
  password: string;
};

// export interface StudentWithAttendance extends Student {
//   batch: Batch;
//   course: Course;
//   attendances: (StudentAttendance & {
//     attendanceRoutine: AttendanceRoutine;
//   })[];
// }

// src/types/index.ts
export interface SiteContent {
  _id: string;
  name: string;
  logoLight: string;
  logoDark: string;
  tagline: string;
  email: string;
  phone1: string;
  phone2?: string;
  address: string;
  facebook?: string;
  facebookGroup?: string;
  whatsapp?: string;
  youtube?: string;
  telegram?: string;
  instagram?: string;

  homeBannerInfo?: {
    title?: string;
    subtitle?: string;
    description?: string;
    otherInfo?: string;
  };

  admissionBannerInfo?: {
    title?: string;
    subtitle?: string;
    description?: string;
    otherInfo?: string;
  };

  seminarHeaderTitle?: string;
  seminarHeaderDescription?: string;
  seminarDeadline?: Date;
  admissionHeaderTitle?: string;
  admissionHeaderDescription?: string;
  admissionDeadline?: Date;
}

export interface BannerType {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  dateInfo?: string;
  bannerImage?: string;
}

export interface Seminar {
  id: string;
  title: string;
  isActive: boolean;
  registrationDeadline?: Date;
  description?: string;
}

export interface Schedule {
  _id: string;
  className: string;
  days: string;
  time: string;
  holidays?: string;
}
