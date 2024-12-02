import { Database } from './Database';

type PostType = Database['public']['Tables']['posts']['Row'];
type UserType = Database['public']['Tables']['users']['Row'];

export type Post = PostType & {
  user: UserType | null;
};