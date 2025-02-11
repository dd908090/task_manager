import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constans.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TaskTable({
                                    tasks, queryParams, hideProjectColumn = false, success
                                  }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index", queryParams));
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.index", queryParams));
  };

  const deleteTask = (task) => {
    if (!window.confirm('Are y sure?')) {
      return;
    }
    router.delete(route('task.destroy', task.id))
  }


  return (<>
    <div className="overflow-auto">
      <table className="table-auto w-full text-left border-collapse ">
        <thead>
        <tr className="bg-gray-700">
          <TableHeading name='id' label='ID' queryParams={queryParams}
                        sortChanged={sortChanged} sortable={true}/>
          <TableHeading name='image' label='Image' queryParams={queryParams}
                        sortChanged={sortChanged} sortable={false}/>
          <TableHeading name='name' label='Name' queryParams={queryParams}
                        sortChanged={sortChanged} sortable={true}/>
          {!hideProjectColumn && (<TableHeading name='task' label='Project Name' queryParams={queryParams}
                                                sortChanged={sortChanged} sortable={true}/>)}
          <TableHeading name='status' label='Status' queryParams={queryParams}
                        sortChanged={sortChanged} sortable={false}/>
          <TableHeading name='created_at' label='Created Date' queryParams={queryParams}
                        sortChanged={sortChanged} sortable={true}/>
          <TableHeading name='due_date' label='Due Date' queryParams={queryParams}
                        sortChanged={sortChanged} sortable={true}/>
          <TableHeading label='Created By' sortChanged={sortChanged} sortable={false}/>
          <TableHeading label='Actions' sortChanged={sortChanged} sortable={false}/>
        </tr>
        </thead>

        <thead>
        <tr className="bg-gray-700">
          <th className="p-3 border-b border-gray-600"></th>
          <th className="p-3 border-b border-gray-600"></th>
          <th className="p-3 border-b border-gray-600">
            <TextInput
              className="w-full"
              defaultValue={queryParams.name}
              placeholder="Task Name"
              onBlur={(e) => searchFieldChanged("name", e.target.value)}
              onKeyPress={(e) => onKeyPress("name", e)}
            />
          </th>
          <th className="p-3 border-b border-gray-600"></th>
          <th className="p-3 border-b border-gray-600">
            <SelectInput
              className="w-full"
              defaultValue={queryParams.status}
              onChange={(e) => searchFieldChanged("status", e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </SelectInput>
          </th>
          <th className="p-3 border-b border-gray-600"></th>
          <th className="p-3 border-b border-gray-600"></th>
          <th className="p-3 border-b border-gray-600"></th>
          {!hideProjectColumn && (<th className="p-3 border-b border-gray-600"></th>)}
        </tr>
        </thead>
        <tbody>
        {tasks.data.map((task) => (<tr className="hover:bg-gray-600" key={task.id}>
          <td className="p-3 border-b border-gray-600">{task.id}</td>
          <th className="p-3 border-b border-gray-600"><img alt='' src={task.image_path} style={{width: 60}}/></th>
          <th className="p-3 border-b border-gray-600 text-white hover:underline">
            <Link href={route("task.show", task.id)}>
              {task.name}
            </Link>
          </th>

          {!hideProjectColumn && (<td className="p-3 border-b border-gray-600">{task.project.name}</td>)}
          <td className="p-3 border-b border-gray-600">
                          <span
                            className={`px-3 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
          </td>
          <td className="p-3 border-b border-gray-600 text-nowrap">{task.created_at}</td>
          <td className="p-3 border-b border-gray-600 text-nowrap">{task.due_date}</td>
          <td className="p-3 border-b border-gray-600">{task.createdBy.name}</td>
          <td className="p-3 border-b border-gray-600 text-right text-nowrap">
            <Link
              href={route("task.edit", task.id)}
              className="font-medium text-blue-600 dark:text-blue-900 hover:underline mx-1"
            >
              Edit
            </Link>
            <button
              onClick={(e) => deleteTask(task)}
              className="font-medium text-red-600 dark:text-red-900 hover:underline mx-1"
            >
              Delete
            </button>
          </td>
        </tr>))}
        </tbody>
      </table>
    </div>
    <Pagination links={tasks.meta.links}/>
  </>)
}
