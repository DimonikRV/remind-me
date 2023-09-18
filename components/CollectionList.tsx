import prisma from "@/lib/prisma";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SadFace } from "@/components/icons/SadFace";
import { CreateCollectionBtn } from "@/components/CreateCollectionBtn";
import { CollectionCard } from "@/components/CollectionCard";
import { currentUser } from "@clerk/nextjs";

export async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });
  if (collections.length === 0) {
    return (
      <div>
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>

        <CreateCollectionBtn />
      </div>
    );
  }
  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-4">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
