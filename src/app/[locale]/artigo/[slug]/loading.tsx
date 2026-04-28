export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse space-y-8">
        <div className="flex gap-2 text-sm">
          <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-20"></div>
          <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-20"></div>
        </div>
        <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded w-3/4"></div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-stone-200 dark:bg-stone-800 rounded-full"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-24"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-20"></div>
        </div>
        <div className="h-[300px] md:h-[400px] bg-stone-200 dark:bg-stone-800 rounded-xl"></div>
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full" style={{ width: `${100 - (i * 5)}%` }}></div>
          ))}
        </div>
        <div className="pt-8 border-t">
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 bg-stone-200 dark:bg-stone-800 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/4"></div>
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}