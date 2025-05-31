import testimonialsRepository from "../../repositories/testimonialsRepository.js"
import type { createTestimonial } from "../../interfaces/createTestimonial.js"

export default class UpdateTestimonialUseCase {
  async execute(id: number, newData: Partial<createTestimonial>) {
    try {
      const testimonial = await testimonialsRepository.findById(id)
      if (!testimonial) {
        throw new Error(`Testimonial with id ${id} not found`)
      }

      if (newData.rating && (newData.rating < 1 || newData.rating > 5)) {
        throw new Error("Rating must be between 1 and 5")
      }

      await testimonialsRepository.updateById(id, newData)
      return "Testimonial updated successfully"
    } catch (error) {
      throw error
    }
  }
}
