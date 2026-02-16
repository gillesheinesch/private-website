import Image from "next/image";

export const metadata = {
  title: "About",
  description:
    "About Gilles Heinesch — aviation enthusiast, web developer based in Luxembourg.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">
          About me
        </h1>
      </header>

      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="shrink-0">
          <Image
            src="/images/gillesheinesch.png"
            alt="Gilles Heinesch"
            width={300}
            height={300}
            className="rounded-lg border border-zinc-800 object-cover"
          />
        </div>
        <div className="space-y-4 text-zinc-400">
          <p>
            <strong className="text-zinc-100">
              Born:
            </strong>{" "}
            Luxembourg
          </p>
          <p>
            <strong className="text-zinc-100">
              Work:
            </strong>{" "}
            Luxair S.A, Luxembourg
          </p>
          <p>
            <strong className="text-zinc-100">
              Hobbies:
            </strong>{" "}
            Running, Programming, Aviation
          </p>
        </div>
      </div>
    </div>
  );
}
