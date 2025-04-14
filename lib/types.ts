import { JwtPayload } from "jsonwebtoken";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  indication: string;
  prescribedBy: string;
  patientId: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: "Male" | "Female";
  email: string;
  phone: number;
  street: string;
  city: string;
  zip: number;
  age: number;
  weight: number;
  height: number;
  pregnancy?: string;
  allergies: string[];
  renalFunction?: string;
  liverFunction?: string;
  bloodPressure?: string;
  heartRate?: string;
  respiratoryRate?: string;
  temperature?: string;
  oxygenSaturation?: string;
  painScale?: string;
  status: string;
  medications?: Medication[];
}
export interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}
export interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  tags: string[];
  rating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
}
