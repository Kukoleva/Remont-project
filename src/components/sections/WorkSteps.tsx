const steps = [
  {
    num: '01',
    title: 'Заявка и обмер',
    text: 'Оставляете заявку — инженер бесплатно выезжает на объект, делает точные замеры.',
  },
  {
    num: '02',
    title: 'Смета и договор',
    text: 'Составляем подробную смету с фиксированной ценой и сроками. Подписываем договор.',
  },
  {
    num: '03',
    title: 'Дизайн-проект',
    text: 'При необходимости делаем 3D-визуализацию и план расстановки мебели и освещения.',
  },
  {
    num: '04',
    title: 'Ремонт и технадзор',
    text: 'Выполняю работы поэтапно. Контролирую качество на каждом шаге.',
  },
  {
    num: '05',
    title: 'Сдача и гарантия',
    text: 'Принимаете объект по акту, получаете гарантию 3 года и уборку после ремонта.',
  },
];

/** Этапы работы — 5 шагов */
export default function WorkSteps() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Как мы работаем</p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">5 шагов до готовой квартиры</h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.num} className="relative">
              <div className="flex h-full flex-col rounded-card border border-mint bg-white p-6 shadow-card transition hover:shadow-lift">
                <span className="font-heading text-4xl font-extrabold text-mint">{step.num}</span>
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute -right-4 top-1/2 hidden h-px w-4 bg-mint lg:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}