export interface ServiceDemo {
  type: 'day-night' | 'materials' | 'camera' | 'tour-360' | 'model-rotate' | 'concept-light';
  options: string[];
  initialValue: any;
}

export interface Service {
  id: string;
  title: string;
  titleRu: string;
  tagline: string;
  taglineRu: string;
  description: string;
  descriptionRu: string;
  colorName: string;
  colorHex: string;
  glowClass: string;
  iconName: string;
  bgImage: string;
  demo: ServiceDemo;
  gallery: string[];
  duration: string;
  durationRu: string;
  price: string;
  priceRu: string;
}

export interface StatItem {
  value: string;
  labelEn: string;
  labelRu: string;
}
