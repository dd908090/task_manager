import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";
import {router} from "@inertiajs/react";

export default function TableHeading({name,
                                       label,
                                       queryParams,
                                       sortable,
                                       sortChanged = () => {}}) {


  if (sortable) {
    return (<th
      key={name}
      onClick={() => sortChanged(name)}
      className="p-3 border-b border-gray-600 text-left align-middle cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <div className="flex flex-col ml-2 ">
          <ChevronUpIcon
            className={"w-4 h-4 " + (queryParams.sort_field === name && queryParams.sort_direction === "asc" ? 'text-indigo-600' : "")}/>
          <ChevronDownIcon
            className={"w-4 h-4 -mt-1 " + (queryParams.sort_field === name && queryParams.sort_direction === "desc" ? 'text-indigo-600' : "")}/>
        </div>
      </div>
    </th>)
  } else {
    return (<th className="p-3 border-b border-gray-600 text-left align-middle">{label}</th>)
  }


}
