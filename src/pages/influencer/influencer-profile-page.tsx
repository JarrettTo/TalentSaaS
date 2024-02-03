import { IInfluencer, IStrategy, InfluencerForm, InfluencerSidebar } from "@widgets/influencer";
import { InfluencerStrategy } from "@widgets/influencer/influencer-strategy.component";
import { getAllStrategies, getOneInfluencer, getOneStrategy } from "@widgets/roster";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const InfluencerProfilePage = () => {
  const { influencerId } = useParams();
  const [influencer, setInfluencer] = useState<IInfluencer | null>(null);
  const [strategy, setStrategy] = useState<IStrategy[] | null>([]);
  const [page,updatePage] = useState<string>("strategy")
  const requestInfluencerData = async (id: string) => {
    try {
      const influencerResponse = await getOneInfluencer(id);
      setInfluencer(influencerResponse.data);
      const strategyResponse = await getAllStrategies(id);
      console.log(strategyResponse.data)
      if(strategyResponse.data!=null){
        setStrategy(strategyResponse.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (influencerId != undefined) {
      requestInfluencerData(influencerId);
    }
  }, [influencerId]);

  return (
    <div className="flex">
      {influencer && (
        <>
          <InfluencerSidebar
            influencer={influencer}
            onUpdateAvatar={() => influencerId && requestInfluencerData(influencerId)}
            page={page}
            updatePage={updatePage}
          />
          
          {page==="strategy" ? <InfluencerForm influencer={influencer} isEditing={true} />: <InfluencerStrategy strategy={strategy!!} influencer={influencerId} isEditing={true}/>
          }
        </>
      )}
    </div>
  );
};
