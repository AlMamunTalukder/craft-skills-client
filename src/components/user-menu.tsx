/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   ChevronDown,
//   LayoutDashboard,
//   LogIn,
//   LogOut,
//   User,
// } from "lucide-react";
// import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { logout } from "../lib/currentUser";

// type UserMenuProps = {
//   user: any | null;
// };

// const studentMenuItems = [
//   { label: "Dashboard", icon: LayoutDashboard, href: "/profile" },
//   { label: "My Profile", icon: User, href: "/profile" },
// ];

// export default function UserMenu({ user }: UserMenuProps) {
//   const [open, setOpen] = useState(false); 

//   const handleSignOut = async () => {
//     await logout();
//     window.location.href = "/login";
//   };

//   const getInitials = (name: string | null | undefined): string => {
//     return (
//       name
//         ?.split(" ")
//         .map((n) => n[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase() || "U"
//     );
//   };

//   const getAvatarUrl = () => {
//     if (user?.image) return user.image;
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(
//       user?.name ,
//     )}&background=6366f1&color=ffffff&size=128`;
//   };

//   if (!user) {
//     return (
//       <Button
//         asChild
//         className="gap-2 px-4 py-2 font-medium bg-white border text-black hover:bg-gray-300"
//       >
//         <Link href="/login">
//           <LogIn className="size-4" />
//           Sign in
//         </Link>
//       </Button>
//     );
//   }

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           className="gap-2 px-3 py-2 h-auto hover:bg-accent/50"
//         >
//           <Avatar className="size-7 rounded-lg ring-1 ring-border/20">
//             <AvatarImage src={getAvatarUrl()} alt={user.name} />
//             <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs">
//               {getInitials(user.name)}
//             </AvatarFallback>
//           </Avatar>
//           <div className="truncate max-w-32 text-sm font-medium">
//             {user.name }
//           </div>
//           <ChevronDown
//             className={`size-4 transition-transform ${
//               open ? "rotate-180" : ""
//             }`}
//           />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         className="w-64 rounded-xl shadow-lg border-border/50 bg-background/95"
//         sideOffset={8}
//         align="end"
//       >
//         <DropdownMenuLabel className="p-0 font-normal">
//           <div className="flex items-center gap-3 px-3 py-3">
//             <Avatar className="size-10 rounded-xl ring-2 ring-border/10">
//               <AvatarImage src={getAvatarUrl()} alt={user.name  } />
//               <AvatarFallback className="rounded-xl bg-primary text-primary-foreground font-semibold">
//                 {getInitials(user.name)}
//               </AvatarFallback>
//             </Avatar>
//             <div className="grid flex-1 text-left leading-tight">
//               <span className="truncate font-semibold text-sm">
//                 {user.name}
//               </span>
//               <span className="text-muted-foreground truncate text-xs mt-0.5">
//                 {user.email || user.phone }
//               </span>
//               <span className="text-xs text-blue-600 mt-0.5">
//                 {user.batchNumber}
//               </span>
//             </div>
//           </div>
//         </DropdownMenuLabel>

//         <DropdownMenuSeparator />

//         <DropdownMenuGroup className="px-1">
//           {studentMenuItems.map((item) => (
//             <DropdownMenuItem 
//               key={item.label} 
//               className="gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-accent/50"
//               asChild
//             >
//               <Link href={item.href}>
//                 <item.icon className="size-4" />
//                 <span className="font-medium text-sm">{item.label}</span>
//               </Link>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuGroup>

//         <DropdownMenuSeparator />

//         <div className="px-1 pb-1">
//           <DropdownMenuItem
//             className="gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50"
//             onClick={handleSignOut}
//           >
//             <LogOut className="size-4" />
//             <span className="font-medium text-sm">Sign out</span>
//           </DropdownMenuItem>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


// src/components/user-menu/index.tsx - COMPLETE FIXED VERSION
"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const studentMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/profile" },
  { label: "My Profile", icon: User, href: "/profile" },
];

