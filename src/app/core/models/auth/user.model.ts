export interface USER {
    id: number;
    email: string;
  }
  export interface PROFILE extends USER {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
  }