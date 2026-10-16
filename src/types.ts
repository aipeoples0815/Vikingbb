export type Gender = 'female' | 'male';
export type AgeGroup = '20대' | '30대' | '40대';

export interface StyleOption {
  id: string;
  name: string;
  gender: Gender;
  description: string;
}

export interface RetroTheme {
  id: string;
  themeNumber: number;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  iconName: string;
  sampleImageUrl?: string;
  styles: StyleOption[];
}

export interface PhotoStudioState {
  currentStep: 'upload' | 'theme' | 'gender_age' | 'processing' | 'result';
  sourceImage: string | null;
  selectedTheme: string;
  selectedStyleId?: string;
  gender: Gender;
  ageGroup: AgeGroup;
  generatedImage: string | null;
  finalPrintImage: string | null;
  todayCount: number;
  customerName?: string;
  error?: string | null;
  isKioskMode?: boolean;
}
