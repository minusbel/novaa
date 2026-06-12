interface NovaaLogoProps {
  className?: string;
  iconSize?: number;
}

export default function NovaaLogo({ className = "", iconSize = 32 }: { className?: string, iconSize?: number }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="Novaa"
        style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
      />
    </div>
  );
}
