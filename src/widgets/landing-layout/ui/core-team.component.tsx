import {UnderlinedText} from "@shared/ui";
import {IMember} from "@shared/lib/types";
import Jordan from '/assets/images/team-members/Jordan.png'
import Lauren from '/assets/images/team-members/Lauren.png'
import Jacqui from '/assets/images/team-members/Jacqui.png'
import Ainsley from '/assets/images/team-members/Ainsley.png'
import {LandingTeamMember} from "@entities/landing-team-member";

const teamMembers: IMember[] = [
  {
    name: 'Jordan Michaelides',
    position: 'Director & Talent Mgr',
    avatar: Jordan
  },
  {
    name: 'Lauren Michaelides',
    position: 'Creative Director',
    avatar: Lauren
  },
  {
    name: 'Jacqui Heggen',
    position: 'Senior Associate Talent Mgr',
    avatar: Jacqui
  },
  {
    name: 'Ainsley Coote',
    position: 'Creative Associate',
    avatar: Ainsley
  },
]

export const CoreTeam = () => {
  return (
    <section className="mt-[11.31rem] flex flex-col items-center gap-[5.6rem]">
      <h2 className="text-landing-heading text-center">The core <UnderlinedText text="team"/></h2>
      <div className="flex gap-[5.12rem]">
        {
          teamMembers.map(item => <LandingTeamMember item={item} key={item.name}/>)
        }
      </div>
    </section>
  )
}