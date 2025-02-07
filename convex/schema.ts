import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
// import { init } from "next/dist/compiled/webpack/webpack";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId:v.string(),
    roomId:v.string(),
    organizationId:v.string(),
  })
  .index("by_owner_id", ["ownerId"])
  .index("by_organization_id", ["organizationId"])
  .searchIndex("search_title", {
    searchField: "title",
    filterFields:["ownerId","organizationId"]
  })
});