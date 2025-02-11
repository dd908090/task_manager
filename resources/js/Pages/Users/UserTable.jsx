import TableHeading from "@/Components/TableHeading.jsx";
import {Link, router} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";

export default function UserTable({users, queryParams,}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("user.index", queryParams));
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
    router.get(route("user.index", queryParams));
  };

  const deleteUser = (user) => {
    if (!window.confirm('Are y sure?')) {
      return;
    }
    router.delete(route('user.destroy', user.id))
  }


  return (<>
    <div className="overflow-auto">
      <table className="table-auto w-full text-left border-collapse ">
        <thead>
        <tr className="bg-gray-700">
          <TableHeading name='id' label='ID' queryParams={queryParams} sortChanged={sortChanged}
                        sortable={true}/>
          <TableHeading name='name' label='Name' queryParams={queryParams} sortChanged={sortChanged}
                        sortable={true}/>
          <TableHeading name='email' label='Email' queryParams={queryParams} sortChanged={sortChanged}
                        sortable={true}/>
          <TableHeading name='created_at' label='Created Date' queryParams={queryParams}
                        sortChanged={sortChanged} sortable={true}/>
          <TableHeading label='Actions' sortChanged={sortChanged} sortable={false}/>
        </tr>
        </thead>

        <thead>
        <tr>
        <th className="p-3 border-b border-gray-600"></th>

        <th className="p-3 border-b border-gray-600">
          <TextInput
            className="w-full"
            defaultValue={queryParams.name}
            placeholder="User Name"
            onBlur={(e) => searchFieldChanged("name", e.target.value)}
            onKeyPress={(e) => onKeyPress("name", e)}
          />
        </th>

        <th className="p-3 border-b border-gray-600">
          <TextInput
            className="w-full"
            defaultValue={queryParams.email}
            placeholder="User Email"
            onBlur={(e) => searchFieldChanged("email", e.target.value)}
            onKeyPress={(e) => onKeyPress("email", e)}
          />
        </th>

        <th className="p-3 border-b border-gray-600"></th>

        <th className="p-3 border-b border-gray-600"></th>
        </tr>
        </thead>

        <tbody>
        {users.data.map((user) => (<tr className="hover:bg-gray-600" key={user.id}>

          <td className="p-3 border-b border-gray-600">{user.id}</td>
          <td className="p-3 border-b border-gray-600">{user.name}</td>
          <td className="p-3 border-b border-gray-600">{user.email}</td>
          <td className="p-3 border-b border-gray-600 text-nowrap">{user.created_at}</td>
          <td className="p-3 border-b border-gray-600 text-left text-nowrap">
            <Link
              href={route("user.edit", user.id)}
              className="font-medium text-blue-600 dark:text-blue-900 hover:underline mx-1"
            >
              Edit
            </Link>
            <button
              onClick={e => deleteUser(user)}
              className="font-medium text-red-600 dark:text-red-900 hover:underline mx-1"
            >
              Delete
            </button>
          </td>
        </tr>))}
        </tbody>
      </table>
    </div>

  </>)
}
