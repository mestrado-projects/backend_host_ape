import GetApartmentsRepository from "../repositories/getApartmentsRepository";

export default class FetchApartmentUseCase {
  async execute() {
    try {
      await new GetApartmentsRepository().getAllApartments();
    } catch (error) {
      throw error;
    }
  }
}
