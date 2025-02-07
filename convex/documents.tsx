import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";


export const getByIds = query({
  args: { ids: v.array(v.id("documents")) }, // Fix: Corrected syntax for array and id type
  async handler(ctx, { ids }) { // Fix: Corrected function syntax
    const documents = [];

    for (const id of ids) {
      const document = await ctx.db.get(id);

      if (document) {
        documents.push({
          id: document._id,
          name: document.title,
        });
      } else {
        documents.push({
          id: id,
          name: "[Removed]", // Handling missing documents
        });
      }
    }

    return documents;
  },
});

export const create = mutation({
  args: {title: v.optional(v.string()), initialContent: v.optional(v.string())},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if(!user){
      throw new ConvexError("Unauthorized")
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled",
      ownerId: user.subject,
      initialContent: args.initialContent,
      roomId: "defaultRoomId", // Replace with actual roomId
      organizationId:""
      // organizationId: "defaultOrganizationId" // Replace with actual organizationId
    })
  },
})

export const get = query({
  args : {paginationOpts: paginationOptsValidator , search: v.optional(v.string())},
  handler: async (ctx, {search, paginationOpts}) => {
    const user = await ctx.auth.getUserIdentity()
    if(!user){
      throw new ConvexError("Unauthorized")
    }
   
    if(search){
      return await ctx.db.query("documents").withSearchIndex("search_title",(q)=>q.search("title", search).eq("ownerId", user.subject)).paginate(paginationOpts);
    }
    return await ctx.db.query("documents")
    .withIndex("by_owner_id", (q)=>q.eq("ownerId", user.subject))
    .paginate(paginationOpts);
   
  },
});

export const removeById = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    const document = await ctx.db.get(args.id);
    if(!document){
      throw new ConvexError("Document not found")
    }
    const isOwner = document.ownerId === user.subject;
    if(!isOwner){
      throw new ConvexError("Unauthorized")
    }
    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: {id: v.id("documents"), title: v.string(), initialContent: v.optional(v.string())},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    const document = await ctx.db.get(args.id);
    if(!document){
      throw new ConvexError("Document not found")
    }
    const isOwner = document.ownerId === user.subject;
    if(!isOwner){
      throw new ConvexError("Unauthorized")
    }
    return await ctx.db.patch(args.id, {title: args.title});
  },
});

export const getById = query({
  args: {id: v.id("documents")},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    const document = await ctx.db.get(args.id);
    if(!document){
      throw new ConvexError("Document not found")
    }
   
    return document;
  },
})