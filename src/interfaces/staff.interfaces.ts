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

export interface IStaff {
  firstName: string;
  comments?: string;
  prefix?: string;
  ssn: string;
  nickname?: string;
  middlename: string;
  suffix?: string | undefined;
  lastName: string;
  email: string;
  phone?: string | undefined;
  gender: Gender;
  race?: Race | null;
  dateOfBirth: Date;
  positionEffectiveDate:Date;
}
