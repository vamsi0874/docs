"use client"
import { Separator } from '../../../components/ui/separator';
import { cn } from '../../../lib/utils';
import { useEditorStore } from '../../../store/use-editor-store';
import {AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, Underline, Undo2Icon, UploadIcon} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent
} from '../../..//components/ui/dropdown-menu';
// import Headings from '@tiptap/extension-headings';
import { type Level } from '@tiptap/extension-heading';
import { SketchPicker, type ColorResult} from "react-color"
import { useState } from 'react';
import { Input } from '../../..//components/ui/input';
import { Button } from '../../..//components/ui/button'; 
import {Dialog,
    DialogTitle,
    DialogContent,
    DialogHeader,
    DialogFooter
} from '../../../components/ui/dialog';

const AlignButton = ()=>{
    const {editor} = useEditorStore();

   const alignments = [
     {
        label: "Align Left",
        value: "left",
        icon: AlignLeftIcon,
     },
     {
        label: "Align Center",
        icon: AlignCenterIcon,
        value: "center",
     },
     {
        label: "Align Right",
        icon: AlignRightIcon,
        value: "right",
     },
     {
        label: "Justify",
        icon: AlignJustifyIcon ,
        value: "justify",
     }
   ]

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden'>
                    <AlignLeftIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
               {alignments.map(({label,icon:Icon,value})=>(
                 <button
                 key={value}
                 onClick={()=> editor?.chain().focus().setTextAlign(value).run()}
                 className = {cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.isActive( {textAlign: value}) && "bg-neutral-200/80"
                       
                 )}
                 >
                        <Icon className='size-4'/>
                        <span className='text-sm'>{label}</span>
                 </button>
               ))}
               
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const ImageButton = ()=>{
    const {editor} = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState("");
    
    
    const onChange = (src: string) => {
        editor?.chain().focus().setImage({src}).run();
    }

    const onUpload = () => {
        const input = document.createElement("input")
        input.type = "file";
        input.accept = "/image/*";
   
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]

            if (file) {
              const imageUrl = URL.createObjectURL(file);
              onChange(imageUrl);            }
        };
        input.click();
        };

        const handleImageUrlSubmit = () =>{
            if(imageUrl){
                onChange(imageUrl);
                setIsDialogOpen(false);
            }
        }

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden'>
                    <ImageIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
               <DropdownMenuItem onClick={onUpload}>
                <UploadIcon className='size-4 mr-2'/>
                upload
               </DropdownMenuItem>
               <DropdownMenuItem>
                <SearchIcon className='size-4 mr-2'/>
                Paste image url
               </DropdownMenuItem>
               
            </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
           <DialogContent>
              <DialogHeader>
                  <DialogTitle>
                        Inser Image URL
                  </DialogTitle>
                </DialogHeader>
                <Input
                placeholder='Insert image URL'
                value = {imageUrl}
                onChange={(e)=> setImageUrl(e.target.value)}
                onKeyDown={(e)=> e.key === 'Enter' && handleImageUrlSubmit()}
                />
                <DialogFooter>
                <Button onClick={handleImageUrlSubmit}>Insert</Button>
                </DialogFooter>
           </DialogContent>
              
        </Dialog>
        </>
    )
}

const LinkButton = ()=>{
    const {editor} = useEditorStore();

    const [value, setValue] = useState(editor?.getAttributes('link')?.href || "");
    
    
    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
    }

    return (
        <DropdownMenu onOpenChange={(Open)=>{
            if(!Open){
                setValue(editor?.getAttributes('link')?.href || "");
            }
        } }>
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden'>
                    <Link2Icon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
               <Input
               placeholder='https://example.com'
               value={value}
               onChange={(e)=>setValue(e.target.value)}
               />
               <Button onClick={()=> onChange(value)}>Apply</Button>
               
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightColorButton = () => {
    const {editor} = useEditorStore();
   const value = editor?.getAttributes('highlight')?.color || '#FFFFFF';

    
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({color:color.hex}).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden'>
                    <HighlighterIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker 
                color={value}
                onChange={onChange}/>
               
            </DropdownMenuContent>
        </DropdownMenu>
    )

}

