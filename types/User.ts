/**
 * Represents a user in the system.
 *
 * @interface User
 * @property {string} id - The unique identifier of the user (UUID).
 * @property {string} name - The full name of the user.
 * @property {string} user_name - The unique username used for identification.
 * @property {string} avatar_url - The URL of the user's avatar image.
 * @property {string} created_at - The date and time when the user was created (timestamp).
 */
export interface User {
    id: string; // The unique identifier of the user (UUID)
    name: string; // The full name of the user
    user_name: string; // The unique username used for identification
    avatar_url: string; // The URL of the user's avatar image
    created_at: string; // The date and time when the user was created (timestamp)
  }