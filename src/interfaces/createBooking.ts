export interface createBooking {
  guest_id: number
  apartment_id: number
  check_in_date: Date
  check_out_date: Date
  guests_quantity: number
  total_price: number
  special_requests?: string
}
