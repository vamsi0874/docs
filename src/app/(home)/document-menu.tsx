import { ExternalLink,  FilePenIcon, MoreVertical, TrashIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Id } from "../../../convex/_generated/dataModel";

import {
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem
   
  
} from "../../components/ui/dropdown-menu"
import { RemoveDialog } from "../../components/remove-dialog"
import { RenameDialog } from "../../components/rename-dialog"

interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id:Id<"documents">) => void;
}
export const DocumentMenu = ({documentId,title,onNewTab}: DocumentMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full">
                <MoreVertical className="size-4"/>
            </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
           
                <RenameDialog documentId={documentId}
                initialTitle={title}
                >
                    <DropdownMenuItem
                    onSelect={(e)=>e.preventDefault()}
                    onClick={(e)=>e.stopPropagation}
                    > 
                    <FilePenIcon className="mr-2 size-4"/>
                        Rename
                    </DropdownMenuItem>
                </RenameDialog>
             

                <RemoveDialog documentId={documentId}>
                    <DropdownMenuItem
                    onSelect={(e)=>e.preventDefault()}
                    onClick={(e)=>e.stopPropagation}
                    > 
                    <TrashIcon className="mr-2 size-4"/>
                        Remove
                    </DropdownMenuItem>
                </RemoveDialog>
            <DropdownMenuItem
            onClick={()=>onNewTab(documentId)}
            > 
            <ExternalLink className="mr-2 size-4"/>
                Open in new Tab
            </DropdownMenuItem>
            </DropdownMenuContent>
            
        </DropdownMenu>
    )
}