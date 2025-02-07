"use client"
import { Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
 } from "../../components/ui/carousel";
import { cn } from "../../lib/utils";


import {templates} from "../../constants/templates"
import {  useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";


export const TemplateGallery = ()=> {

 const router = useRouter();
 const create = useMutation(api.documents.create)
 const [isCreating, setIsCreating] = useState(false)

 

 const onTemplateClick = async (tittle:string , initialContent: string)=>{
    setIsCreating(true)
    create({title: tittle, initialContent})
    .then((documentId)=>{
      router.push(`/documents/${documentId}`)
    }).finally(()=>{
      setIsCreating(false)
    })
   
 }
  return (
    <div className="bg-slate-100">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template)=>(
               <CarouselItem key={template.id}
               className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
               >
                <div className={cn("aspect-[3/4] flex flex-col gap-y-2.5",
                  isCreating && "pointer-events-none opacity-50"
                )}>
                  <button
                  onClick = {()=>onTemplateClick(template.label, template.initialContent)}
                  disabled={isCreating}
             
                  style={{backgroundImage: `url(${template.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="size-full rounded-sm bg-gray-100 gap-y-4 flex flex-col items-center justify-center"
                  >
                    

                  </button>
                  <p className="text-sm text-center font-medium truncate">
                      {template.label}
                    </p>
                  {/* <img src={template.imageUrl} alt={template.label} className="w-24 h-24 mx-auto" />
                  <p className="text-center mt-2">{template.label}</p> */}
                </div>
                </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </div>
      
    </div>
  )
}