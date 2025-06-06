import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-700 mt-2">
        You do not have the required permissions to view this page.
      </p>
    </div>
  );
}
