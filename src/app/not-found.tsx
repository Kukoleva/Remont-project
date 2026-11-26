import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section-pad container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-4 text-5xl font-extrabold md:text-7xl">Страница не найдена</h1>
      <p className="mt-4 max-w-md text-muted">
        Похоже, такой страницы больше нет или адрес был изменён. Вернитесь на главную
        и посмотрите актуальные услуги и цены на ремонт.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-primary-dark"
        >
          На главную
        </Link>
        <Link
          href="/uslugi"
          className="rounded-full border border-primary/20 px-6 py-3 font-semibold text-primary transition hover:bg-mint"
        >
          Услуги
        </Link>
      </div>
    </section>
  );
}