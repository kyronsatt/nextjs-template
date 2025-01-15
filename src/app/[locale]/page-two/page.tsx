import { Suspense } from "react";

function PageTwo() {
  return (
    <div className="min-h-screen h-fit w-full flex justify-center bg-dark-1 py-32">
      <h1>Page Two</h1>
    </div>
  );
}

export default function SuspenseWrapper() {
  return (
    <Suspense>
      <PageTwo />
    </Suspense>
  );
}
