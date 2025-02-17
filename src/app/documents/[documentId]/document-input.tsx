
import { BsCloudCheck } from 'react-icons/bs'
import { Id } from '../../../../convex/_generated/dataModel'
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import {useDebounce } from "../../../hooks/use-debounce";

import { AlertTriangleIcon, LoaderIcon } from 'lucide-react';


interface DocumentInputProps {
    title: string;
    id: Id<"documents">;
}


export const DocumentInput = ({title,id}:DocumentInputProps) => {

  const [value, setValue] = useState(title)
  const [isError, setIsError] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // const status = useStatus()

  const inputref = useRef<HTMLInputElement>(null)

  const mutate = useMutation(api.documents.updateById)

  const debouncedUpdate = useDebounce((newValue:string)=>{
    mutate({id, title: newValue})
      .then(()=>toast.success("Document updated"))
      .catch((e)=>{
        setIsError(true)
        toast.error("Error updating document")
        console.error(e)
      }).finally(()=>{
        setIsPending(false)
      })
    
  })

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedUpdate(newValue)
    
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsPending(true)
      mutate({id, title: value})
        .then(()=>{toast.success("Document updated")
          setIsEditing(false)
        })
        .catch((e)=>{
          setIsError(true)
          toast.error("Error updating document")
          console.error(e)
        }).finally(()=>{
          setIsPending(false)
        })
    }
    
const showLoader = isPending || isEditing;

const showError = isError;

    return (
      <div className="flex items-center gap-2">
        {isEditing ? (
           <form
           onSubmit={handleSubmit}
           className='relative w-fit max-w-[50ch]'>
            <span className='invisible whitespace-pre px-1.5 text-lg'>
              {value || " "}
            </span>
            <input
            className='absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate'
            ref = {inputref}
            value = {value}
            onChange={onChange}
            onBlur={()=>{
              setIsEditing(false)
              // setIsError(false)
            }}
            />
           </form>
        ) :(
          <span 
          onClick={()=>{
            setIsEditing(true)
            setTimeout(()=>{
              inputref.current?.focus()
            },0)
           
          }}
          className="text-lg px-1.5 cursor-pointer truncate">{title}</span>
       
        )}
        {!showLoader && !showError && <BsCloudCheck/>}
        {showLoader && <LoaderIcon className="animate-spin text-muted-foreground size-5"/>}
        {showError && <AlertTriangleIcon className="text-red-500 size-5"/>}
      </div>
    )
}


