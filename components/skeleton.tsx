import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export default function FeedSkeleton() {
  return (
    <div className="flex flex-1 justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl mx-auto space-y-4"> {/* Ajustar el max-w aquí */}
        {[...Array(5)].map((_, index) => (
          <Card
            key={index}
            className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4 p-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter className="flex justify-between p-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="ghost" size="sm" className="flex items-center gap-2" disabled>
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-6 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" disabled>
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-6 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" disabled>
                <Skeleton className="w-5 h-5 rounded-full" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}