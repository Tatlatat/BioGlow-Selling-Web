export default function ProductDetailLoading(): React.ReactElement {
  return (
    <article className="pb-24 lg:pb-0">
      {/* Breadcrumb skeleton */}
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-4">
          <div className="h-4 w-72 animate-pulse rounded bg-brand-100/60" />
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Gallery skeleton */}
          <div className="flex flex-col gap-3">
            <div className="aspect-square w-full animate-pulse rounded-xl bg-brand-50" />
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-lg bg-brand-50"
                />
              ))}
            </div>
          </div>

          {/* Info column skeleton */}
          <div className="flex flex-col gap-5">
            <div className="h-6 w-28 animate-pulse rounded-full bg-leaf-50" />
            <div className="space-y-2">
              <div className="h-9 w-3/4 animate-pulse rounded-md bg-brand-100" />
              <div className="h-5 w-1/2 animate-pulse rounded-md bg-brand-50" />
            </div>
            <div className="rounded-xl bg-brand-50 px-5 py-4 space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-brand-100" />
              <div className="h-8 w-32 animate-pulse rounded bg-warm-red/20" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-brand-50" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-brand-50" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-brand-50" />
            </div>
            <div className="flex gap-3">
              <div className="h-12 flex-1 animate-pulse rounded-lg bg-warm-red/30" />
              <div className="h-12 flex-1 animate-pulse rounded-lg bg-brand-100/50" />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
