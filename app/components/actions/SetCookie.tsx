"use client";

import { useEffect } from "react";

const SetCookie = () => {
  useEffect(() => {
    async function fetchUserId() {
      const response = await fetch(window.location.href, {
        method: "GET",
      });

      const userId = response.headers.get("x-user-id-cache");
      if (userId && userId !== "null") {
        localStorage.setItem("user_id_cache", userId);
      }
    }

    fetchUserId();
  }, []);

  return null; // Este componente no renderiza nada
};

export default SetCookie;
