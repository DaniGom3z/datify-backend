export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string;
  roleId: number;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  roleId?: number;
}

export interface SafeUserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
}