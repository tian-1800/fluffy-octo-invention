import Banners from "@/components/home/banners";
import Services from "@/components/home/services";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 bg-gray-50 page-padding">
      <Services />
      <Banners />
    </div>
  );
}
