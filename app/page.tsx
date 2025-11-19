import { prisma } from "@/lib/prisma";

export default function Home() {
  
  return (
    <div className="text-center pt-12">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the Class Attendance App
      </h1>

      {/* <ol className="list-decimal list-inside ">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ol> */}
    </div>
  );
}
