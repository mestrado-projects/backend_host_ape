import testimonialsRepository from "../../repositories/testimonialsRepository.js"

export default class DeleteTestimonialUseCase {
  async execute(id: number) {
    try {
      const testimonial = await testimonialsRepository.findById(id)
      if (!testimonial) {
        throw new Error(`Testimonial with id ${id} not found`)
      }

      await testimonialsRepository.deleteById(id)
      return "Testimonial deleted successfully"
    } catch (error) {
      throw error
    }
  }
}
