import {About, CoreTeam, Footer, Header, Hero, Roster} from "@widgets/landing-layout";


export const LandingPage = () => {

  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <About />
      <CoreTeam />
      <Roster />
      <Footer />
    </div>
  );
};