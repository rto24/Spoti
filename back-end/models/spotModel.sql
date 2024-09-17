-- Spot Table
-- address
-- price
-- status: available or not
-- requestors: array of users
-- renter: user id
CREATE table spot (
    spot_id SERIAL PRIMARY KEY, -- Unique identifier for the spot
    owner_id INT NOT NULL, -- owner_id FROM users model
    address VARCHAR(255) NOT NULL, -- address
    price DECIMAL(10, 2) NOT NULL, -- price
    status BOOLEAN DEFAULT TRUE, -- status
    requestors INT[] DEFAULT '{}', -- requestors
    renter_id INT, -- renter

    CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES User(user_id),
    CONSTRAINT fk_renter FOREIGN KEY (renter_id) REFERENCES User(user_id)
)