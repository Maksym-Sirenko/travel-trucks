type Props = { className?: string };

export default function Logo({ className }: Props) {
  return (
    <svg
      className={className}
      width="136"
      height="16"
      viewBox="0 0 272 32"
      aria-label="Logo"
    >
      <use href="/image.svg#logo" />
    </svg>
  );
}
