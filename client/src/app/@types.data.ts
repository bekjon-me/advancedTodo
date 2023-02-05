export type user = {
  isUser: boolean;
  username: string;
  password: string;
};

export type subscription = boolean[];

export type info = {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthdate?: string;
  email: string;
  gender: string;
  isOlderThan18: boolean;
  cardNumber?: string;
};
