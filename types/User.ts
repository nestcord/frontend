/**
 * Represents a user profile for the application.
 *
 * @interface Profile
 * @property {string} user_name - The unique username of the user.
 * @property {string} name - The full name of the user.
 * @property {string} avatar_url - The avatar URL of the user.
 */
export interface Profile {
  user_name: string | null;
  name: string | null;
  avatar_url: string | null;
}

export interface UserContextMenuProps {
  user: Profile | null;
}

/**
 * Represents a user in the authentication system.
 *
 * @interface User
 * @property {string} id - The unique identifier of the user (UUID).
 * @property {string} email? - The email address of the user (optional).
 * @property {string} created_at - The date and time the user was created.
 * @property {UserAppMetadata} app_metadata - Metadata related to the authentication provider.
 * @property {UserMetadata} user_metadata - Custom metadata related to the user.
 */
export interface User {
  id: string;
  email?: string;
  created_at: string;
  app_metadata: UserAppMetadata;
  user_metadata: UserMetadata;
}

export interface UserPropierties {
  id: string;
  email?: string;
  name: string;
  user_name: string;
  avatar_url: string;
  created_at: string;
  auth_id: string;
}

/**
 * Represents the app metadata of a user.
 * @interface UserAppMetadata
 */
export interface UserAppMetadata {
  provider?: string;
  [key: string]: any;
}

/**
 * Represents the custom metadata of a user.
 * @interface UserMetadata
 */
export interface UserMetadata {
  [key: string]: any;
}
