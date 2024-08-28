import { useEffect, useState } from "preact/hooks";
import ChapterList from "./ChapterList";

function ChapterModal({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div class="relative">
      <button
        onClick={() => setOpen(!open)}
        class="rounded-full bg-skin-card-muted p-2 opacity-50 transition-all"
        aria-label="Toggle chapters"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {open && (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div class="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-skin-card p-4">
            <div class="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                class="text-skin-base hover:text-skin-accent"
                aria-label="Close chapters"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ChapterList id={id} pageSize={100} initialPage={1} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChapterModal;
