export function CircleHeading({ icon, title, description }: { icon?: any; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-6">
      {icon && <div className="min-w-20 min-h-20 bg-primary rounded-full mb-2 flex items-center justify-center  ">{icon}</div>}
      <h1 className="text-3xl font-bold"> {title}</h1>
      <p className="text-base text-gray-600 dark:text-gray-300 text-center">{description}</p>
    </div>
  );
}
