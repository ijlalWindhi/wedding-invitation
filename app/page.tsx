export default function Home() {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center gap-4">
      <audio autoPlay controls>
        <source src="/music/backsound.mp3" type="audio/mpeg" />
      </audio>
      <h1>Dalam Pengembangan</h1>
      <h2 className="p-4 border rounded-lg">
        Undangan Pernikahan Rizki & Sherly
      </h2>
    </main>
  );
}
