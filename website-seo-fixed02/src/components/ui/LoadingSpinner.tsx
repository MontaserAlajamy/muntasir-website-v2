export default function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8" aria-live="polite" aria-busy="true">
      <div className="relative h-12 w-12">
        <div className="absolute top-0 h-12 w-12 animate-spin rounded-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent" />
        <div className="absolute top-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-b-brand-700" style={{ animationDelay: '0.2s' }} />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}