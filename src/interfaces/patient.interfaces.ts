export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum Race {
    AFRICAN = "AFRICAN",
    WHITE = "WHITE",
    ASIAN = "ASIAN",
    HISPANIC = "HISPANIC",
    OTHER = "OTHER",
  }

export interface IPatient {
  firstName: string;
  comments?: string;
  prefix?: string;
  ssn?: string;
  nickname?: string;
  middlename: string;
  suffix?: string;
  lastName: string;
  email: string;
  phone?: string | undefined;
  gender: Gender;
  race?: Race | null;
  dateOfBirth: Date;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode?: string;
  };
  medicalHistory?: Record<string, any>;
  insurance: {
    insuranceType: string;
    policyNumber: string;
    startDate: string;
    endDate?: string;
  };
}
