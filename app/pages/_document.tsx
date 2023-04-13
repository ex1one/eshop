import { Document, Html, DocumentHead, Main, BlitzScript } from "blitz"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body className="transition-all dark:bg-slate-800">
          <Main />
          <BlitzScript />
          <div id="portal" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
