import { permanentRedirect } from "next/navigation";
import { getQuoteUrl } from "@/lib/site";

export default function RequestQuotePage() {
  permanentRedirect(getQuoteUrl({ placement: "legacy-request-a-quote" }));
}