// Client-side logout function
const clientLogout = async () => {
  try {
    const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('craftskillsbd.com');
    const API_URL = isProduction 
      ? 'https://server.craftskillsbd.com/api/v1'
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    
    console.log('Logout from:', API_URL);
    
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST", 
      credentials: "include",
    });

    // Clear all client-side storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      const cookieName = c.split("=")[0].trim();
      const domain = isProduction ? '.craftskillsbd.com' : 'localhost';
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
    });

    return response.json();

  } catch (error: any) {
    console.error('Logout error:', error);
    return { success: false, message: error.message || "Logout failed" };
  }
};

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const isProduction = window.location.hostname.includes('craftskillsbd.com');
        const API_URL = isProduction 
          ? 'https://server.craftskillsbd.com/api/v1'
          : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        
        console.log('UserMenu fetching user from:', API_URL);
        console.log('Current hostname:', window.location.hostname);
        console.log('Cookies:', document.cookie);
        
        const response = await fetch(`${API_URL}/users/profile`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        
        console.log('Profile response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Profile data:', data);
          
          if (data.success && data.data) {
            setUser(data.data);
            
            // Store in localStorage for persistence
            localStorage.setItem('currentUser', JSON.stringify(data.data));
            localStorage.setItem('userFetchedAt', Date.now().toString());
          } else {
            setUser(null);
            localStorage.removeItem('currentUser');
          }
        } else {
          console.log('Profile fetch failed:', response.status);
          setUser(null);
          localStorage.removeItem('currentUser');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };

    // Try to load from localStorage first (for faster display)
    const storedUser = localStorage.getItem('currentUser');
    const fetchedAt = localStorage.getItem('userFetchedAt');
    
    if (storedUser && fetchedAt) {
      const timeSinceFetch = Date.now() - parseInt(fetchedAt);
      // Use cached user if it's less than 5 minutes old
      if (timeSinceFetch < 5 * 60 * 1000) {
        try {
          setUser(JSON.parse(storedUser));
          setLoading(false);
        } catch {
          // If parsing fails, fetch fresh data
          fetchUser();
        }
      } else {
        // Cache expired, fetch fresh data
        fetchUser();
      }
    } else {
      // No cache, fetch fresh data
      fetchUser();
    }

    // Listen for login/logout events
    const handleAuthEvent = (event: StorageEvent) => {
      if (event.key === 'auth-state-changed') {
        console.log('Auth state changed, refetching user...');
        fetchUser();
      }
    };

    window.addEventListener('storage', handleAuthEvent);
    
    // Also check for login redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      // Clear the parameter and refetch
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => {
        fetchUser();
      }, 1000);
    }

    return () => {
      window.removeEventListener('storage', handleAuthEvent);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await clientLogout();
      
      // Clear local state
      setUser(null);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userFetchedAt');
      localStorage.setItem('auth-state-changed', Date.now().toString());
      
      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error('Sign out error:', error);
      window.location.href = "/login";
    } finally {
      setIsLoggingOut(false);
    }
  };

  // const handleSignOut = async () => {
  //   await logout();
  //   window.location.href = "/login";
  // };

  const getInitials = (name: string | null | undefined): string => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );
  };

  const getAvatarUrl = () => {
    if (user?.image) return user.image;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || 'User'
    )}&background=6366f1&color=ffffff&size=128`;
  };

  if (loading) {
    return (
      <Button
        variant="outline"
        className="gap-2 px-3 py-2 h-auto hover:bg-accent/50"
        disabled
      >
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        <span className="text-sm">Loading...</span>
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        asChild
        className="gap-2 px-4 py-2 font-medium bg-white border text-black hover:bg-gray-300"
      >
        <Link href="/login">
          <LogIn className="size-4" />
          Sign in
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 px-3 py-2 h-auto hover:bg-accent/50"
        >
          <Avatar className="size-7 rounded-lg ring-1 ring-border/20">
            <AvatarImage src={getAvatarUrl()} alt={user.name} />
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="truncate max-w-32 text-sm font-medium">
            {user.name}
          </div>
          <ChevronDown
            className={`size-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 rounded-xl shadow-lg border-border/50 bg-background/95"
        sideOffset={8}
        align="end"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-3 py-3">
            <Avatar className="size-10 rounded-xl ring-2 ring-border/10">
              <AvatarImage src={getAvatarUrl()} alt={user.name} />
              <AvatarFallback className="rounded-xl bg-primary text-primary-foreground font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-semibold text-sm">
                {user.name}
              </span>
              <span className="text-muted-foreground truncate text-xs mt-0.5">
                {user.email || user.phone || 'No contact info'}
              </span>
              {user.batchNumber && (
                <span className="text-xs text-blue-600 mt-0.5">
                  Batch {user.batchNumber}
                </span>
              )}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="px-1">
          {studentMenuItems.map((item) => (
            <DropdownMenuItem 
              key={item.label} 
              className="gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-accent/50"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="size-4" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="px-1 pb-1">
          <DropdownMenuItem
            className="gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 disabled:opacity-50"
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            ) : (
              <LogOut className="size-4" />
            )}
            <span className="font-medium text-sm">
              {isLoggingOut ? 'Logging out...' : 'Sign out'}
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}