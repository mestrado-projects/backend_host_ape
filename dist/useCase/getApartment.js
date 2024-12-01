import GetApartmentsRepository from "../repositories/getApartmentsRepository.js";
export default class GetApartmentUseCase {
    async execute(id) {
        try {
            const response = await new GetApartmentsRepository().getApartmentById(id);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
