import { useState, useEffect } from "preact/hooks";

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState("16");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontFamily, setFontFamily] = useState("'IBM Plex Mono', monospace");
  const [isAutoFetchEnabled, setIsAutoFetchEnabled] = useState(false);

  useEffect(() => {
    const storedFontSize = localStorage.getItem("readerFontSize") || "16";
    const storedFontWeight = localStorage.getItem("readerFontWeight") || "400";
    const storedFontFamily =
      localStorage.getItem("readerFontFamily") || "'IBM Plex Mono', monospace";
    const storedAutoFetch = localStorage.getItem("autoFetchEnabled") === "true";

    setFontSize(storedFontSize);
    setFontWeight(storedFontWeight);
    setFontFamily(storedFontFamily);
    setIsAutoFetchEnabled(storedAutoFetch);

    updateStyles(storedFontSize, storedFontWeight, storedFontFamily);
  }, []);

  const updateStyles = (size: string, weight: string, family: string) => {
    document.documentElement.style.setProperty("--font-size", `${size}px`);
    document.documentElement.style.setProperty("--font-weight", weight);
    document.documentElement.style.setProperty("--font-family", family);
  };

  const handleSettingChange = (setting: string, value: string) => {
    switch (setting) {
      case "fontSize":
        setFontSize(value);
        localStorage.setItem("readerFontSize", value);
        break;
      case "fontWeight":
        setFontWeight(value);
        localStorage.setItem("readerFontWeight", value);
        break;
      case "fontFamily":
        setFontFamily(value);
        localStorage.setItem("readerFontFamily", value);
        break;
    }
    updateStyles(fontSize, fontWeight, fontFamily);
  };

  const handleAutoFetchChange = (e: Event) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    setIsAutoFetchEnabled(isChecked);
    localStorage.setItem("autoFetchEnabled", isChecked.toString());
  };

  return (
    <div class="settings-panel mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        class="flex transform items-center justify-center rounded-full bg-skin-card px-4 py-2 text-center shadow-2xl transition duration-300 ease-in-out hover:scale-105 hover:bg-skin-card-muted"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block h-5 w-5 sm:mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p class="hidden sm:block">Settings</p>
      </button>
      {isOpen && (
        <div class="mt-4 rounded-lg bg-skin-card p-6 shadow-lg">
          <h3 class="mb-4 text-lg font-semibold">Reading Preferences</h3>
          <div class="mb-4">
            <label for="fontSize" class="mb-2 block">
              Font Size: <span>{fontSize}px</span>
            </label>
            <select
              id="fontSize"
              value={fontSize}
              onChange={e =>
                handleSettingChange("fontSize", e.currentTarget.value)
              }
              class="w-full rounded border border-skin-line bg-skin-fill p-2"
            >
              {[12, 14, 16, 18, 20, 22, 24].map(size => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>
          <div class="mb-4">
            <label for="fontWeight" class="mb-2 block">
              Font Weight: <span>{fontWeight}</span>
            </label>
            <select
              id="fontWeight"
              value={fontWeight}
              onChange={e =>
                handleSettingChange("fontWeight", e.currentTarget.value)
              }
              class="w-full rounded border border-skin-line bg-skin-fill p-2"
            >
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </div>
          <div class="mb-4">
            <label for="fontFamily" class="mb-2 block">
              Font Family:
            </label>
            <select
              id="fontFamily"
              value={fontFamily}
              onChange={e =>
                handleSettingChange("fontFamily", e.currentTarget.value)
              }
              class="w-full rounded border border-skin-line bg-skin-fill p-2"
            >
              <option value="'IBM Plex Mono', monospace">IBM Plex Mono</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Lato', sans-serif">Lato</option>
              <option value="'Merriweather', serif">Merriweather</option>
              <option value="'Source Sans Pro', sans-serif">
                Source Sans Pro
              </option>
              <option value="'Nunito', sans-serif">Nunito</option>
              <option value="'Ubuntu', sans-serif">Ubuntu</option>
              <option value="'Fira Sans', sans-serif">Fira Sans</option>
              <option value="'Noto Sans', sans-serif">Noto Sans</option>
            </select>
          </div>
          <div class="mt-4">
            <label for="autoFetch" class="flex items-center">
              <input
                type="checkbox"
                id="autoFetch"
                checked={isAutoFetchEnabled}
                onChange={handleAutoFetchChange}
                class="mr-2"
              />
              Enable Auto-Fetch Next Chapter
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
