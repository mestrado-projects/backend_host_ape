import faqRepository from "../../repositories/faqRepository.js"

export default class GetFAQsUseCase {
  async execute(activeOnly = false) {
    try {
      const faqs = activeOnly ? await faqRepository.findActive() : await faqRepository.findAll()
      return faqs
    } catch (error) {
      throw error
    }
  }
}
