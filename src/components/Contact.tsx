export default function Contact() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-neutral-800">Get in Touch</h2>
      <p className="text-muted-foreground">
        I`&apos;`m currently open to opportunities. Reach me via{' '}
        <a href="mailto:you@example.com" className="underline hover:text-black">
          email
        </a>{' '}
        or find me on{' '}
        <a href="https://linkedin.com/in/yourprofile" className="underline hover:text-black">
          LinkedIn
        </a>
        .
      </p>
    </section>
  );
}
