
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

const ratings = [
  { value: 5, percentage: 90 },
  { value: 4, percentage: 60 },
  { value: 3, percentage: 40 },
  { value: 2, percentage: 30 },
  { value: 1, percentage: 10 },
];


interface RatingBarProps {
    value: number;
    percentage: number;
    barColor?: string;
    className?: string;
  }
  
  const RatingBar = ({
    value,
    percentage,
    barColor = "bg-[#79C5AC]",
    className,
  }: RatingBarProps) => {
    return (
      <div className={cn("flex items-center w-full gap-4", className)}>
        <span className="text-sm font-medium min-w-5">{value}</span>
        <div className="relative w-full h-1 bg-white rounded-full">
          <div
            className={cn("absolute h-1 rounded-full", barColor)}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-medium min-w-12 text-right">
          {percentage}%
        </span>
      </div>
    );
  };
  


const AverageRating = ({className}: {className?: string}) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.18) 0%, rgba(120, 192, 168, 0.18) 85.08%)",
      }}
      className={cn("p-4 rounded-sm lg:space-y-8 space-y-6", className)}
    >
      <div className="space-y-1">
        <h3 className="md:text-3xl text-xl font-medium">Average Rating</h3>
        <div className="flex items-center  gap-x-2 text-white/80">
          <Rating rating={4.8}></Rating>
          <p>4.8 (12 Reviews)</p>
        </div>
      </div>

      <div className={cn("flex flex-col gap-4   rounded-lg")}>
        {ratings?.map((rating) => (
          <RatingBar
            key={rating.value}
            value={rating.value}
            percentage={rating.percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default AverageRating;
