"use client";

import { useState } from "react";
import { NewsletterPopup } from "@/components/popup/newsletter-popup";
import { usePopupTrigger } from "@/lib/popup/use-popup-trigger";

export function PopupController() {
  const triggered = usePopupTrigger();
  const [dismissed, setDismissed] = useState(false);

  if (!triggered || dismissed) return null;

  return <NewsletterPopup onDismiss={() => setDismissed(true)} />;
}
