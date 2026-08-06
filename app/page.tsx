import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Also } from "@/components/sections/also";
import { Colophon } from "@/components/sections/colophon";
import { ServiceUnswScene } from "@/components/projects/service-unsw/scene";
import { TerracastScene } from "@/components/projects/terracast/scene";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServiceUnswScene />
      <TerracastScene />
      <Also />
      <Experience />
      <Colophon />
    </>
  );
}
