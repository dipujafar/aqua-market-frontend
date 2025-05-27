import Container from "@/components/shared/Container";
import AdvertiseForm from "./AdvertiseForm";

const AdvertisePage = () => {
  return (
    <Container className="space-y-10">
      <div
        style={{
          background: "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
          boxShadow: "0px 11px 11px 0px rgba(87, 173, 208, 0.11) inset",
        }}
        className="p-4 space-y-4 rounded-lg border border-white/30"
      >
        <h4 className="text-center lg:text-2xl md:text-xl text-lg">
          Advertise
        </h4>
      </div>

      <AdvertiseForm />
    </Container>
  );
};

export default AdvertisePage;
