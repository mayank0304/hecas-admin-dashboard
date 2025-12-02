export default function Navbar() {
  return (
    <header className="w-full">
      <div className="flex items-center justify-between border-b border-(--border) p-4">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-(--primary)">HECAS</span>{" "}
          <span className="text-(--text-muted) text-base">
            Hybrid Edge Computing Analytics System
          </span>
        </h1>
      </div>
    </header>
  );
}
