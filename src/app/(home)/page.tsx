"use client"
import { Navbar } from "./navbar"
import { TemplateGallery } from "./templates-gallary"
import { usePaginatedQuery } from "convex/react"

import {api} from '../../../convex/_generated/api'
import { DocumentsTable } from "./documents-table"

import { useSearchParam } from "../../hooks/use-search-param"

// type DocumentType = {
//   _id: string;
//   _creationTime: number;
//   initialContent?: string;
//   title: string;
//   ownerId: string;
//   roomId: string;
//   organizationId: string;
// };

const Home = () => {


  const [search] = useSearchParam()



  const { results,loadMore, status } =  usePaginatedQuery(api.documents.get, {search}, { initialNumItems: 5 });


   return (
    <div className='min-h-screen flex flex-col'>
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] p-4">
        <Navbar/>
      </div>
      <div className="mt-16">
       <TemplateGallery/>
       <DocumentsTable documents={results} status={status} loadMore={loadMore}/> 
     
    </div>
    </div>
  )
}

export default Home
