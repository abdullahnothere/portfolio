import { ButtonLink } from "@/components/ui/button";
import { CodePanel } from "@/components/ui/code-panel";

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[60vh] place-items-center py-20">
      <div className="w-full max-w-[560px]">
        <p className="mb-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mint">404</p>
        <h1 className="mb-4 text-[clamp(2rem,4vw,2.8rem)]">That page isn&apos;t here</h1>
        <p className="lede mb-7">
          The link may be out of date, or I may have moved something. The projects and notes are all
          reachable from the home page, or press ⌘K to search.
        </p>
        <CodePanel
          className="mb-7"
          filename="access.log"
          variant="terminal"
          text={`GET ${"{"}requested-path{"}"} 404\nreferrer  unknown\nnext      try /#projects or /#notes`}
        />
        <ButtonLink href="/" variant="primary">Back to the home page</ButtonLink>
      </div>
    </div>
  );
}
