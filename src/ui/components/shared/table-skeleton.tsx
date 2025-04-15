export function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-t-lg mb-4" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 dark:bg-gray-900 mb-2" />
      ))}
    </div>
  );
} 