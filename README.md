from https://www.youtube.com/maWnIKH3JQI
# JS Engine Exploitation Heatmap (2026)

An interactive, bilingual (English & Chinese) potency heatmap summarizing the state-of-the-art JavaScript compiler and WebAssembly security research concepts from the first episode of the "Meet the Hacker" series (presented by Samuel GroÃŸ).

The application is structured as a client-side single-page application (SPA) built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It contains 50 carefully indexed security research points rated from 1 (low) to 5 (peak potency) reflecting their centrality to modern exploit development.

---

## ðŸš€ Hosting on GitHub Pages

**Yes, you can absolutely host this application on GitHub Pages!** 

Because this application is a pure client-side Single Page Application (SPA) with no backend or database requirements, it compiles to static HTML, CSS, and JavaScript files that can be served for free on any static hosting platform (such as GitHub Pages, Cloudflare Pages, Vercel, or Netlify).

### Step-by-Step Deployment Guide for GitHub Pages

#### Option A: Automatic Deployment using GitHub Actions (Recommended)

1. Create a GitHub Repository and push this codebase to it.
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Create a new file in your project: `.github/workflows/deploy.yml` with the following configuration:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ "main" ] # change to master if needed

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-size: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Commit and push the workflow file. GitHub Actions will build and deploy your app automatically!

#### Option B: Manual Build & Push (gh-pages branch)

If you prefer manual deployment:

1. Configure Vite's base path in `vite.config.ts` if your page is hosted at a sub-path (e.g., `https://<username>.github.io/<repo-name>/`):
   ```typescript
   export default defineConfig({
     base: '/<repo-name>/', // Replace with your repository name
     // ... rest of config
   });
   ```
2. Build the app:
   ```bash
   npm run build
   ```
3. Deploy the compiled `dist/` directory to a `gh-pages` branch using the `gh-pages` helper package:
   ```bash
   npm install -D gh-pages
   ```
   Add a deploy script to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run `npm run deploy` to publish!

---

## ðŸ“– English Briefing & Core Concepts

This heatmap acts as an educational index to understand the modern attack surface of high-performance JIT compilers and sandboxing mitigations:

### 1. The Core Paradox of JIT Optimizations
Modern JIT engines (like V8's Turbofan) optimize execution speeds by using **Range Analysis** to mathematically prove bounds-checks are redundant, thereby stripping them out. 
- **The Bug Vector**: If the compiler makes a faulty assumption, or if an attacker triggers an implicit side-effect (e.g., hijacking `valueOf` of an object during an optimization phase), they can invalidate the range assumptions *after* the safety checks have already been compiled out.
- **Outcome**: This converts a logic optimization bug directly into an arbitrary memory out-of-bounds read/write.

### 2. The Shift in Attack Surfaces
- **Phase 1 (DOM & Runtime Reentrancy)**: Historic bugs relied on triggering unexpected user callbacks mid-operation. These are now largely mitigated.
- **Phase 2 (Optimizer Logic)**: Complex state logic in optimization pipelines (escape analysis, type propagation) makes up over 50% of successfully exploited browser bugs.
- **Phase 3 (WebAssembly & Wasm GC)**: The integration of WebAssembly Garbage Collection (Wasm GC) has introduced massive complexity, causing type-confusion bugs when subtyping hierarchies are extended.

### 3. Progressive Mitigations
- **JIT-less Mode**: Disabling compilers reduces attack surface but carries a heavy performance cost.
- **V8 Sandbox (V8 SB)**: Rather than trying to write perfect logic, V8 isolates its entire heap in a dedicated **1 TB virtual address space**, replacing raw 64-bit pointers with array-like offsets. This contains any memory corruption inside the V8 sandbox.
- **Hardware Defense (ARM POE2)**: Future ARM architectures permit user-space permission overlays (POE2) to restrict code segment page permissions in microseconds without invoking kernel context-switching penalties.

### 4. The AI Security Revolution
The integration of LLMs (such as Googleâ€™s **Big Sleep** project and interactive agentic research platforms like **Claude Code**) has fundamentally shifted bug research. By analyzing complex semantic structures, AI agents can successfully isolate subtle logic bugsâ€”such as Web Audio thread float-mode mismatches and 28-bit exception truncationsâ€”which classic fuzzers were mathematically incapable of detecting.

---

## ðŸ› ï¸ Local Development Setup

To run this application locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Compile the production-ready static files
npm run build
```

The compiled output will be generated inside the `/dist` directory.
