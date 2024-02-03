import UnderlineOne from "/assets/images/underline1.png"
import clsx from "clsx";

interface IUnderlinedTextProps {
  text: string
  underlineClassNames?: string
}

export const UnderlinedText = (props: IUnderlinedTextProps) => {
  const {text, underlineClassNames = "w-[24.8125rem] h-[5.25rem]"} = props

  return (
    <span className="relative">
      <span className="relative z-[1]">
        {text}
      </span>
      <img src={UnderlineOne} alt="underline" className={clsx("absolute -bottom-[0.85rem] -left-[0.5rem]", underlineClassNames)}/>
    </span>
  );
};