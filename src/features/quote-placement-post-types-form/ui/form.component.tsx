import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormSchema, schema } from "../model";
import { Button, Checkbox, NumberInput } from "@mantine/core";
import { DeliverablesDictionary, DeliverablesDictionaryEntries } from "@entities/quote";
import { useEffect, useState } from "react";
import { IDeliverables } from "@shared/lib/types";

interface IUpdateDeliverablesForm {
  deliverablesAmount: number;
  deliverables: IDeliverables;
  onSubmit: (updatedDeliverables: IDeliverables) => void;
  onCancel: () => void;
}

export const Form = (props: IUpdateDeliverablesForm) => {
  const { deliverablesAmount, deliverables, onSubmit, onCancel } = props;
  const [repost, setRepost] = useState<boolean>(false);
  const methods = useForm<FormSchema>({ resolver: zodResolver(schema), defaultValues: {
    rePost: 0,
    rePostIG: 0,
    rePostYT: 0,
    rePostTikTok: 0,
  } });

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    console.log(deliverables)
    DeliverablesDictionaryEntries.map(([deliverableKey]) => {
      setValue(deliverableKey, deliverables[deliverableKey] || 0);
    });
    console.log(errors)
  }, [deliverables,errors]);

  const handleFormSubmit: SubmitHandler<FormSchema> =  async (data) => {
    console.log("CHECK")
    try {
      
      let deliverablesMore = 0;
      let deliverablesSum = 0;
      /*DeliverablesDictionaryEntries.forEach(([deliverableKey]) => {
        if (
          deliverableKey === "amplificationDigitalWeeksRange" ||
          deliverableKey === "amplificationTraditionalWeeksRange" ||
          deliverableKey === "exclusivityWeeksRange"
        ) {
          return;
        }
        /*if(data[deliverableKey]>deliverablesAmount){
          deliverablesMore+=1
        }else{
          deliverablesSum+=data[deliverableKey]
        }
        
      });*/
      /*if (deliverablesMore ==1) {
        throw new Error(
          `You need to distribute only ${deliverablesAmount} deliverables (now ${deliverablesSum})`
        );
      }
      if (deliverablesSum < deliverablesAmount) {
        throw new Error(
          `You need to distribute all ${deliverablesAmount} deliverables (now ${deliverablesSum})`
        );
      }*/
      console.log(data)
      onSubmit(data);
    } catch (error: any) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
        return;
      }
      setError("root", { message: "Unexpected error" });
    }
  };
  const formSubmitCheck = (data) => {
    console.log("HELLO");
    console.log(data); // This will log the form data
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {DeliverablesDictionaryEntries.map(([deliverableKey]) => {
          if (

            deliverableKey === "rePost"
        

          ) {
            return null;
          }
          return (
            <div key={deliverableKey} className="mb-2 flex flex-col  gap-5">
              <div className="flex flex-row justify-end items-center">
              <div className="grow-0 shrink-0 basis-20 mr-5 flex flex-row justify-end">
                {deliverableKey=="rePostIG" ||deliverableKey=="rePostYT" || deliverableKey=="rePostTikTok" ? (
                  <Controller
                    control={control}
                    name={deliverableKey}
                    render={({ field }) => (
                      <Checkbox
                        color="dark"
                        onChange={(e) => {
                          if(e.target.checked){
                            field.onChange(1);
                          }else{
                            field.onChange(0);
                          }
                        
                           // Call field.onChange with the new checked state
                          setRepost(!repost); // Update the local state if necessary
                        }} // Use field.onChange
                        onBlur={field.onBlur}     // Use field.onBlur
                        checked={(field.value==1)}     // Use field.value for the checked state
                        name={field.name}         // Use field.name
                        ref={field.ref}
                      />
                    )}
                  />
                ):
                <Controller
                  control={control}
                  name={deliverableKey}
                  render={({ field }) => (
                    <NumberInput min={0} {...field} />
                  )}/>
                }
                
              </div>
              
              <p className="grow">{DeliverablesDictionary[deliverableKey].title}</p>
              </div>
              
            </div>
          );
        })}
        <div className="h-8">
          {errors.root && <p className="text-sm text-error">{errors.root.message}</p>}
        </div>
        <div className="flex justify-between gap-5">
          <Button className="grow" color="dark" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="grow" color="orange" type="submit">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
