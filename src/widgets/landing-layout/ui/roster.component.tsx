import {UnderlinedText} from "@shared/ui";
import {LandingSlider} from "@entities/landing-slider";

export const Roster = () => {
  return (
    <section className="mt-[14.75rem] flex flex-col items-center">
      <h2 className="text-landing-heading">Our <UnderlinedText text="talent" /> roster</h2>
      <div className="mt-[5.13rem] w-full">
        <LandingSlider />
      </div>
      <a
        href="https://neuralle.com/talent-management"
        className="w-[14.53363rem] h-[3.9375rem] rounded-[6.25rem] bg-black text-white no-underline flex items-center justify-center text-landing-basic mt-[3.94rem]"
      >
        View more
      </a>
    </section>
  )
}