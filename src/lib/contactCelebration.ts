export const CONTACT_CELEBRATION_EVENT = "contact-celebration";

export function triggerContactCelebration(source?: { clientX?: number; clientY?: number }) {
  if (typeof window === "undefined") return;
  const hasCoordinates =
    typeof source?.clientX === "number" && typeof source?.clientY === "number" &&
    (source.clientX > 0 || source.clientY > 0);
  const detail = {
    x: hasCoordinates ? source.clientX : window.innerWidth / 2,
    y: hasCoordinates ? source.clientY : Math.min(window.innerHeight * 0.32, 260),
  };
  window.dispatchEvent(new CustomEvent(CONTACT_CELEBRATION_EVENT, { detail }));
}
