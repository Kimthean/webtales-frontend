import type { Session } from "@auth/core/types";
import { signOut } from "auth-astro/client";
import { useState } from "preact/hooks";

const Profile = ({ session }: { session: Session | null }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut().then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const profileContent = session ? (
    <div
      id="profile-dropdown"
      className={`absolute right-0 top-full mt-2 w-44 rounded-lg border bg-white shadow-md ${isDropdownVisible ? "flex" : "hidden"}`}
    >
      <ul class="w-full py-2">
        <li class="px-4 py-2 hover:bg-gray-100">
          <a
            href="/profile"
            class="block min-w-full text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Profile
          </a>
        </li>
        <li class="px-4 py-2 hover:bg-gray-100">
          <button
            onClick={handleSignOut}
            class="block text-sm font-medium text-red-600 hover:text-red-700"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  ) : null;

  return (
    <div class="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        class="flex items-center justify-center"
        aria-haspopup="true"
        aria-expanded={isDropdownVisible ? "true" : "false"}
      >
        {session ? (
          <img
            src={session.user?.image!}
            alt="User Profile"
            class="h-8 w-8 rounded-full"
          />
        ) : (
          <a
            href="/auth/sign-in"
            class="flex items-center justify-center py-3 text-center text-base font-medium text-skin-accent"
          >
            Sign in
          </a>
        )}
      </button>
      {profileContent}
    </div>
  );
};

export default Profile;
