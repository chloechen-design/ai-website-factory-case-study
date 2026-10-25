# AI Website Factory

An independent Product Design case study about using AI to explore, prototype, and validate a reusable multi-brand website system. The repository contains the interactive case study and its local prototype demos.

This is not commissioned work and is not an official Galileo Global Education, Penninghen, LISAA, or Paris School of Business project. No internal tools, confidential systems, or private group data were used.

## View the case study

The interactive case study is published with GitHub Pages at:

https://chloechen-design.github.io/ai-website-factory-case-study/

## Run locally

From the repository root, start any static HTTP server, for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. The prototype demos are linked from the case study and indexed at `/demos/`.

## Project structure

- `index.html`: the 22-scene interactive case study.
- `demos/`: historical and current prototype pages, component library, and supporting captures.
- `evidence/`: selected source excerpts and visual evidence referenced by the case study.
- `demos/manifest.json`: demo routes, provenance, and known limitations.

## Provenance and limitations

- All school websites and content in the prototypes are independent explorations, not official school sites. Program and institutional details should be re-verified before reuse.
- Penninghen imagery includes illustrative Pexels photos, not student work or official school imagery. Separate third-party and model permissions may apply.
- The SOP 06B LISAA and PSB pages are partial reconstructions. Their interface visibly identifies that status; they are not exact historical snapshots.
- SOP 07 `Before` captures document the earlier state. No paired historical `After` capture series was found.
- SOP 08 is a local JSON-to-component demonstration with valid and missing-data states. It is not a CMS integration or production content workflow.
- The audit and evidence files distinguish documented findings from hypotheses and later implementation work.
