import CreateApartmentsRepository from "../repositories/createApartmentsRepository.js";
export default class CreateApartmentUseCase {
    async execute(body) {
        try {
            const response = await new CreateApartmentsRepository().transaction(body);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}