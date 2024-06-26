import { affiliates } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AffiliateType } from "@/lib/types";

  
const Affiliates = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="mb-8 font-bold text-center text-md lg:text-xl text-secondary">
        Made For Students at
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        {affiliates.map((affiliate: AffiliateType) => (
          <div
            key={affiliate.name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <span>
              <Avatar>
                <AvatarImage src={affiliate.icon} />
                <AvatarFallback>{affiliate.initials}</AvatarFallback>
              </Avatar>
            </span>
            <h3 className="ml-2 text-xl font-bold">{affiliate.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Affiliates;