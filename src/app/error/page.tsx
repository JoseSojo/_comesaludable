'use client';

import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthErrorPage() {

  useEffect(() => redirect(`/`), [])

  return (
    <div>
      <h1>Error temporal</h1>
      <p></p>
    </div>
  );
}
