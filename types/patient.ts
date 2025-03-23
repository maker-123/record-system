export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string; // Formatted date string (YYYY-MM-DD)
  gender: "Male" | "Female" | "Other"; // Enum matching Prisma
  email: string;
  phone: number;
  street: string;
  city: string;
  zip: number;
  weight: number;
  height: number;
  age: number;
  // mrn: string;

  pregnancy?: string;
  allergies: string[]; // Array of allergies
  renalFunction?: string;
  liverFunction?: string;

  bloodPressure?: string;
  heartRate?: string;
  respiratoryRate?: string;
  temperature?: string;
  oxygenSaturation?: string;
  status: string;
}
