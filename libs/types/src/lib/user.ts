export interface User {
  access_token?: string;
  avatar_url?: string;
  bio?: any;
  block_reason?: any;
  blocked?: boolean;
  created_at?: string;
  created_by?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: any;
  refresh_token?: string;
  role?: string;
  updated_at?: string;
}

export type ProfileResponse = User;
