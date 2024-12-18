import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/controllers/client/server";

/**
 * Handles the GET request for the authentication callback.
 *
 * This function exchanges an authorization code for a session using Supabase
 * and redirects the user based on their profile status.
 */
export async function GET(request: NextRequest) {
  // Extract the query parameters and origin URL from the request
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Check if a code was provided in the query parameters
  if (code) {
    const supabase = createClient();

    // Exchange the code for a session
    const { data: session, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    // Handle any error that occurs during the session exchange
    if (sessionError) {
      console.error("Error exchanging the code:", sessionError);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    // If a session is successfully created, proceed to check the user profile
    if (session) {
      const { user } = session;

      // Retrieve the user profile to check the user's username
      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("user_name")
        .eq("id", user.id)
        .single();

      // Handle any error that occurs while retrieving the user profile
      if (profileError) {
        console.error("Error retrieving the user profile:", profileError);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      const response = NextResponse.redirect(
        userProfile?.user_name === null
          ? `${origin}/register/complete`
          : `${origin}/app`,
      );

      return response;
    }
  }

  // Redirect to an error page if no code was provided
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
