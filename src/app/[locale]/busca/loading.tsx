export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse space-y-8">
        <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded w-1/2"></div>
        <div className="flex gap-2">
          <div className="h-10 flex-1 bg-stone-200 dark:bg-stone-800 rounded-lg"></div>
          <div className="h-10 w-24 bg-stone-200 dark:bg-stone-800 rounded-lg"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-20"></div>
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-20"></div>
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-stone-900 rounded-lg overflow-hidden">
              <div className="h-48 bg-stone-200 dark:bg-stone-800"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-1/4"></div>
                <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4"></div>
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}