import { cn } from "@/lib/utils";

type AvatarProps = {
  name?: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
};

function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ name, src, alt, size = "md" }: AvatarProps) {
  const sizes: Record<string, string> = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gray-600 text-white overflow-hidden flex-shrink-0",
        sizes[size]
      )}
      title={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-semibold">{getInitials(name)}</span>
      )}
    </div>
  );
}

export default Avatar;
