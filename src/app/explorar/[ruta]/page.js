"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  return (
    <div style={{ padding: 40 }}>
      <h1>Explorar funcionando</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}