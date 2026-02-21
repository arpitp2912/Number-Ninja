import Link from "next/link"

export default function Home() {
  // read localStorage in client components; show blank if none
  return (
    <main className="w-full max-w-3xl mx-auto px-6 text-center py-12">
      <header className="mb-8">
        <h1 className="text-6xl font-extrabold tracking-tight">
          NUMBER <span className="text-ninja-primary">NINJA</span>
        </h1>
        <p className="mt-2 text-sm text-gray-600">Precision • Logic • Speed</p>
      </header>

      <section className="card p-12 rounded-2xl mx-auto max-w-xl">
        <div className="mb-8">
  <Link
    href="/game"
    className="
      inline-block
      cursor-pointer
      bg-gradient-to-r
      from-ninja-primary
      to-ninja-secondary
      text-white
      font-semibold
      text-2xl
      px-12
      py-5
      rounded-3xl
      shadow-ninja-lg
      hover:scale-105
      active:scale-95
      transition-all
    "
  >
    ▶ PLAY NOW
  </Link>
</div>

        <StatsRow />
      </section>

      <footer className="mt-10 text-sm text-gray-500">
        Tip: Fast taps build streaks — beat your personal best!
      </footer>
    </main>
  )
}

function StatsRow(){
  // client-side only rendering of stats to avoid showing defaults in incognito
  if (typeof window === "undefined") return null
  const avg = localStorage.getItem("avgSpeed")
  const acc = localStorage.getItem("accuracy")
  return (
    <div className="flex justify-center gap-6 mt-6">
      {avg ? (
        <div className="bg-white px-6 py-3 rounded-full shadow-sm">
          <div className="text-xs text-gray-500">Average Speed</div>
          <div className="text-xl font-semibold mt-1">{parseFloat(avg).toFixed(2)}s</div>
        </div>
      ) : null}

      {acc ? (
        <div className="bg-white px-6 py-3 rounded-full shadow-sm">
          <div className="text-xs text-gray-500">Accuracy</div>
          <div className="text-xl font-semibold mt-1">{Math.round(parseFloat(acc))}%</div>
        </div>
      ) : null}
    </div>
  )
}