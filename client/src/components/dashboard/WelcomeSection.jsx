export default function WelcomeSection({ user }) {
  const displayName = user?.fname || user?.name || "User";

  return (
    <section id="dashboard" className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
        Dashboard
      </p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
        Welcome back, {displayName}
      </h1>
      <p className="mt-3 text-base text-slate-600">
        Upload your resume to begin the analysis process.
      </p>
    </section>
  );
}
