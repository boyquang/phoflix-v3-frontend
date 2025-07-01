"use client";

interface SettingItemProps {
  label: string;
  control: React.ReactNode;
  description?: string;
  custom?: React.ReactNode;
}

const SettingItem = ({
  label,
  description,
  control,
  custom,
}: SettingItemProps) => (
  <li className="flex items-center justify-between gap-6">
    <div className="flex-1">
      <div className="xs:text-sm text-xs">
        {" "}
        <span className="text-gray-200">{label}</span>
        {description && <span className="text-gray-400"> ({description})</span>}
        {custom && <div className="inline-block">{custom}</div>}
      </div>
    </div>
    {control}
  </li>
);

export default SettingItem;
