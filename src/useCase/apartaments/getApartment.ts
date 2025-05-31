import GetApartmentsRepository from "../../repositories/getApartmentsRepository.js";

export default class GetApartmentUseCase {
  async execute(id: number) {
    try {
      const response = await new GetApartmentsRepository().getApartmentById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
