export default function ComingSoon() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-zinc-900 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-zinc-100">
        <span className="text-lg font-semibold tracking-tight">dezentralshop</span>
        <span className="text-xs text-zinc-400 font-mono">next.dezentralshop.ch</span>
      </header>

      {/* Main */}
      <section className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="mb-10 text-6xl select-none">₿</div>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Bald verfügbar
        </h1>

        <p className="text-zinc-500 text-lg max-w-md leading-relaxed mb-10">
          Der neue Dezentralshop wird gerade gebaut.
          Bitcoin-Produkte in höchster Qualität –{" "}
          <span className="text-zinc-900 font-medium">
            mit 10&nbsp;% Rabatt bei Zahlung in Bitcoin.
          </span>
        </p>

        <a
          href="https://dezentralshop.ch"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-700 transition-colors"
        >
          Zum bestehenden Shop
          <span aria-hidden>→</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100 text-xs text-zinc-400">
        <span>© 2026 Dezentralshop. Betrieben von Lex &amp; Jonathan.</span>
        <div className="flex items-center gap-4">
          <a href="https://dezentralshop.ch" className="hover:text-zinc-700 transition-colors">
            Shop
          </a>
          <a
            href="https://github.com/Wicht1/next_dezentralshop"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-700 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
