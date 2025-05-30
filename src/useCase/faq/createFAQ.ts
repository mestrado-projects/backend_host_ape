import faqRepository from "../../repositories/faqRepository.js"
import type { createFAQ } from "../../interfaces/createFAQ.js"

export default class CreateFAQUseCase {
  async execute(faqData: createFAQ) {
    try {
      const faq = await faqRepository.create(faqData)
      return faq
    } catch (error) {
      throw error
    }
  }
}
