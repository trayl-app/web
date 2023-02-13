export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export type UserInfo = Pick<UserDTO, 'firstName' | 'lastName' | 'birthday'>;
