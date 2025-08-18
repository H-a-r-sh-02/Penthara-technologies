export default function EmployeeForm({ onSubmit, form, setForm }) {
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(); }}
      className="bg-white rounded-xl shadow p-4 grid gap-2 md:grid-cols-5">
      <input className="border p-2 rounded" placeholder="Name" value={form.name}
             onChange={(e)=>setForm({...form, name:e.target.value})} required/>
      <input className="border p-2 rounded" placeholder="Role" value={form.role}
             onChange={(e)=>setForm({...form, role:e.target.value})} required/>
      <input className="border p-2 rounded" placeholder="Department" value={form.department}
             onChange={(e)=>setForm({...form, department:e.target.value})} required/>
      <input className="border p-2 rounded" placeholder="Email (optional)" value={form.email || ""}
             onChange={(e)=>setForm({...form, email:e.target.value})}/>
      <input className="border p-2 rounded" placeholder="Office (optional)" value={form.office || ""}
             onChange={(e)=>setForm({...form, office:e.target.value})}/>
      <button className="md:col-span-5 bg-blue-600 text-white rounded py-2">Save</button>
    </form>
  );
}
