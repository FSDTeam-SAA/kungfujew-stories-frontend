import sanitizeHtml from "sanitize-html"

export function sanitizeStoryContent(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: [
      "p", "br", "h1", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
      "blockquote", "ul", "ol", "li", "hr", "a", "img", "table", "thead",
      "tbody", "tr", "th", "td", "pre", "code",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
  })
}
