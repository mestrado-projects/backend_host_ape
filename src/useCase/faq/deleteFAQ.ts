import faqRepository from "../../repositories/faqRepository.js"

export default class DeleteFAQUseCase {
  async execute(id: number) {
    try {
      const faq = await faqRepository.findById(id)
      if (!faq) {
        throw new Error(`FAQ with id ${id} not found`)
      }

      await faqRepository.deleteById(id)
      return "FAQ deleted successfully"
    } catch (error) {
      throw error
    }
  }
}
