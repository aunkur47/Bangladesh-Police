/**
 * Mount once near the document root so the Grok preview chrome can drive
 * navigation. Noops when the app is not embedded.
 */

import { useEffect } from "react";
import { installPreviewHostBridge } from "@/lib/preview-host-bridge";

export function PreviewHostBridge() {
  useEffect(() => {
    return installPreviewHostBridge({
      getRoutePaths: () => ["/", "/login"],
    });
  }, []);

  return null;
}
