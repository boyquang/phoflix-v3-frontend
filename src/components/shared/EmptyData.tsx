"use client";

import EmojiDizzyIcon from "@/components/icons/EmojiDizzyIcon";
import { EmptyState, VStack } from "@chakra-ui/react";

interface EmptyDataProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyData = ({ title, description, icon, className }: EmptyDataProps) => {
  return (
    <EmptyState.Root className={className}>
      <EmptyState.Content gap={2}>
        <EmptyState.Indicator>
          {icon || <EmojiDizzyIcon />}
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title className="text-gray-50">{title}</EmptyState.Title>
          {description && (
            <EmptyState.Description className="text-gray-50">
              {description}
            </EmptyState.Description>
          )}
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default EmptyData;
