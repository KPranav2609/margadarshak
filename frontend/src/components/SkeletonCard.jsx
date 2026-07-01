const SkeletonCard = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-800/60 ${className}`}
    />
  );
};

export default SkeletonCard;