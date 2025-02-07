"use client"
import { BoldIcon, FileIcon, FilePenIcon, FileTextIcon, GlobeIcon, ItalicIcon,  PrinterIcon, Redo2Icon, RemoveFormatting, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';
import Image from 'next/image';
import { DocumentInput } from './document-input';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarMenu,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "../../../components/ui/menubar";
import {  BsFilePdf } from 'react-icons/bs';
import { useEditorStore } from '../../../store/use-editor-store';
import Link from "next/link";
import { Doc } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RenameDialog } from '../../../components/rename-dialog';
import  {RemoveDialog} from '../../../components/remove-dialog';

interface NavbarProps {
    data: Doc<"documents">
}


export const Navbar = ({data}:NavbarProps) => {
    
    const router = useRouter()
    const {editor} = useEditorStore()
   const mutation = useMutation(api.documents.create)

   const onNewDocument = () => {
    mutation({title: "Untitled", initialContent: ""})
      .then((documentId)=>{
        toast.success("Document created")
        router.push(`/documents/${documentId}`)
      }).catch(()=>{
        toast.error("Error creating document")
      })
      
   }


    const insertTable = ({rows,cols}:{rows:number,cols:number}) => {
        editor?.chain().focus().insertTable({rows, cols, withHeaderRow: false}).run()
    }

    const onDownload = (blob:Blob,filename:string)=>{
      const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
    }

    const onSaveJson = () => {
        if(!editor) return
        const content = editor.getJSON()
        const blob = new Blob([JSON.stringify(content)], {type:'application/json'})
        onDownload(blob, `${data.title}.json`)
    }
    const onSaveHTML = () => {
        if(!editor) return
        const content = editor.getHTML()
        const blob = new Blob([content], {type:'text/html'})
        onDownload(blob, `${data.title}.html`)
    }
const onSaveText = () => {
    if(!editor) return
    const content = editor.getText()
    const blob = new Blob([content], {type:'text/plain'})
    onDownload(blob, `${data.title}.txt`)
}
    return (
        <nav className='flex items-center justify-start gap-4'>
            <div className='flex gap-2 items-center'>
              <Link href='/'>
                <Image src="/logo.svg" alt='logo' width={36} height={36}/>
              </Link>
            </div>
            <div className='flex flex-col'>
                <DocumentInput title = {data.title} id = {data._id}/>
                <div className='
                flex'>
                    <Menubar className='border-none bg-transparent shadow-none h-auto'>
                    <MenubarMenu>
                        <MenubarTrigger>
                            File
                        </MenubarTrigger>
                        <MenubarContent className='print:hidden'>
                            <MenubarSub>
                                <MenubarSubTrigger>
                                    <FileIcon className='mr-2 size-4'/>
                                    Save
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem onClick={onSaveJson}>
                                        <FileIcon className='mr-2 size-4'/>
                                        JSON
                                    </MenubarItem>
                                    <MenubarItem onClick={onSaveHTML}>
                                        <GlobeIcon className='mr-2 size-4'/>
                                        HTML
                                    </MenubarItem>
                                    <MenubarItem onClick={()=>window.print()}>
                                        <BsFilePdf className='mr-2 size-4'/>
                                        PDF
                                    </MenubarItem>
                                    <MenubarItem onClick={onSaveText}>
                                        <FileTextIcon className='mr-2 size-4'/>
                                        Text
                                    </MenubarItem>
                                    </MenubarSubContent>                            
                            </MenubarSub>
                          <MenubarItem onClick={onNewDocument}>
                            <FileIcon className='mr-2 size-4'/>
                            New Document
                          </MenubarItem>
                          <MenubarSeparator/>
                          <RenameDialog documentId={data._id} initialTitle={data.title}>
                          <MenubarItem
                          onClick={(e)=>e.stopPropagation()}
                          onSelect={(e)=>e.preventDefault()}
                          >
                            <FilePenIcon className='mr-2 size-4'/>
                            Rename
                          </MenubarItem>
                          </RenameDialog>
                          <RemoveDialog documentId={data._id}>
                          <MenubarItem onClick={(e)=>e.stopPropagation()}
                             onSelect={(e)=>e.preventDefault()}
                            >
                           
                            <TrashIcon className='mr-2 size-4'/>
                            Remove
                          </MenubarItem>
                          </RemoveDialog>
                          <MenubarSeparator />
                          <MenubarItem onClick = {() => window.print()}>
                            <PrinterIcon className='mr-2 size-4'/>
                            Print <MenubarShortcut>Ctrl + P</MenubarShortcut>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                            Edit
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick = {() => editor?.chain().focus().undo().run()}>
                                <Undo2Icon className='mr-2 size-4'/>
                                Undo<MenubarShortcut>Ctrl + Z</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                <Redo2Icon className='mr-2 size-4'/>
                                Redo<MenubarShortcut>Ctrl+Y</MenubarShortcut>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                            Insert
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarSub>
                                <MenubarSubTrigger>
                                    Table
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem onClick={() => insertTable({rows:1,cols:1})}>
                                        1 x 1
                                    </MenubarItem>
                                    <MenubarItem onClick={() => insertTable({rows:2,cols:2})}>
                                        2 x 2
                                    </MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                            Format
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarSub>
                                <MenubarSubTrigger>
                                    <TextIcon className='mr-2 size-4'/>
                                    Text
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                        <BoldIcon className='mr-2 size-4'/>
                                        Bold <MenubarShortcut>Ctrl + B</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                        <ItalicIcon className='mr-2 size-4'/>
                                        Italic <MenubarShortcut>Ctrl + I</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                        <UnderlineIcon className='mr-2 size-4'/>
                                        Underline <MenubarShortcut>Ctrl + U</MenubarShortcut>
                                    </MenubarItem>
    
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                <RemoveFormatting className='mr-2 size-4'/>
                                Clear Formatting
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                    </Menubar>
                </div>
            </div>
        </nav>
    )
}