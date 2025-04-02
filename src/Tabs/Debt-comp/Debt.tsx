import React,{useState} from 'react';

// Define types for our data
type Person = {
  id: number;
  name: string;
  age: number;
  department: string;
  status: 'active' | 'inactive' | 'on leave';
  price: number; // Assuming price is a decimal
};

// Sample data
const peopleData: Person[] = [
  { id: 1, name: 'John Doe', age: 32, department: 'Marketing', status: 'active',price: 0},
  { id: 2, name: 'Jane Smith', age: 28, department: 'Sales', status: 'active' ,price: 0},
  { id: 3, name: 'Robert Johnson', age: 45, department: 'IT', status: 'inactive' ,price: 0},
  { id: 4, name: 'Emily Davis', age: 30, department: 'HR', status: 'on leave' ,price: 0},
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },
  { id: 5, name: 'Michael Brown', age: 38, department: 'Finance', status: 'active',price: 0 },

];

// Filter options
type FilterOption = 'all' | 'active' | 'inactive' | 'on leave'| "none";
const Debt = () => {
  const [filter, setFilter] = useState<FilterOption>('none');

  // Filter data based on selected option
  const filteredData = filter === 'all' 
    ? peopleData 
    : peopleData.filter(person => person.status === filter);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">دين العاميل الحالي
      </h1>
      
      {/* Filter control */}
      <div className="mb-6 flex items-center">
        <label htmlFor="status-filter" className="mr-3 text-gray-700 font-medium">
          Filter by Status:
        </label>
        <select
          id="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterOption)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Employees</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on leave">On Leave</option>
          <option value="none">None</option>

        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr className='text-center'>
              <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                رقم
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                المزود
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاريخ
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                المنتج
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                السعر
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                العمليات
              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.department}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${person.status === 'active' ? 'bg-green-100 text-green-800' : 
                          person.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {person.price}
                      </span>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${person.status === 'active' ? 'bg-green-100 text-green-800' : 
                        person.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {person.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
لا يوجد معلومات للعميل الحالي                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Debt
