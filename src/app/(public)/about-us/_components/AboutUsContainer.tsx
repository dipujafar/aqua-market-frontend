import { ChevronRight } from "lucide-react"


export default function AboutUsContainer() {
  return (
    <div className=" text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-2">About Us</h1>
      <p className="text-lg text-white/70 mb-6">
        Welcome to AquaMarket. Before using our logo design service, please carefully review the following Terms and
        Conditions, as they govern the contractual relationship between you (the "Aleous") and AquaMarket (the
        "Service Provider"). By using our logo design service, you acknowledge that you have read, understood, and
        agreed to these Terms and Conditions provided below.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="flex items-center text-xl font-semibold mb-3">
            <ChevronRight className="h-5 w-5 mr-1" />
            What data do we process?
          </h2>
          <div className="space-y-3 pl-5 text-lg text-white/70">
            <p>
              a. AquaMarket will provide custom logo design services to the
              Aleous based on the specifications provided by the Aleous.
            </p>
            <p>
              b. The Service Provider will deliver the final logo design in the agreed-upon format upon completion and
              full payment of the service fee.
            </p>
          </div>
        </section>

        <section>
          <h2 className="flex items-center text-xl font-semibold mb-3">
            <ChevronRight className="h-5 w-5 mr-1" />
            What are your rights?
          </h2>
          <div className="space-y-3 pl-5 text-lg text-white/70">
            <p>
              a. The Aleous acknowledges that all rights, title, and ownership of the final logo design will
              belong solely to the Aleous after full payment has been received by the Service Provider.
            </p>
            <p>
              b. Final payment ensures that only the agreed design becomes the client's property. Any previous
              ideas/concepts remain the property of the Service Provider, unless any prior agreement states otherwise.
            </p>
            <p>
              c. The Service Provider reserves the right to showcase the completed logo design in their portfolio or
              promotional materials.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
