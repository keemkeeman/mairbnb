"use client";

interface MenuItemProps {
  onClink: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClink, label }) => {
  return (
    <div
      onClick={onClink}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
    >
      {label}
    </div>
  );
};

export default MenuItem;
