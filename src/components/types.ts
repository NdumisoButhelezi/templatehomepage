export interface FeatureItem {
    title: string;
    description: string;
  }
  
  export interface Slide {
    title: string;
    description: string;
    image: string;
  }
  
  export interface Plan {
    name: string;
    price: string;
    features: string[];
    popular: boolean;
  }
  
  export interface FormData {
    name: string;
    email: string;
    message: string;
  }