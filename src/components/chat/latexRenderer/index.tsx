// components/chat/latexRenderer.ts
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";

export function renderLatex(content: string): string {
  const blockLatexRegex = /\$\$([\s\S]+?)\$\$/g;
  const inlineLatexRegex = /\$([^\$]+?)\$/g;

  const withLatex = content
    .replace(blockLatexRegex, (_, tex) =>
      katex.renderToString(tex.trim(), { displayMode: true })
    )
    .replace(inlineLatexRegex, (_, tex) =>
      katex.renderToString(tex.trim(), { displayMode: false })
    );

  // marked.parse sometimes types as string | Promise<string>, so cast it:
  return marked.parse(withLatex) as string;
}
