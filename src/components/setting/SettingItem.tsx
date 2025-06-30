"use client";

interface SettingItemProps {
  label: string;
  description?: string;
  control: React.ReactNode;
}

const SettingItem = ({ label, description, control }: SettingItemProps) => (
  <li className="flex items-center justify-between gap-6">
    <div className="flex-1">
      <span className="xs:text-sm text-xs text-gray-200">
        {" "}{label}
        {description && <span className="text-primary"> ({description})</span>}
      </span>
    </div>
    {control}
  </li>
);

export default SettingItem;
