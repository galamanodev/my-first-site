import GuessNumberGame from "./components/GuessNumberGame";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-6 bg-black px-6 text-center">
      <h1 className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-8xl">
        Gal Amano
      </h1>
      <p className="text-xl font-light uppercase tracking-[0.5em] text-zinc-400 sm:text-3xl">
        Hello World
      </p>
      <div className="mt-10 flex w-full justify-center">
        <GuessNumberGame />
      </div>
    </main>
  );
}
