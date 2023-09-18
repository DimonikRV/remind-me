import { Skeleton } from "./ui/skeleton";
import { toast } from "./ui/use-toast";
import { currentUser } from "@clerk/nextjs";

export async function WelcomeMsg() {
  try {
    const user = await currentUser();

    return (
      <div className="flex w-full mb-12">
        <h1 className="text-4xl font-bold">
          Welcome, <br /> {user?.firstName} {user?.lastName}
        </h1>
      </div>
    );
  } catch (error: any) {
    const description = error.message;
    toast({
      description,
      title: "Error",
      variant: "destructive",
    });
  }
}
export function WelcomeMsgFallBack() {
  return (
    <div className="flex flex-col w-full mb-12">
      <Skeleton className="w-[180px] h-[36px]" />
      <Skeleton className="w-[300px] h-[36px]" />
    </div>
  );
}
