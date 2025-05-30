import faqRepository from "../../repositories/faqRepository.js"
import type { createFAQ } from "../../interfaces/createFAQ.js"

export default class UpdateFAQUseCase {
  async execute(id: number, newData: Partial<createFAQ>) {
    try {
      const faq = await faqRepository.findById(id)
      if (!faq) {
        throw new Error(`FAQ with id ${id} not found`)
      }

      await faqRepository.updateById(id, newData)
      return "FAQ updated successfully"
    } catch (error) {
      throw error
    }
  }
}
