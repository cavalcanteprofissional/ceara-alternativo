export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2 mb-8"></div>
        <div className="h-12 bg-stone-200 dark:bg-stone-800 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/2 mb-8"></div>
        <div className="h-64 bg-stone-200 dark:bg-stone-800 rounded-lg mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}