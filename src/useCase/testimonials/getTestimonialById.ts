import testimonialsRepository from "../../repositories/testimonialsRepository.js"

export default class GetTestimonialByIdUseCase {
  async execute(id: number) {
    try {
      const testimonial = await testimonialsRepository.findById(id)
      if (!testimonial) {
        throw new Error(`Testimonial with id ${id} not found`)
      }
      return testimonial
    } catch (error) {
      throw error
    }
  }
}
