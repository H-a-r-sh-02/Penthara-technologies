export default function EmployeeTable({ employees }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Department</th>
            <th className="p-2">Email</th>
            <th className="p-2">Office</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-b hover:bg-gray-50">
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.role}</td>
              <td className="p-2">{emp.department}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2">{emp.office}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
