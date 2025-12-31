export interface Batch {
  id: string;
  name: string;
  description?: string;
  registrationEnd: string | Date;
  isActive: boolean;
  code?: string;
  registrationStart?: string | Date;
  facebookSecretGroup?: string;
  messengerSecretGroup?: string;
  whatsappSecretGroup?: string;
}

export interface Course {
  id: string;
  name: string;
  price: number;
  discount?: number;
  paymentCharge?: number;
  description?: string;
}

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

// types/index.ts
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
  _id: string;
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
