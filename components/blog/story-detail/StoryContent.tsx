import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  story: ShipmentStory
}

export function StoryContent({ story }: Props) {
  if (!story.content) return null

  return (
    <article
      className="story-rendered-content ProseMirror bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-10 shadow-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: story.content }}
    />
  )
}

