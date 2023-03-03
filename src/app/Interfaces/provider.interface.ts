interface Provider {
  id: number;
  name: string;
  address?: string;
  longitude?: number;
  latitude?: number;
  phoneNumber?: string[];
  email?: string;
  isOnline?: boolean;
  hasChronicMedication?: boolean;
  websiteUrl?: string;
  areaId?: number;
  categoryId: number;
  specialityId?: number;
  subSpecialityId?: number;
  language: 'ENGLISH' | 'ARABIC';
  createdAt?: Date;
  updatedAt?: Date;
}

//   interface ProviderByPagination {
//     provider: Provider[];
//     pagination?: Pagination;
//   }

interface CreateProviderInput {
  name: string;
  address: string;
  longitude?: number;
  latitude?: number;
  phoneNumber: string[];
  email?: string;
  isOnline?: boolean;
  hasChronicMedication?: boolean;
  websiteUrl?: string;
  categoryId: number;
  areaId: number;
  specialityId: number;
  subSpecialityId?: number;
}

interface UpdateProviderInput {
  id: number;
  name?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
  phoneNumber?: string[];
  email?: string;
  isOnline?: boolean;
  hasChronicMedication?: boolean;
  websiteUrl?: string;
  categoryId?: number;
}
