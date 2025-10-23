"use client";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import Link from "next/link";

interface AccordionListProps {
  label: string;
  items: CategoryMovie[] | CountryMovie[] | TypeMovie[];
  path: string;
  callback: () => void;
}

const AccordionList = ({
  label,
  items,
  path,
  callback,
}: AccordionListProps) => (
  <AccordionRoot collapsible className="text-sm">
    <AccordionItem value={label} className="border-none">
      <AccordionItemTrigger className="text-sm px-2 cursor-pointer hover:bg-[#ffffff05] rounded-sm">{label}</AccordionItemTrigger>
      <AccordionItemContent>
        <ul className="flex flex-col gap-1 px-2">
          {items.map((item) => (
            <li key={item._id} onClick={callback}>
              <Link
                href={`${path}/${item.slug}`}
                className="flex text-sm w-full p-2 rounded-sm transition-all hover:bg-[#ffffff05]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionItemContent>
    </AccordionItem>
  </AccordionRoot>
);

export default AccordionList;
