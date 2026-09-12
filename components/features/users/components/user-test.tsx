"use client";

import { useEffect } from "react";
import { getCurrentUser } from "../services/user.service";

export function UserTest() {
  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getCurrentUser();

        console.log("CURRENT USER:", user);
      } catch (error) {
        console.error("GET CURRENT USER ERROR:", error);
      }
    }

    loadUser();
  }, []);

  return null;
}