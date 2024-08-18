import { StatusType } from '@minta-ltd-recruit-platform/api-client';
export interface Candidate {
  id: number;
  name: string;
  experience: number;
  position: string;
  email: string;
  status: StatusType;
  dateOfApplication: Date;
}
