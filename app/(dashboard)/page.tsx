import { Suspense } from "react";
import { CollectionList } from "@/components/CollectionList";
import { WelcomeMsg, WelcomeMsgFallBack } from "@/components/WelcomeMsg";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Suspense fallback={<WelcomeMsgFallBack />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
      </Suspense>
    </div>
  );
}
