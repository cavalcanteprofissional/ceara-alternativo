export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="h-[400px] bg-stone-200 dark:bg-stone-800 rounded-xl mb-12"></div>
        <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-stone-900 rounded-lg overflow-hidden">
              <div className="h-48 bg-stone-200 dark:bg-stone-800"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3"></div>
                <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4"></div>
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}