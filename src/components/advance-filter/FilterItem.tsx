"use client";

interface FilterItemProps {
  option: any;
  filter: any;
  handleSetFilter: (key: string, value: string) => void;
}

type FilterItemType = {
  _id: string;
  name: string;
  slug: string;
};

const FilterItem = ({ option, filter, handleSetFilter }: FilterItemProps) => {
  return (
    <ul className="flex flex-wrap gap-2 items-center">
      {option?.data?.map((item: FilterItemType, index: number) => (
        <li
          onClick={() => handleSetFilter(option.id, item.slug)}
          key={index}
          className={`px-4 py-2 border rounded-md lg:text-sm text-xs cursor-pointer hover:text-primary transition-colors duration-200 ease-in-out
             ${
               filter[option.id] === item.slug.toString()
                 ? "text-primary border-[#fff3]"
                 : "text-gray-50 border-transparent"
             }
          `}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default FilterItem;
