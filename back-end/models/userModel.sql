-- User Table
-- userid: number
-- username: any
-- password: any
-- email: string / nums
-- address: string / nums
-- payment info: string / nums
-- rental property: foreign id for spot owned by user
CREATE TABLE User (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
  email VARCHAR(255) NOT NULL UNIQUE, 
  address TEXT,
  payment_info TEXT,
  rental_ids INT[],
  booking_ids INT[],
)