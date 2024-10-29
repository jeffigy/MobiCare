export type UserType = {
  name: string;
  email: string;
  roles: string[];
  active: boolean;
  verified: boolean;
  id: string;
  imagePublicId: string;
  imageUrl: string;
};

export type UserFormType = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  roles: string[];
  active?: boolean;
};
