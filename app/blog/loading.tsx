export default function BlogLoading(): React.ReactElement {
  return (
    <div>
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-12 space-y-3">
          <div className="h-9 w-72 animate-pulse rounded-md bg-brand-100" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded-md bg-brand-100/70" />
          <div className="mt-6 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 animate-pulse rounded-full bg-white"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-tight">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-brand-100 bg-white"
              >
                <div className="aspect-[16/9] w-full animate-pulse bg-brand-50" />
                <div className="space-y-2 p-5">
                  <div className="h-3 w-32 animate-pulse rounded bg-brand-50" />
                  <div className="h-5 w-5/6 animate-pulse rounded bg-brand-100" />
                  <div className="h-3 w-full animate-pulse rounded bg-brand-50" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-brand-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
