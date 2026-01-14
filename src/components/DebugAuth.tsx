// /* eslint-disable @typescript-eslint/no-explicit-any */
// // Create this file: src/components/DebugAuth.tsx
// "use client";

// import { useState } from 'react';

// export default function DebugAuth() {
//   const [debugInfo, setDebugInfo] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const runDebug = async () => {
//     setLoading(true);
//     try {
//       const isProduction = window.location.hostname.includes('craftskillsbd.com');
//       const API_URL = isProduction 
//         ? 'https://server.craftskillsbd.com/api/v1'
//         : 'http://localhost:5000/api/v1';
      
//       console.log('=== DEBUG AUTH ===');
//       console.log('Hostname:', window.location.hostname);
//       console.log('API URL:', API_URL);
//       console.log('Cookies:', document.cookie);
      
//       // Test 1: Check debug endpoint
//       const debugRes = await fetch(`${API_URL}/debug/auth`, {
//         credentials: 'include',
//       });
//       const debugData = await debugRes.json();
//       console.log('Debug endpoint:', debugData);
      
//       // Test 2: Check profile
//       const profileRes = await fetch(`${API_URL}/users/profile`, {
//         credentials: 'include',
//       });
//       const profileData = profileRes.ok ? await profileRes.json() : { error: 'Failed' };
//       console.log('Profile endpoint:', profileData);
      
//       setDebugInfo({
//         hostname: window.location.hostname,
//         apiUrl: API_URL,
//         cookies: document.cookie,
//         debug: debugData,
//         profile: profileData,
//         localStorage: {
//           currentUser: localStorage.getItem('currentUser'),
//           userFetchedAt: localStorage.getItem('userFetchedAt'),
//         }
//       });
      
//     } catch (error) {
//       console.error('Debug error:', error);
//     //   setDebugInfo({ error: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearStorage = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.reload();
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
//       <h3 className="font-bold mb-2">Auth Debug</h3>
//       <div className="space-y-2">
//         <button
//           onClick={runDebug}
//           disabled={loading}
//           className="w-full px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? 'Testing...' : 'Test Auth'}
//         </button>
        
//         <button
//           onClick={clearStorage}
//           className="w-full px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700"
//         >
//           Clear Storage
//         </button>
        
//         <button
//           onClick={() => window.location.reload()}
//           className="w-full px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
//         >
//           Reload Page
//         </button>
//       </div>
      
//       {debugInfo && (
//         <div className="mt-3 pt-3 border-t">
//           <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-60">
//             {JSON.stringify(debugInfo, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }