import {IMember} from "@shared/lib/types";

interface ILandingTeamMemberProps {
  item: IMember
}

export const LandingTeamMember = (props: ILandingTeamMemberProps) => {
  const {item} = props

  return (
    <div className="flex flex-col items-center">
      <div className="w-[13.375rem] aspect-square rounded-full overflow-hidden">
        <img src={item.avatar} alt={item.name} className="w-full"/>
      </div>
      <div className="mt-[2rem] text-landing-basic leading-[1.8125rem] text-center">
        <p>{item.name}</p>
        <p className="font-normal">{item.position}</p>
      </div>
    </div>
  );
};