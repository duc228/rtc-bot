import {
  SectionFour,
  SectionOne,
  SectionThree,
  SectionTwo,
} from "../../features/landing/components";

type LandingPageProps = {};

const LandingPage = ({}: LandingPageProps) => {
  return (
    <div className="">
      <section className="flex justify-center shadow-xs">
        <SectionOne />
      </section>
      <section className="flex container justify-between py-5 border-b-[1px] ">
        <SectionTwo />
      </section>
      <section className="py-10 bg-slate-100 border-b-[1px]">
        <SectionThree />
      </section>
      <section className="">
        <SectionFour />
      </section>
    </div>
  );
};

export default LandingPage;
