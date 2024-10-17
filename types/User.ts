/**
 * Represents a user in the system.
 *
 * @interface User
 * @property {string} id - The unique identifier of the user (UUID).
 * @property {string} email? - The email address of the user.
 * @property {string} created_at - The date and time when the user was created (timestamp).
 */
export interface User {
    id: string 
    email?: string
    created_at: string
  }