export interface PetProfile {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  imageUri?: string;
  travelTips: string[];
  suggestedVaccines: string[];
  anxietyLevel: 'Low' | 'Medium' | 'High';
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TravelRecommendation {
  category: 'Hotel' | 'Activity' | 'Vet' | 'Regulation';
  title: string;
  description: string;
  priceLevel?: string; // $, $$, $$$
  rating?: string;
  checked?: boolean; // For checklist functionality
  sources?: GroundingSource[];
}

export interface CountryRegulations {
  country: string;
  summary: string;
  entryRequirements: string[];
  documentsRequired: string[];
  bannedBreeds: string[];
  quarantineInfo: string;
  airlineTips: string;
  emergencyContacts?: string; // New field for local vet/import center
  prohibitedItems?: string[]; // New field for food/meds restrictions
}

export interface Itinerary {
  id: string;
  destination: string;
  dates: string;
  startDate?: string;
  endDate?: string;
  airlinePolicy?: string;
  recommendations: TravelRecommendation[];
  weatherAlert?: string;
}

export interface VaccineRecord {
  id: string;
  name: string;
  dateGiven: string;
  expiryDate: string;
  status: 'Valid' | 'Expiring Soon' | 'Expired';
}

export interface User {
  email: string;
  name: string;
  isPremium?: boolean;
  subscriptionId?: string;
}