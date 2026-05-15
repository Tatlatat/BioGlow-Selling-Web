export default function RootLoading(): React.ReactElement {
  return (
    <div className="container-tight py-16">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="h-8 w-3/4 animate-pulse rounded-md bg-brand-100" />
        <div className="h-4 w-full animate-pulse rounded-md bg-brand-50" />
        <div className="h-4 w-5/6 animate-pulse rounded-md bg-brand-50" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-32 animate-pulse rounded-xl bg-brand-50" />
          <div className="h-32 animate-pulse rounded-xl bg-brand-50" />
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-ink-muted">
        Đang tải nội dung…
      </p>
    </div>
  );
}
