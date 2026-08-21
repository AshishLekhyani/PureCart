const MESSAGES = [
  "Free shipping over $75",
  "Free returns within 30 days",
  "New arrivals every Thursday",
  "Members get early access",
];

export default function Marquee() {
  // The list is rendered twice so the track can loop seamlessly at -50%.
  const track = [...MESSAGES, ...MESSAGES];

  return (
    <div className="border-line bg-ink text-paper overflow-hidden border-y py-3">
      <div className="marquee-track flex w-max items-center gap-14 pr-14">
        {track.map((message, index) => (
          <span
            key={`${message}-${index}`}
            className="label-sm flex items-center gap-14 whitespace-nowrap"
          >
            {message}
            <span aria-hidden className="text-paper/40">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
