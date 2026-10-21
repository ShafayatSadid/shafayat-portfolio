// src/app/(main)/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="relative flex size-20 items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-muted" />
        {/* Inner Spinning Ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent border-l-transparent" />
        {/* Center Logo Text */}
        <span className="text-sm font-bold text-primary animate-pulse">SS</span>
      </div>
      <p className="mt-6 text-sm font-medium text-muted-foreground animate-pulse">
        Loading amazing things...
      </p>
    </div>
  );
}