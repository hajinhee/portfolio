export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  images?: string[];

  designUrl?: string;
  liveUrl?: string;
  githubUrl?: string;

  details: string;
  features: string[];

  period: string;
  status: string;
  teamSize: string;
  role: string;
  responsibilities?: string[];
}

export interface FormState {
  status: "success" | "error" | "";
  message: string;
}
