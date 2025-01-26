const ServiceSkeleton = () => {
  return (
    <li className="w-32 p-4">
      <div className="animate-pulse">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="h-4 bg-gray-300 rounded mt-2"></div>
      </div>
    </li>
  );
};

export default ServiceSkeleton;
