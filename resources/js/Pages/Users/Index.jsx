import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import UserTable from "@/Pages/Users/UserTable.jsx";

export default function Index({auth, users, queryParams = null, success}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("user.index", queryParams));
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

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };


  return (<AuthenticatedLayout
    user={auth.user}
    header={<div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        Users
      </h2>

      <Link href={route('user.create')}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
        Create User
      </Link>
    </div>}
  >
    <Head title="Users"/>



    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {success && (<div className='bg-emerald-500 py-2 px-4 mb-4 text-white rounded '>
          {success}
        </div>)}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <UserTable users={users} queryParams={queryParams}/>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>);
}
