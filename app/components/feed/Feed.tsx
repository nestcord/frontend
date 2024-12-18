import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ComposePost } from "./Compose";
import Posts from "./Posts";
import { UserPropierties } from "types/User";

function ComposePostSkeleton() {
  return (
    <div className="w-full max-w-xl p-4 space-y-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <div className="w-full max-w-xl space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ))}
    </div>
  );
}

export default function PostsFeed({ user }: { user: UserPropierties }) {
  return (
    <section className="flex flex-col items-center justify-center absolute inset-x-0 top-0">
      <Suspense fallback={<ComposePostSkeleton />}>
        <ComposePost user={user} />
      </Suspense>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts user={user} />
      </Suspense>
    </section>
  );
}
