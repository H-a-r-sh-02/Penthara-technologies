export default function EmployeeTable({ data, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow mt-4 overflow-hidden">
      <div className="grid grid-cols-6 gap-2 px-4 py-2 font-semibold bg-gray-50">
        <div>Name</div><div>Role</div><div>Department</div><div>Email</div><div>Office</div><div className="text-right">Actions</div>
      </div>
      {data.map((e)=>(
        <div key={e._id} className="grid grid-cols-6 gap-2 px-4 py-3 border-t">
          <div>{e.name}</div>
          <div>{e.role}</div>
          <div>{e.department}</div>
          <div>{e.email || "—"}</div>
          <div>{e.office || "—"}</div>
          <div className="text-right">
            <button className="text-red-600" onClick={()=>onDelete(e._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
