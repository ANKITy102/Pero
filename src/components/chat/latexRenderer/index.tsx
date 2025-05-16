import katex from "katex"

// Function to render LaTeX in a string
export function renderLatex(text: string): string {
  if (!text) return ""

  // Find all LaTeX expressions (between $$ and $$)
  const latexRegex = /\$\$(.*?)\$\$/g

  return text.replace(latexRegex, (match, latex) => {
    try {
      // Render the LaTeX expression using KaTeX
      return katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
      })
    } catch (error) {
      console.error("LaTeX rendering error:", error)
      return match // Return the original text if rendering fails
    }
  })
}
