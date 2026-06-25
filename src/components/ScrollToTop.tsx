import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function ScrollToTop() {
  const pathname = useLocation().pathname;
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, searchParams]);

  return null;
}
