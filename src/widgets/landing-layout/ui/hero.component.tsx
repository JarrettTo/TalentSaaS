import UnderlineTwo from "/assets/images/underline2.png"
import {UnderlinedText} from "@shared/ui";

export const Hero = () => {
  return (
    <main className="self-center mt-[11.31rem]">
      <p className="text-center text-[7.5rem] font-bold">
        An app developed<br/>by a{' '}
        <UnderlinedText text="talent" underlineClassNames="w-[21.125rem] h-[4.4375rem]"/>
        {' '}management agency, made{' '}
        <span className="relative">
          for
          <img src={UnderlineTwo} alt="underline" className="absolute -bottom-[0.85rem] left-1/2 -translate-x-1/2 w-[13.875rem] h-[2.75rem]"/>
        </span>
        {' '}talent management agencies.
      </p>
    </main>
  )
}
