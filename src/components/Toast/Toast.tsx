"use client";

export function Toast({
  open,
  type,
  message,
  onClose,
}: {
  open: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}) {
  if (!open) return null;

  const base =
    "fixed right-5 top-5 z-[80] w-[320px] rounded-2xl border px-4 py-3 text-sm shadow-lg";
  const styles =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : "border-rose-200 bg-rose-50 text-rose-900";

  return (
    <div className={`${base} ${styles}`}>
      <div className="flex items-start justify-between gap-3">
        <div>{message}</div>
        <button
          type="button"
          className="text-lg leading-none opacity-70 hover:opacity-100"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}