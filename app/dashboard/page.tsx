import { getAllClasses } from "@/lib/services/classes";


export default async function Dashboard() {
  const classes = await getAllClasses();

  console.log("Classes in dashboard:", classes);
  return <div>
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    {classes.length === 0 ? (
      <p>No classes available.</p>
    ) : (
      <ul className="space-y-4">
        {classes.map((cls) => (
          <li key={cls.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{cls.name}</h2>
            <p className="text-gray-600">{cls.description}</p>
            <h3 className="mt-2 font-medium">Students:</h3>
            {cls.students.length === 0 ? (
              <p>No students enrolled.</p>
            ) : (
              <ul className="list-disc list-inside">
                {cls.students.map((student) => (
                  <li key={student.id}>
                    {student.firstName} {student.lastName}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    )}  
  </div>;
}
