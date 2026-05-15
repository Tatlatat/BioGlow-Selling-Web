export default function ProductsLoading(): React.ReactElement {
  return (
    <div>
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-10 space-y-3">
          <div className="h-9 w-64 animate-pulse rounded-md bg-brand-100" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded-md bg-brand-100/70" />
        </div>
      </section>
      <section className="section">
        <div className="container-tight space-y-6">
          {/* Filter chips skeleton */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-full bg-brand-50"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-32 animate-pulse rounded-full bg-brand-50"
              />
            ))}
          </div>
          {/* Product cards skeleton */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-brand-100 bg-white"
              >
                <div className="aspect-[4/3] w-full animate-pulse bg-brand-50" />
                <div className="space-y-2 p-4">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-brand-100" />
                  <div className="h-3 w-full animate-pulse rounded bg-brand-50" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-brand-50" />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="h-5 w-20 animate-pulse rounded bg-warm-red/20" />
                    <div className="h-3 w-16 animate-pulse rounded bg-brand-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
