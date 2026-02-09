/**
 * Represents a geographical location.
 */
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

/**
 * Represents a company entity.
 */
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

/**
 * Represents a user in the system.
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
