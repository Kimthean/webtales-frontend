import { useState, useEffect } from "preact/hooks";
import Cookie from "js-cookie";

const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState("16");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontFamily, setFontFamily] = useState("'San Serif', sans-serif");
  const [isAutoFetchEnabled, setIsAutoFetchEnabled] = useState(false);

  useEffect(() => {
    const storedFontSize = Cookie.get("readerFontSize") || "16";
    const storedFontWeight = Cookie.get("readerFontWeight") || "400";
    const storedFontFamily =
      Cookie.get("readerFontFamily") || "'IBM Plex Mono', monospace";
    const storedAutoFetch = Cookie.get("autoFetchEnabled") === "true";

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
    let newFontSize = fontSize;
    let newFontWeight = fontWeight;
    let newFontFamily = fontFamily;

    switch (setting) {
      case "fontSize":
        setFontSize(value);
        Cookie.set("readerFontSize", value);
        newFontSize = value;
        break;
      case "fontWeight":
        setFontWeight(value);
        Cookie.set("readerFontWeight", value);
        newFontWeight = value;
        break;
      case "fontFamily":
        setFontFamily(value);
        Cookie.set("readerFontFamily", value);
        newFontFamily = value;
        break;
    }
    updateStyles(newFontSize, newFontWeight, newFontFamily);
  };

  const handleAutoFetchChange = (e: any) => {
    const isChecked = e.target.checked;
    setIsAutoFetchEnabled(isChecked);
    Cookie.set("autoFetchEnabled", isChecked.toString());
    window.location.reload();
  };

  return (
    <div className="settings-panel relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex transform items-center justify-center rounded-full bg-skin-card-muted p-2 text-center opacity-50 transition duration-300 ease-in-out hover:scale-105"
        aria-label="Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block size-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-72 rounded-lg bg-skin-card p-4 shadow-lg">
          <h3 className="mb-2 text-sm font-semibold">Reading Preferences</h3>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="fontSize" className="text-xs">
              Font Size
            </label>
            <select
              id="fontSize"
              value={fontSize}
              onChange={e =>
                handleSettingChange("fontSize", e.currentTarget.value)
              }
              className="w-1/2 rounded border border-skin-line bg-skin-fill p-1 text-xs"
            >
              {[12, 14, 16, 18, 20, 22, 24].map(size => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="fontWeight" className="text-xs">
              Font Weight
            </label>
            <select
              id="fontWeight"
              value={fontWeight}
              onChange={e =>
                handleSettingChange("fontWeight", e.currentTarget.value)
              }
              className="w-1/2 rounded border border-skin-line bg-skin-fill p-1 text-xs"
            >
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="fontFamily" className="text-xs">
              Font Family
            </label>
            <select
              id="fontFamily"
              value={fontFamily}
              defaultValue="'San Serif', sans-serif"
              onChange={e =>
                handleSettingChange("fontFamily", e.currentTarget.value)
              }
              className="w-1/2 rounded border border-skin-line bg-skin-fill p-1 text-xs"
            >
              <option value="'San Serif', sans-serif">San Serif</option>
              <option value="'IBM Plex Mono', monospace">IBM Plex Mono</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Lato', sans-serif">Lato</option>
              <option value="'Merriweather', serif">Merriweather</option>
            </select>
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="autoFetch"
              checked={isAutoFetchEnabled}
              onChange={handleAutoFetchChange}
              className="mr-2"
            />
            <label htmlFor="autoFetch" className="text-xs">
              Infinite Scroll
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
