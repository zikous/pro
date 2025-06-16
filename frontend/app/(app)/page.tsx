"use client";

import { useAuth } from "@/lib/auth";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-gray-500">You are successfully authenticated!</p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">Email:</div>
            <div>{user?.email}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">User ID:</div>
            <div>{user?.id}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">Joined:</div>
            <div>
              {user?.dateJoined
                ? new Date(user.dateJoined).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
