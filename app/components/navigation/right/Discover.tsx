import useSWR from "swr";
import { Loader2, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserTypes } from "@/controllers/client/useClient";

type User = UserTypes["user"];

export default function Discover() {
  const fetcher = async (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR<{ recommendations: User[] }>(
    "/api/users/recommendations",
    fetcher,
  );

  const recommendations = data?.recommendations || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-200 p-4">
        People you might know
      </h2>
      <div className="p-4 space-y-4">
        {recommendations.map((user) => (
          <div
            key={user.id}
            className="bg-neutral-900 rounded-lg p-4 flex items-center justify-between transition-all hover:bg-neutral-800"
          >
            <Link
              href={`/app/user/${user.user_name}`}
              className="flex items-center space-x-3 flex-grow"
            >
              <Avatar className="h-10 w-10 border-2 border-indigo-500 hover:border-indigo-600">
                <AvatarImage
                  src={user.avatar_url}
                  alt={user.user_name ?? "User  avatar"}
                />
                <AvatarFallback>
                  {user.user_name?.slice(0, 2).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-200 truncate">
                  {user.user_name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.name}</p>
              </div>
            </Link>
            <Button
              size="sm"
              variant="outline"
              className="text-white hover:text-indigo-700 hover:bg-blue-900/30 transition-colors"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Follow</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
