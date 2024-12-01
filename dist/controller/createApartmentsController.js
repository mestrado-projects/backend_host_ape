import CreateApartmentUseCase from "../useCase/createApartment.js";
async function createApartmentsController(req, res) {
    try {
        const apartment = await new CreateApartmentUseCase().execute(req.body);
        res.status(200).send(apartment);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Unexpected Error", details: error?.message });
    }
}
export { createApartmentsController };
