import * as React from "react";

type Props = React.SVGAttributes<SVGSVGElement>;

export function ZaloIcon({ className, ...props }: Props): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.03 2 11c0 2.79 1.41 5.28 3.64 6.94L4.5 21.5l3.95-1.42c1.1.34 2.3.52 3.55.52 5.523 0 10-4.03 10-9s-4.477-9-10-9z"
      />
      <text
        x="12"
        y="13.5"
        fontFamily="Arial, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        textAnchor="middle"
        fill="white"
      >
        Zalo
      </text>
    </svg>
  );
}
