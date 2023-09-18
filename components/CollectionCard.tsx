"use client";

import { Collection, Task } from "@prisma/client";
import { FC, useMemo, useState } from "react";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";

import { deleteCollection } from "@/actions/collections";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Modal } from "./ui/Modal";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { TaskCard } from "./TaskCard";

interface IColectionCardProps {
  collection: Collection & { tasks: Task[] };
}

export const CollectionCard: FC<IColectionCardProps> = ({
  collection: { name, color, createdAt, id, tasks },
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tasksDone = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );

  const totalTasks = tasks.length;

  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;

  const removeCollection = async () => {
    try {
      setIsLoading(true);
      await deleteCollection(id);
      setIsLoading(false);

      toast({
        title: "Success",
        description: "Collection has deleted successfuly",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Cannot delete the collection",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        color={color}
        createdAt={createdAt}
        id={id}
        name={name}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{name}</span>
            {!isOpen && <CaretDownIcon className="w-6 h-6" />}
            {isOpen && <CaretUpIcon className="w-6 h-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 ? (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <p>There are no tasks yet:</p>
              <span
                className={cn(
                  "text-sm bg-clip-text text-transparent",
                  CollectionColors[color as CollectionColor]
                )}
              >
                Create one
              </span>
            </Button>
          ) : (
            <>
              <Progress className="rounded-none" value={progress} />
              <div className="p-[5px]">
                {tasks.map(({ id, expiresAt, content, done }) => {
                  if (!expiresAt) {
                    return;
                  }
                  return (
                    <TaskCard
                      key={id}
                      expiresAt={expiresAt}
                      content={content}
                      done={done}
                      id={id}
                    />
                  );
                })}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-central">
            <p>Created at {createdAt.toLocaleDateString("en-US")}</p>
            {isLoading ? (
              <div>Deleting...</div>
            ) : (
              <Modal
                removeCollection={removeCollection}
                setShowCreateModal={setShowCreateModal}
              />
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
