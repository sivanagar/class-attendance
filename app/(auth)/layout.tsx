export default function AuthLayout({ children}: {
    readonly children: React.ReactNode; 
}) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                {children}
            </div>
        </div>
    );
}