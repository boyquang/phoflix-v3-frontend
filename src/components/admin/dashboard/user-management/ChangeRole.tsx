"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";

const options = createListCollection({
  items: [
    { label: "Quản trị viên", value: "admin" },
    { label: "Thành viên", value: "member" },
  ],
});

interface ChangeRoleProps {
  userId: string;
  role: "admin" | "member";
  onChangeRole: (id: string, role: "admin" | "member") => void;
}

const ChangeRole = ({ userId, role, onChangeRole }: ChangeRoleProps) => {
  return (
    <Select.Root
      collection={options}
      size="sm"
      value={[role]}
      onValueChange={(details) =>
        onChangeRole(userId, details?.value?.[0] as "admin" | "member")
      }
    >
      <Select.HiddenSelect />

      <Select.Control>
        <Select.Trigger className="min-w-34 px-3 py-2 border rounded-md bg-transparent text-white border-[#ffffff10] hover:border-white transition-colors duration-150">
          <Select.ValueText />
          <Select.IndicatorGroup>
            <Select.Indicator className="text-white" />
          </Select.IndicatorGroup>
        </Select.Trigger>
      </Select.Control>

      <Portal>
        <Select.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Select.Content className="rounded-md border border-[#ffffff10] bg-[#1a1a1a] text-white shadow-lg">
            {options.items.map((option) => (
              <Select.Item
                item={option}
                key={option.value}
                className="px-3 py-2 cursor-pointer hover:bg-[#ffffff10] data-[state=checked]:bg-[#ffffff10] rounded"
              >
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default ChangeRole;
