import { FC, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { setTask } from "@/actions/task";
import { useRouter } from "next/navigation";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;
  if (days < 0) return "text-gray-300 dark:text-gray-400";
  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-500 dark:text-green-400";
}

interface ITaskCardProps {
  expiresAt: Date;
  content: string;
  done: boolean;
  id: number;
}

export const TaskCard: FC<ITaskCardProps> = ({
  expiresAt,
  content,
  done,
  id,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex gap-2 pt-[5px] items-start">
      <Checkbox
        className="w-5 h-5"
        checked={done}
        disabled={isLoading}
        id={id.toString()}
        onCheckedChange={() => {
          setIsLoading(true);
          setTask(id, done);
          setIsLoading(false);
          router.refresh();
        }}
      />
      <label
        htmlFor={id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:dekoration-white",
          done && "line-through"
        )}
      >
        {content}
        {expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-400",
              getExpirationColor(expiresAt)
            )}
          >
            {format(expiresAt, "dd/MM/yyyy")}
          </p>
        )}
      </label>
    </div>
  );
};
