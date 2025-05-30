export interface createItinerary {
  title: string
  description: string
  location: string
  duration_days?: number
  estimated_cost?: number
  difficulty_level?: string
  activities?: any[]
  image_url?: string
  is_active: boolean
}
