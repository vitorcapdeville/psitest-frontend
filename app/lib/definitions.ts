// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  email: string;
  hashed_password: string;
  verified: boolean;
  verification_string: string | null;
  reset_password_code: string | null;
};
