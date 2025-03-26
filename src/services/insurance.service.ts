import prisma from "../config/database";

export class InsuranceService {
  async createInsuranceService(
    startDate: string,
    endDate: string,
    patientid: string,
    policyNumber: string,
    insuranceType: string
  ) {
    const newInsurance = await prisma.insurance.create({
      data: {
        policyNumber,
        insuranceType,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        patient: {
          connect: { id: patientid },
        },
      },
    });

    return newInsurance;
  }
}
