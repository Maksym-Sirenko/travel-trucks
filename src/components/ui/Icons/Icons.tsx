type IconProps = {
  name: string;
  size?: number;
  className?: string;
  title?: string;
};

export default function Icon({ name, size = 20, className, title }: IconProps) {
  const href = `/image.svg#${name}`;

  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
      fill="none"
      stroke="currentColor"
    >
      {title ? <title>{title}</title> : null}
      <use href={href} xlinkHref={href} />
    </svg>
  );
}






