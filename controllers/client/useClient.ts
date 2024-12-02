import { createClient } from "./server";

/**
 * Represents a user in the authentication and application system.
 *
 * @interface User
 * @property {string | null} name - The full name of the user.
 * @property {string | null} email - The email address of the user.
 * @property {string | null} user_name - The unique username of the user from the 'users' table.
 * @property {string | null} avatar_url - The URL of the user's avatar image.
 * @property {string | null} id - The unique identifier of the user (UUID).
 */
export interface UserTypes {
    user: {
      name: string | null;
      email: string | null;
      user_name: string | null;
      avatar_url: string;
      id: string | null;
    };
  }


/**
 * Asynchronously retrieves user data from Supabase, combining authentication
 * data from the `auth` service with additional user data stored in the `users` table.
 *
 * @returns {Promise<User>} - A promise that resolves to a User object containing 
 * both authentication data (like email and id) and user metadata (like user_name).
 */
export async function useClient(): Promise<UserTypes> {
  const db = await createClient();
  const { data } = await db.auth.getUser();

  const { data: userData } = await db
  .from('users')
  .select('user_name')
  .eq('id', data.user?.id)
  .single();

  return {
    user: data.user
      ? {
          name: data.user.user_metadata.name || null,
          email: data.user.email || null,
          user_name: userData?.user_name || null,
          avatar_url: data.user.user_metadata?.avatar_url || null,
          id: data.user.id || null,
        }
      : {
          name: null,
          email: null,
          user_name: null,
          avatar_url: null,
          id: null,
        },
  };
}
