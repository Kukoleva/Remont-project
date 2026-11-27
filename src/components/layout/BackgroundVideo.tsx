/**
 * Фоновое видео для body.
 * Файл лежит в public/, поэтому адрес — от корня сайта.
 *
 * Доступные ролики:
 *   /109087-683060438_medium.mp4   (4.8 МБ, лёгкий — используется по умолчанию)
 *   /7239172-uhd_3840_2160_25fps.mp4 (16 МБ, 4K — для быстрого интернета)
 */
const BACKGROUND_VIDEO = '/109087-683060438_medium.mp4';

/** Прозрачность белой подложки (0.xx) — чем меньше, тем ярче видно видео */
const OVERLAY = 'bg-white/75';

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <video
        className="h-full w-full object-cover"
        src={BACKGROUND_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disableRemotePlayback
      />
      {/* Белая подложка для контраста текста поверх видео */}
      <div className={`absolute inset-0 ${OVERLAY}`} />
    </div>
  );
}