"use client";

interface FilterItemProps {
  option: any;
  filter: any;
  handleSetFilter: (key: string, value: string) => void;
}

const FilterItem = ({ option, filter, handleSetFilter }: FilterItemProps) => {
  return (
    <ul className="flex flex-wrap gap-4 items-center">
      {option?.data?.map((item: any, index: number) => (
        <li
          onClick={() => handleSetFilter(option.id, item.slug)}
          key={index}
          className={`px-2 py-1 border rounded-md lg:text-sm text-xs cursor-pointer hover:text-[#ffd875] transition-colors duration-200 ease-in-out
             ${
               filter[option.id] === item.slug
                 ? "text-[#ffd875] border-[#fff3]"
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
