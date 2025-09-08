import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-xl">
        <Image
          className="dark:invert mb-4"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-bold mb-2 text-center sm:text-left">
          Next.js JWT Authentication Demo
        </h1>
        <p className="text-base text-center sm:text-left mb-4">
          This demo shows how to add JWT authentication to a Next.js app using cookies and middleware. You'll learn how to:
        </p>
        <ul className="list-disc list-inside text-base mb-6 text-left">
          <li>Issue JWTs on login and store them securely in HTTP-only cookies</li>
          <li>Protect API routes and pages using Next.js middleware</li>
          <li>Read and validate JWTs on the server and client</li>
          <li>Implement login, logout, and protected pages</li>
        </ul>
        <p className="text-base text-center sm:text-left">
          Explore the code and follow along to understand how authentication works in a modern Next.js application.
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs/authentication"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Next.js Auth Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://jwt.io/introduction"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          About JWT
        </a>
      </footer>
    </div>
  );
}
