"use client"

import { useAuth } from "@/lib/contexts/auth-provider"

export default function TestPage() {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Page</h1>
      <p className="text-gray-600">This is a test page to verify routing is working.</p>
      
      <div className="mt-4 p-4 bg-green-100 rounded">
        <p className="text-green-800">✅ If you can see this, routing is working!</p>
      </div>

      <div className="mt-4 p-4 bg-blue-100 rounded">
        <h3 className="font-semibold mb-2">Authentication Status:</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="mt-4 p-4 bg-yellow-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>User ID: {user?.userID || 'Not set'}</p>
        <p>Roles: {user?.roles?.join(', ') || 'No roles'}</p>
        <p>Email: {user?.email || 'No email'}</p>
      </div>
    </div>
  )
} 