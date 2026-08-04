function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-brand-500 sm:px-8 md:flex-row">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-brand-900">
            ClaimCorp
          </span>
          . All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <span>Enterprise Expense Management System</span>
          <span className="h-1 w-1 rounded-full bg-brand-300" />
          <span className="font-mono">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;