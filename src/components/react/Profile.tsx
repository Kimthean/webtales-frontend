import type { Session } from "@auth/core/types";
import { signOut } from "auth-astro/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  session: Session | null;
  size?: "sm" | "md" | "lg";
}

const Profile = ({ session, size = "md" }: ProfileProps) => {
  const handleSignOut = async () => {
    try {
      await signOut().then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  if (!session) {
    return (
      <Button variant="outline" asChild className="">
        <a
          href="/auth/sign-in"
          className="text-base font-medium text-skin-accent underline"
        >
          Sign in
        </a>
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Avatar className={sizeClasses[size]}>
            <AvatarImage src={session.user?.image!} alt="User Profile" />
            <AvatarFallback>
              {session.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-64 border-0 bg-skin-fill" align="end">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Avatar className={sizeClasses.sm}>
              <AvatarImage src={session.user?.image!} alt="User Profile" />
              <AvatarFallback>
                {session.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{session.user?.name}</p>
              <p className="text-xs text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <hr />
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/history">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                History
              </a>
            </Button>
            <hr />
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/bookmarks">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                Bookmarks
              </a>
            </Button>
            <hr />
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-100 hover:text-red-700"
              onClick={handleSignOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Sign out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
