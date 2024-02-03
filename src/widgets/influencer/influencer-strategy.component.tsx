import authApi from "@features/auth/api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Select, SelectItem } from "@mantine/core";
import { toast } from "react-toastify";
import moment from 'moment';


import {
  FormTextInput,
  FormDateInput,
  StrategyFormTextarea,
  FormTextInputMask,
  FormSelect,
} from "@shared/ui/form-elements";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TypeOf } from "zod";
import { useNavigate } from "react-router-dom";
import { IInfluencer, IStrategy } from "./types";
import { useEffect, useState } from "react";
import { strategySchema } from "@shared/lib/utils/strategy-schemas.utils";
import { createStrategyToSend } from "@features/profile/helpers/create-strategy-to-send.helper";

type StrategyFormProps = {
  strategy?: IStrategy[];
  influencer?: string;
  isEditing: boolean;

};

export const InfluencerStrategy: React.FC<StrategyFormProps> = (props) => {
  const navigate = useNavigate();
  const { strategy, influencer,isEditing } = props;
  const [strategyIndex, setStrategyIndex] = useState<number>(strategy!!.length-1)
  const [selectedStrategy, setSelectedStrategy] = useState(strategy!!.length > 0 ? new Date(strategy!![strategyIndex]!!.createdAt).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // or false for 24-hour format
  }) : "");
  const [createMode, setCreateMode] = useState<boolean>(strategy!!.length<1)
  type RegisterInput = TypeOf<typeof strategySchema>;
  
  const dateFormat = "MMMM DD, YYYY [at] hh:mm:ss A";
  const methods = useForm<RegisterInput>({
    defaultValues: {
      influencer: strategy!![strategyIndex]?.influencer.toString() ?? "",
      manager: strategy!![strategyIndex]?.manager ??"",
      tasks: strategy!![strategyIndex]?.tasks ??"",
      PR: strategy!![strategyIndex]?.PR ??"",
      life: strategy!![strategyIndex]?.life ??"",
      high_level: strategy!![strategyIndex]?.high_level ??"",
      brand_strategy: strategy!![strategyIndex]?.brand_strategy ??"",
      content_tiktok: strategy!![strategyIndex]?.content_tiktok ??"",
      content_ig: strategy!![strategyIndex]?.content_ig ??"",
      content_yt: strategy!![strategyIndex]?.content_yt ??"",
      content_collabs: strategy!![strategyIndex]?.content_collabs ??"",
      tour: strategy!![strategyIndex]?.tour ??"",
      hosting: strategy!![strategyIndex]?.hosting ??"",
      podcast: strategy!![strategyIndex]?.podcast ??"",
      film: strategy!![strategyIndex]?.film ??"",
      projects: strategy!![strategyIndex]?.projects ??"",
    },
    resolver: zodResolver(strategySchema),
  });
  
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const resetForm = () => {
    reset({
      influencer: "",
      manager: "",
      tasks: "",
      PR: "",
      life: "",
      high_level: "",
      brand_strategy: "",
      content_tiktok: "",
      content_ig: "",
      content_yt: "",
      content_collabs: "",
      tour: "",
      hosting: "",
      podcast: "",
      film: "",
      projects: "",
      // ... any other fields you have ...
    });
  };
  const submitForm: SubmitHandler<RegisterInput> = async (data) => {

    const dataToSend = createStrategyToSend(data, +influencer!!);


    if (!createMode && strategy !== undefined) {
      try {
        const res = await authApi.put(`/influencer/strategy/update/${strategy!![strategyIndex]?.id}`, dataToSend);
        console.log(res);
        toast.success("Talent Strategy successfully updated");
        navigate(`/app/roster`);
      } catch (error: any) {
        if (error.response.data.errorMessage) {
          toast.error(error.response.data.errorMessage.join(", "), {
            autoClose: false,
          });
        } else {
          toast.error("Error on updating Talent strategy");
        }
      }
    } else {
      try {
        await authApi.post(`/influencer/strategy/insert`, dataToSend);
        toast.success("Talent Strategy successfully created");
        //console.log(response.data);
        navigate(`/app/roster`);
      } catch (error: any) {
        if (error.response.data.errorMessage) {
          toast.error(error.response.data.errorMessage.join(", "), {
            autoClose: false,
          });
        } else {
          toast.error("Error on create Talent Strategy");
        }
      }
    }
    
    
  };
  const handleSelectChange = (selectedValue: string) => {
    if(selectedValue==="New Strategy"){
      setCreateMode(true)
      resetForm()
    }
    else{
  
      const dateObject = moment(selectedValue, dateFormat).toDate();
      const selectedIndex = strategy!!.findIndex(item => {
        const itemDate = new Date(item.createdAt);
        const itemDateTime = Math.floor(itemDate.getTime() / 1000);
        const dateObjectTime = Math.floor(dateObject.getTime() / 1000);

        console.log("Current item createdAt time value:", itemDateTime);
        console.log("Date Object time value:", dateObjectTime);
        return itemDateTime === dateObjectTime;
      });
      
      console.log(selectedIndex)
      setStrategyIndex(selectedIndex); // Update the state
      setCreateMode(false)
      if (selectedStrategy) {
      reset({
        influencer: strategy!![strategyIndex]?.influencer.toString() ?? "",
        manager: strategy!![strategyIndex]?.manager ??"",
        tasks: strategy!![strategyIndex]?.tasks ??"",
        PR: strategy!![strategyIndex]?.PR ??"",
        life: strategy!![strategyIndex]?.life ??"",
        high_level: strategy!![strategyIndex]?.high_level ??"",
        brand_strategy: strategy!![strategyIndex]?.brand_strategy ??"",
        content_tiktok: strategy!![strategyIndex]?.content_tiktok ??"",
        content_ig: strategy!![strategyIndex]?.content_ig ??"",
        content_yt: strategy!![strategyIndex]?.content_yt ??"",
        content_collabs: strategy!![strategyIndex]?.content_collabs ??"",
        tour: strategy!![strategyIndex]?.tour ??"",
        hosting: strategy!![strategyIndex]?.hosting ??"",
        podcast: strategy!![strategyIndex]?.podcast ??"",
        film: strategy!![strategyIndex]?.film ??"",
        projects: strategy!![strategyIndex]?.projects ??"",
      });
    }
    }
    setSelectedStrategy(selectedValue);
    
  };
  const handleNewStrategyButton = () => {
    // Find the index of the item in 'strategy' array whose 'createdAt' matches the selected value
    resetForm();
    setCreateMode(true);
    setSelectedStrategy("New Strategy");
  };

  
  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    
    await submitForm(values);
  
 
  };



  useEffect(() => {
    console.log(strategy)
    console.log("Form Default Values:", methods.getValues());
  }, []);

  

  return (
    <div className="bg-white w-9/12 rounded-2xl shadow-2xl pt-14 px-14 pb-6">
      <div className="text-2xl mb-5">Strategy</div>
      <Button radius="xl" size="sm" type="submit" color="orange" onClick={()=>{handleNewStrategyButton()}}>
              New Strategy
      </Button>
      
      <Select
        defaultValue={selectedStrategy}
        value={selectedStrategy}
        radius={8}
        data={[...strategy!!.map(item => new Date(item.createdAt).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true // or false for 24-hour format
        })), "New Strategy"]}
        className="shadow-2xl mt-5"
        onChange={handleSelectChange}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-6 space-y-3">
        <FormTextInput
              name="manager"
              autoComplete="on"
              placeholder="Jordan"
              label="Manager"
              className="w-6/12 l-5"
              
              required
            />
          <div className="flex justify-between">
            
             <StrategyFormTextarea
              name="projects"
              autoComplete="on"
              placeholder="Projects"
              label="Projects"
              className="w-6/12"
              
            />
            <StrategyFormTextarea
              name="tasks"
              autoComplete="on"
              placeholder="1. Create Script"
              label="Tasks"
              className="ml-6 w-6/12"

            />
          </div>
          <div className="flex justify-between">
            <StrategyFormTextarea
              name="PR"
              autoComplete="on"
              placeholder="PR"
              label="PR"
              className="w-6/12"

            />
            <StrategyFormTextarea
              name="life"
              autoComplete="on"
              placeholder="Life"
              label="Life"
              className="ml-6 w-6/12"
            />
          </div>
          <div className="flex justify-between">
            <StrategyFormTextarea
              name="high_level"
              placeholder="High Level"
              label="High Level"
              className="w-6/12"
            />
            <StrategyFormTextarea
              name="brand_strategy"
              placeholder="Brand Strategy"
              label="Brand Strategy"
              className="ml-6 w-6/12"
            />
          </div>
          <div className="flex justify-between">
            <StrategyFormTextarea
              name="content_tiktok"
              placeholder="Content Tiktok"
              label="Content Tiktok"
              className="w-6/12"

            />
            <StrategyFormTextarea
              name="content_ig"
              placeholder="Content Instagram"
              label="Content Instagram"
              className="ml-6 w-6/12"
              
            />
          </div>
          <div className="flex justify-between">
          <StrategyFormTextarea
              name="content_yt"
              placeholder="Content Tiktok"
              label="Content Tiktok"
              className="w-6/12"
            />
            <StrategyFormTextarea
              name="content_collabs"
              placeholder="Content Collabs"
              label="Content Collabs"
              className="ml-6 w-6/12"
              
            />
          </div>
          <div className="flex justify-between">
            <StrategyFormTextarea
              name="tour"
              placeholder="Tour"
              label="Tour"
              className="w-2/3"
            />
            <StrategyFormTextarea
              name="hosting"
              placeholder="Hosting"
              label="Hosting"
              className="ml-6 w-2/3"
            />
            
          </div>
          <div className="flex justify-between">
            <StrategyFormTextarea
              name="podcast"
              placeholder="Podcast"
              label="Podcast"
              className="w-2/3"
            />
            <StrategyFormTextarea
              name="film"
              placeholder="Film"
              label="Film"
              className="ml-6 w-2/3"
            />
            
          </div>
          <div className="flex justify-between pt-4">
            <Button radius="xl" size="md" type="submit" color="dark">
              {createMode? "Create Strategy" : "Save Changes"}
            </Button>
          
          </div>
          
        </form>
      </FormProvider>
      
    </div>
  );
};
