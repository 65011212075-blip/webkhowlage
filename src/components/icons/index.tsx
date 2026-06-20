type IconProps = {
  className?: string;
  size?: number;
};

const defaults = { size: 20, className: "" };

function svgProps({ className, size }: IconProps) {
  return {
    width: size ?? defaults.size,
    height: size ?? defaults.size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
}

export function LogoIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="19" cy="7" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M7 7.5 10 10.5M17 7.5 14 10.5M7 16.5 10 13.5M17 16.5 14 13.5" />
    </svg>
  );
}

export function RoutingIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
      <path d="M6.5 10v2.5h4M17.5 10v2.5h-4M10 14.5h4" />
    </svg>
  );
}

export function SecurityIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <path d="M12 3 20 7v5c0 4.4-3.2 7.8-8 9-4.8-1.2-8-4.6-8-9V7l8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function WirelessIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <path d="M5 12.5a10 10 0 0 1 14 0" />
      <path d="M8 15.5a6 6 0 0 1 8 0" />
      <path d="M12 19h.01" />
      <path d="M11 19.5h2" strokeWidth={2.5} />
    </svg>
  );
}

export function DatacenterIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9h16M4 15h16M9 4v16M15 4v16" />
    </svg>
  );
}

export function TroubleshootIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function TeamIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function UnplugIcon(props: IconProps) {
  const p = svgProps(props);
  return (
    <svg {...p}>
      <path d="m19 5 3-3M2 22l3-3" />
      <path d="M6.3 6.3a4.67 4.67 0 0 0 0 6.6L12 18.6l5.7-5.7a4.67 4.67 0 0 0-6.6-6.6L9 6.6" />
      <path d="M9 6.6 6.3 3.9M15 6.6l2.7-2.7" />
    </svg>
  );
}

export type CategoryIconId =
  | "routing"
  | "security"
  | "wireless"
  | "datacenter"
  | "troubleshoot";

export type FeatureIconId = "book" | "search" | "team";

const categoryIconMap = {
  routing: RoutingIcon,
  security: SecurityIcon,
  wireless: WirelessIcon,
  datacenter: DatacenterIcon,
  troubleshoot: TroubleshootIcon,
} as const;

const featureIconMap = {
  book: BookIcon,
  search: SearchIcon,
  team: TeamIcon,
} as const;

export function CategoryIcon({
  name,
  className,
  size,
}: {
  name: CategoryIconId;
  className?: string;
  size?: number;
}) {
  const Icon = categoryIconMap[name];
  return <Icon className={className} size={size} />;
}

export function FeatureIcon({
  name,
  className,
  size,
}: {
  name: FeatureIconId;
  className?: string;
  size?: number;
}) {
  const Icon = featureIconMap[name];
  return <Icon className={className} size={size} />;
}
