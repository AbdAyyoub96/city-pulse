export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  description,
}: {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {title}
          <br />
          <span>{emphasis}</span>
        </h2>
      </div>
      <p className="section-description">{description}</p>
    </div>
  );
}
