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
  onChangeRole: (
    id: string,
    role: "admin" | "member",
  ) => void;
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
        <Select.Trigger>
          <Select.ValueText className="text-gray-900 min-w-32 border-gray-400 focus:border-gray-50" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Select.Content>
            {options.items.map((option) => (
              <Select.Item item={option} key={option.value}>
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
