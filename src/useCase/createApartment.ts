import CreateApartmentsRepository from "../repositories/createApartmentsRepository";

export default class CreateApartmentUseCase {
  async execute(body: any) {
    try {
      await new CreateApartmentsRepository().transaction(body);
    } catch (error) {
      throw error;
    }
  }
}
