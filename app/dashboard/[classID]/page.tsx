import { getClassById } from "@/lib/services/classes";

interface ClassPageProps {
  params: Promise<{ classID: string }>; 
}

export default async function ClassPage({ params }: ClassPageProps) {
    const resolvedParams = await params;
    const classIDString = resolvedParams.classID;
    const classID = parseInt(classIDString);

    if (isNaN(classID)) {
        return <div>Invalid class ID</div>;
    }
    const classDetails = await getClassById(classID);
    if (!classDetails) {
        return <div>Class not found</div>;
    }
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Class Details for ID: {classID}</h1>
        <h2 className="text-xl font-semibold">{classDetails.name}</h2>
        <p className="text-gray-600">{classDetails.description}</p>
        <h3 className="mt-2 font-medium">Students:</h3>
        {classDetails.students.length === 0 ? (
          <p>No students enrolled.</p>
        ) : (
          <ul className="list-disc list-inside">
            {classDetails.students.map((student) => (
              <li key={student.id}>
                {student.firstName} {student.lastName}
              </li>
            ))}
          </ul>
        )}  
    </div>
  );
}