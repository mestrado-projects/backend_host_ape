import testimonialsRepository from "../../repositories/testimonialsRepository.js"

export default class GetTestimonialsUseCase {
  async execute(activeOnly = false, featuredOnly = false) {
    try {
      let testimonials

      if (featuredOnly) {
        testimonials = await testimonialsRepository.findFeatured()
      } else if (activeOnly) {
        testimonials = await testimonialsRepository.findActive()
      } else {
        testimonials = await testimonialsRepository.findAll()
      }

      return testimonials
    } catch (error) {
      throw error
    }
  }
}
