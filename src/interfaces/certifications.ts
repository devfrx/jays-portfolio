export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  expires?: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Certified";
  icon: string;
  color: string;
  credentialUrl?: string;
  verificationId?: string;
  skills?: string[];
}
