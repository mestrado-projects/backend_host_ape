import GetApartmentsRepository from "../repositories/getApartmentsRepository";

export default class GetApartmentUseCase {
  async execute(id: number) {
    try {
      await new GetApartmentsRepository().getApartmentById(id);
    } catch (error) {
      throw error;
    }
  }
}
