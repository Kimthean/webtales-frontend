import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, RefreshCw, AlertCircle } from "lucide-react";

import type { Session } from "@auth/core/types";

interface EpubDownloadProps {
  novelId: string;
  session: Session | null;
  epub_url: string | null;
}

const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const EpubDownload: React.FC<EpubDownloadProps> = ({
  novelId,
  session,
  epub_url,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const storedCooldownEnd = localStorage.getItem(`epubCooldown_${novelId}`);
    if (storedCooldownEnd) {
      setCooldownEnd(parseInt(storedCooldownEnd, 10));
    }
  }, [novelId]);

  const handleDownload = async () => {
    if (!session) {
      setStatus("Please log in to download EPUB files.");
      return;
    }

    if (epub_url) {
      window.open(epub_url, "_blank");
      return;
    }

    if (cooldownEnd && Date.now() < cooldownEnd) {
      const remainingTime = Math.ceil((cooldownEnd - Date.now()) / 1000 / 60);
      setStatus(
        `Please wait ${remainingTime} minute(s) before requesting again.`
      );
      return;
    }

    setIsProcessing(true);
    setStatus("Starting EPUB generation...");

    try {
      const response = await fetch(`/api/epub?id=${novelId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to start EPUB generation");
      }

      const newCooldownEnd = Date.now() + COOLDOWN_DURATION;
      setCooldownEnd(newCooldownEnd);
      localStorage.setItem(
        `epubCooldown_${novelId}`,
        newCooldownEnd.toString()
      );

      setStatus(
        "EPUB generation started. Please refresh the page in a momment."
      );
    } catch (error) {
      setStatus("Unable to start EPUB generation. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  let buttonText = "Generate EPUB";
  let ButtonIcon = Download;

  if (epub_url) {
    buttonText = "Download EPUB";
  } else if (isProcessing) {
    buttonText = "Processing...";
    ButtonIcon = Loader2;
  } else if (cooldownEnd && Date.now() < cooldownEnd) {
    const remainingTime = Math.ceil((cooldownEnd - Date.now()) / 1000 / 60);
    buttonText = `Wait ${remainingTime}m`;
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Button variant="outline" className="w-fit" onClick={handleDownload}>
          <ButtonIcon className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </div>
      {status && (
        <div className="flex items-center space-x-1 text-sm text-yellow-600 dark:text-yellow-400">
          <AlertCircle className="h-4 w-4" />
          <span>{status}</span>
        </div>
      )}
    </div>
  );
};

export default EpubDownload;