const TextColorButton = () => {
    const {editor} = useEditorStore();
   
    const value = editor?.getAttributes('textStyle').color || '#000000';
   
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 w-7 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden'>
                    <span className='text-xs'>
                        A
                    </span>
                    <div className='h-0.5 w-full' style={{backgroundColor: value}}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker color={value} 
                onChange={onChange}/>
               
            </DropdownMenuContent>
        </DropdownMenu>
    )

}
const HeadingLevelButton = () => {
    const {editor} = useEditorStore();

    const headings = [
        {Label : "Normal Text", value: 0, fontSize: '16px'},
        {label: 'H1', value: 1, fontSize:'32px'},
        {label: 'H2', value: 2,fontSize:'24'},
        {label: 'H3', value: 3,fontSize:'20'},
        {label: 'H4', value: 4,fontSize:'18'},
        {label: 'H5', value: 5,fontSize:'16'},
    
    ]
  const getCurrentHeading = () => {

    for (let level = 1; level <= 5; level++) {
        if(editor?.isActive('heading', {level})){
            return `Heading ${level}`;
        }
    }
    return `Normal Text`
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <button className='text-sm min-w-7 h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden'>
            <span className='truncate'>
                {getCurrentHeading()}
            </span>
            <ChevronDownIcon className='shrink-0 ml-2 size-4'/>
        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
            {headings.map(({label,value,fontSize})=>(
                <button
                key = {value}
                style={{fontSize}}
                onClick={ ()=>{
                    if(value === 0){
                        editor?.chain().focus().setParagraph().run()
                    } else {
                        editor?.chain().focus().toggleHeading({level: value as Level}).run()
                    }
                }}
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    (value === 0 && !editor?.isActive("heading")) || editor?.isActive('heading', {level: value}) && "bg-neutral-200/80"
                )}
                >
                    {label}
                </button>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}



const FontFamilyButton = () => {
    const {editor} = useEditorStore();
    const fonts = [
        {label: 'Arial', value: 'Arial'},
        {label: 'Georgia', value: 'Georgia'},
        {label: 'Impact', value: 'Impact'},
        {label: 'Tahoma', value: 'Tahoma'},
        {label: 'Times New Roman', value: 'Times New Roman'},
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 p-2'>
                    <span className='truncate'>
                        
                        {editor?.getAttributes("textStyle")?.fontFamily || 'Arial'}
                    </span>
                    <ChevronDownIcon className='shrink-0 ml-2 size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {fonts.map(({label,value})=>(
                    <button
                    onClick={()=> editor?.chain().focus().setFontFamily(value).run()}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.getAttributes("textStyle").fontFamily === value && "bg-newtral-200/80"
                    )}
                    key={value}
                    style={{fontFamily: value}}>
                      <span>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface ToolbarButtonProps {
onClick?: ()=> void;
isActive?: boolean;
icon: LucideIcon;
}

const ToolBarButton = ({ onClick,
    isActive,
    icon: Icon,}: ToolbarButtonProps) => {
   
   
    return (
    <button
    onClick={onClick}
    className={cn(
    "text—sm h—7 min-w—7 flex items—center justify-center rounded-sm hover:bg-neutral-200/80 p-2",
    isActive &&  "bg-neutral-200/80"
    )}>
        <Icon className='size-4'/>
    </button>
 )
}
export const Toolbar= () => {

    const {editor } = useEditorStore();

   
    const sections: {
        label: string;
        icon:LucideIcon;
        onClick: ()=> void;
        isActive?: boolean;
    }[][]   = [
        [
            {
                label: 'undo',
                icon: Undo2Icon,
                onClick: ()=> editor?.chain().focus().undo().run(),
            },
            {
                label: 'Redo',
                icon: Redo2Icon,
                onClick: ()=> editor?.chain().focus().redo().run(),
            },
            {
                label: 'Print',
                icon: PrinterIcon,
                onClick: ()=> window.print(),
            },
            {
                label: 'Spell Check',
                icon: SpellCheckIcon,
                onClick: ()=> {
                    const current = editor?.view.dom.getAttribute('spellcheck');
                 editor?.view.dom.setAttribute('spellcheck',current === 'false' ? 'true' : 'false');
                }
            },
            {
                label:"Bold",
                icon: BoldIcon,
                isActive: editor?.isActive('bold') || false,
                onClick: ()=> editor?.chain().focus().toggleBold().run(),
            },
            {
                label:"Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive('italic') || false,
                onClick: ()=> editor?.chain().focus().toggleItalic().run(),
            },
            {
                label:"Underline",
                icon: Underline,
                isActive: editor?.isActive('underline') || false,
                onClick: ()=> editor?.chain().focus().toggleUnderline().run(),
            },
           
        ],
        [
            {
              label:"comment",
              icon:MessageSquarePlusIcon,
              onClick:()=> {
                console.log('comment')
              },
               isActive: false,
              },
              {
                label:"List Todo",
                icon:ListTodoIcon,
                onClick:()=> editor?.chain().focus().toggleTaskList().run(),
                 isActive: editor?.isActive('taskList') || false,
              },
              {
                label:"Remove Formatting",
                icon:RemoveFormattingIcon,
                onClick:()=> editor?.chain().focus().unsetAllMarks().run(),
              
              }
          ]
    ]

    return (
        <div className='bg-[#F1F4F9] px—2.5 py—0.5 rounded— [24px] min-h-[40px] flex items—center gap-x-0.5'>
          {sections[0].map((item)=>(
            <ToolBarButton key = {item.label} {...item}/>
          ))}
        <Separator orientation='vertical' className='h—6 bg-neutral-300'/>
        <FontFamilyButton/>
        <Separator orientation='vertical' className='h—6 bg-neutral-300'/>
        <HeadingLevelButton/>
      
        <Separator orientation='vertical' className='h—6 bg-neutral-300'/>
        {/* font size */}
        <Separator orientation='vertical' className='h—6 bg-neutral-300'/>
        {sections[1]?.map((item)=>(
            <ToolBarButton key = {item.label} {...item}/>
        ))}
       <TextColorButton/>
        <HighlightColorButton/>
        <Separator orientation='vertical' className='h—6 bg-neutral-300'/>
      <LinkButton/>
        <ImageButton/>
        <AlignButton/>
        {/* line highlighter */}
        {/* list */}
        {sections[2]?.map((item)=>(
            <ToolBarButton key = {item.label} {...item}/>
        ))}
        </div>
    );
};
