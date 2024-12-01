import GetApartmentsRepository from "../repositories/getApartmentsRepository.js";
export default class FetchApartmentUseCase {
    async execute() {
        try {
            const response = await new GetApartmentsRepository().getAllApartments();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
