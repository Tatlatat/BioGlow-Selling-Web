import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZaloIcon } from "@/components/zalo-icon";
import { siteConfig } from "@/data/site-config";
import { buildTelLink, buildZaloOrderLink } from "@/lib/utils";

type Props = {
  productName?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
  layout?: "row" | "stack";
};

export function ZaloCallButtons({
  productName,
  size = "lg",
  className,
  layout = "row",
}: Props): React.ReactElement {
  const primaryPhone = siteConfig.contact.phones[0];
  const zaloUrl = buildZaloOrderLink(primaryPhone.tel, productName);
  const telUrl = buildTelLink(primaryPhone.tel);
  const stackClasses =
    layout === "stack" ? "flex flex-col gap-3" : "flex flex-col sm:flex-row gap-3";

  return (
    <div className={`${stackClasses} ${className ?? ""}`}>
      <Button variant="warm" size={size} asChild>
        <a href={zaloUrl} target="_blank" rel="noopener noreferrer">
          <ZaloIcon className="h-5 w-5" />
          {productName ? "Đặt qua Zalo" : "Tư vấn qua Zalo"}
        </a>
      </Button>
      <Button variant="outline" size={size} asChild>
        <a href={telUrl}>
          <Phone className="h-5 w-5" />
          Gọi {primaryPhone.display}
        </a>
      </Button>
    </div>
  );
}
