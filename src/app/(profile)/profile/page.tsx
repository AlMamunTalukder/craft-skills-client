import { currentUser } from "@/src/lib/currentUser";
import React from "react";

export const dynamic = "force-dynamic";

const page = async () => {
  const user = await currentUser();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      {user ? (
        <div>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default page;
