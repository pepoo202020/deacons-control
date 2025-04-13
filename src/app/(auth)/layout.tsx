export default function AuthLayout( {
    children,
}: {
    children: React.ReactNode;
} ) {
    return <div className="flex flex-col items-center justify-center min-h-screen dark:bg-[#1E263B] bg-[#F5F5F5] dark:text-white text-black">
        {children}
    </div>;
}
