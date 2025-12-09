interface BadgeProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "gray";
}

export function Badge({ children, color = "blue" }: BadgeProps) {
  const colors = {
    blue: "bg-[#007acc]/10 text-[#007acc] border-[#007acc]/30",
    green: "bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30",
    gray: "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium border rounded-md ${colors[color]}`}
    >
      {children}
    </span>
  );
}
