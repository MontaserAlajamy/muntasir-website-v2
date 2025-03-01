import { FallbackProps } from 'react-error-boundary';
import { AlertTriangle } from 'lucide-react';

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 dark:bg-dark-800">
      <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-dark-700">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={resetErrorBoundary}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:ring-offset-dark-800"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}