"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthProtected ({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [user, router]);

  if (!checked) {
    return null; 
  }

  return <>{children}</>;
};


