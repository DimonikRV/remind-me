import { Dispatch, FC, SetStateAction } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { Button } from "./button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";

interface IModalProps {
  removeCollection: () => void;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
}

export const Modal: FC<IModalProps> = ({
  removeCollection,
  setShowCreateModal,
}) => {
  return (
    <div>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => setShowCreateModal(true)}
      >
        <PlusIcon />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            collection and all tasks inside it.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={removeCollection}>
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
