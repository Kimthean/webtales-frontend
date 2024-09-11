import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Profile from "./Profile";
import type { Session } from "@auth/core/types";
import { signOut } from "auth-astro/client";

interface MobileNavProps {
  session: Session | null;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/search", label: "Search" },
  { href: "/history", label: "History" },
  { href: "/bookmarks", label: "Bookmark" },
];

const MobileNav = ({ session }: MobileNavProps) => {
  const handleSignOut = async () => {
    await signOut().then(() => {
      window.location.href = "/";
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="border-0 bg-skin-fill" side={"top"}>
        <div className="my-6">
          <Profile session={session} size={"sm"} />
        </div>
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-2 text-lg font-medium hover:text-skin-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {session ? (
          <>
            <hr className="my-4 border-skin-line" />
            <Button
              variant={"outline"}
              className="text-skin-accent"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </>
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
