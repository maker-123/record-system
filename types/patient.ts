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
}
