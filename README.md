# Narasimha Swamy — Portfolio

React + JavaScript, Vite, Tailwind CSS (Vite plugin), Framer Motion, and Lucide React. All five sections are implemented. The original portrait is used without modification.

## Local development

Requires a compatible Node.js installation (the supplied Node 24 is suitable).

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Personal configuration

Copy `.env.example` to `.env.local` and fill only values you have:

- `VITE_FORMSPREE_FORM_ID`: Your real Formspree form ID. Replace the example value `your_form_id_here`; it is rejected as unconfigured. The old `VITE_FORMSPREE_ID` variable is no longer used. See the setup steps below.
- `VITE_CONTACT_EMAIL`: Defaults to `swamychekka7@gmail.com`. Adds clickable mail links to the contact section and social icons. Changing this browser setting does not change the recipient configured in Formspree.
- `VITE_RESUME_PATH`: Optional override; leave unset to use `public/resume/Narasimha_Swamy_Resume.pdf`. The actual PDF is included. Both resume buttons use the deployment base URL and download as `Narasimha_Swamy_Resume.pdf`. File availability is checked at server start/build. The old modal is removed; a missing PDF results in a disabled fallback. Restart/rebuild after replacing or adding the PDF.
- All VITE variables are public browser configuration. Do not put private API keys in them.

Update `src/data/projects.js` with actual screenshot paths, repository URLs, and demo URLs when available. Screenshot placeholders are explicitly labeled. Future project ideas are labeled planned. Authentication/access controls are not claimed because implementation details have not been supplied.

Personal data: `src/data/personalInfo.js`. Skills and learning roadmap: `src/data/skills.js`. Reusable UI: `src/components/`. Five page sections: `src/sections/`.

## Deployment preparation (nothing is deployed)

The project is prepared for GitHub upload and Vercel deployment. No repository has been initialized and nothing has been uploaded or deployed. Follow the steps below only when you choose to proceed.

### Upload to GitHub when authorized

1. Create an empty GitHub repository with your chosen visibility. Do not add a generated README, license, or gitignore to the remote; this project already has its own files.
2. In `D:\Portfolio`, initialize Git locally and review only the intended source files:

```sh
git init
git branch -M main
git add .gitignore .env.example README.md package.json package-lock.json index.html vite.config.js vercel.json src public tests
git status --short
git diff --cached --stat
```

3. Confirm that `public/images/profile-standing.png` and `public/resume/Narasimha_Swamy_Resume.pdf` are staged, and that `.env`, `.env.local`, `node_modules/`, `dist/`, and `.vercel/` are absent. The selective staging command also leaves the unused `design-review/` portrait edits out of the upload. Do not use `git add -f` for ignored files.
4. When ready to upload, commit the reviewed source, add the exact remote URL provided by your GitHub repository, and push the `main` branch. No commit, remote, or push has been performed by this preparation task.

### Deploy on Vercel when authorized

1. Sign in to Vercel, choose Add New → Project, and import the actual GitHub repository you uploaded.
2. Set the root directory to the repository root. Use Framework Preset **Vite**, Build Command **`npm run build`**, Output Directory **`dist`**, Install Command **`npm install`**. These settings are also declared in `vercel.json`. Use a Node version compatible with the supplied Node 24 environment.
3. Before the first build, add `VITE_FORMSPREE_FORM_ID` = `mgaonbyn` in Vercel's project environment variables for **Production** and **Preview**. The local `.env` stays on your computer and must not be uploaded to GitHub. The Formspree form ID is public client configuration; do not add Gmail passwords, private API keys, or access tokens.
4. Optional public variables: `VITE_CONTACT_EMAIL=swamychekka7@gmail.com`; `VITE_BASE_PATH=/` for a root-hosted Vercel site. Leave `VITE_RESUME_PATH` unset to use the included default PDF. Never configure a GitHub Pages repository subpath for the Vercel root site.
5. Click Deploy only when you are ready to publish. If you change environment values after a deployment, redeploy so Vite includes the new values in the browser bundle.
6. Verify the published homepage, all five section links, photo, both resume downloads, and the direct `/resume/Narasimha_Swamy_Resume.pdf` URL. Submit a real enquiry and confirm arrival at `swamychekka7@gmail.com`. Check on desktop and mobile browsers.

This project uses hash navigation within one page, so no catch-all routing rewrite is needed. Vite copies the `public/` image and PDF into `dist/` and the buttons use `BASE_URL` for deployment paths.

Official references: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel environment variables](https://vercel.com/docs/environment-variables).

GitHub Pages: use the ACTUAL repository name, not a guessed name. Set `VITE_BASE_PATH=/actual-repository-name/` in your build environment (or `/` for a user/organization root site). Run `npm ci` and `npm run build`, then publish `dist` through your approved GitHub Pages workflow. Asset URLs use Vite's base. No workflow, remote repository, or public deployment is created automatically.

## Accessibility and behavior

Semantic sections, skip link, mobile menu with expanded state, active-section navigation, keyboard focus, descriptive portrait alt text, reduced-motion handling, image fallback, and responsive layouts. The Home portrait restores the original arched white frame, thin border, caption, and decorative vertical text. The original photo uses object-fit: contain and its natural proportions. No radial glow or feathered mask is applied to the active Home portrait. Mobile stacks text before the portrait.

## Original photograph preservation

The original `public/images/profile-standing.png` is unchanged (SHA-256: `336B0061330EEF32644676D9C67FC2AAA9CE3DF4E9F2F72301AB9BAEFA34279E`). Two built-in imagegen background-removal attempts produced cutouts but changed photographic details. Neither is used in the site. Review-only copies are under `design-review/`, outside the public assets. Their alpha output is not represented as an accurate cutout of the source.

The original framed design is restored. No transparent cutout is used in the Home section. Historical review images are retained separately and are not public website assets.

## Connect Formspree

1. Sign in to your own [Formspree account](https://formspree.io/) and create a form for this portfolio.
2. Select `swamychekka7@gmail.com` as the notification destination. Complete Formspree's email verification and ensure email notifications are enabled for this form. The destination is controlled in your Formspree dashboard, not by frontend JavaScript.
3. Copy only the form ID from the form endpoint `https://formspree.io/f/<form-id>`.
4. Copy `.env.example` to `.env.local` if that file does not already exist. Set `VITE_FORMSPREE_FORM_ID` to your real ID, retaining any existing environment settings. Do not paste the whole endpoint or leave `your_form_id_here`.
5. Restart `npm run dev`. For production, set the same variable in the build environment and rebuild.
6. Submit a real test enquiry from the portfolio. Verify the success message, the submission in the Formspree dashboard, and its arrival at `swamychekka7@gmail.com` (check spam too).

Until a valid ID is configured, Send Message remains disabled and the clickable email link is available. The integration validates required fields, email syntax and whitespace-only values, prevents in-flight duplicates, shows loading/success/error feedback, preserves input on failure and clears only on success. No private credentials are needed in frontend code.

The real Formspree form ID `mgaonbyn` is configured in the ignored local `.env` file and has been preserved. You confirmed receiving a test notification in Gmail. No additional live test message was sent during this audit. If `.env.local` also defines this variable, that file takes precedence. Production must receive the same ID through Vercel's environment configuration.

Run `node --test tests/contactSubmission.test.js` to verify submission behavior with mocked requests. These tests do not send mail or independently prove inbox delivery. Browser-native email validation and responsive visuals still require a browser check.

Reference: [Formspree submission documentation](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/).

## Updated projects

Personal Developer Portfolio is listed as Completed — Local Development alongside Medical Image Fusion. Its preview is a clearly labeled illustrative rendering of the existing design. The public demo is marked Coming Soon and no repository URL is invented. Planned projects remain separate. Existing project-card copy still describes the resume/contact features as pending; this audit preserves website content and design as requested, though the actual resume and contact configuration are now available.

## Deployment audit — 14 October 2026

- `npm run build`: passed without build warnings; generated `dist/`.
- All 8 available contact submission tests passed.
- All five sections, internal anchor targets, image references, both resume links, social URLs, and contact fields passed server-rendered smoke checks at `/` and `/portfolio/` bases. These checks are not browser interaction tests.
- Production preview returned HTTP 200 for the page, portrait PNG, and resume PDF (`application/pdf`, 76,816 bytes). Source and built asset hashes matched.
- `.gitignore` contains all requested exclusions, plus other `.env.*` files and `.vercel/`; `.env.example` remains includable. There is no Git repository yet, so no tracked files or staged secrets exist to audit.
- No private-key filenames or common hardcoded credential patterns were detected in the inspected source/configuration text. Only the public Formspree ID is configured in `.env`; that file is excluded from upload. This is a scoped pattern scan, not a guarantee that arbitrary files contain no sensitive material.
- `design-review/` holds two unused generated portrait attempts and is not currently ignored. Leave it out using the selective staging command above. Do not upload the whole workspace manually.
- Browser automation was unavailable. Desktop/mobile visual layout, horizontal overflow, browser runtime console, and cross-browser download behavior were not independently tested in a real browser during this audit.
- Ready for a reviewed GitHub upload using the intended file list. Vercel build configuration is ready; set the production/preview Formspree variable before publishing. No upload or deployment has occurred.

## Replace the project preview with a real screenshot

Browser screenshot capture was unavailable in this environment. The labeled placeholder now illustrates the current arched bordered portrait, without the old frameless image or silver glow. It is still explicitly marked as not a screenshot. The actual Home section has not been changed.

1. Open `http://127.0.0.1:5173/` in your browser at desktop width. Scroll to the top and wait for the entrance animation to finish.
2. Capture the visible homepage, including the navigation, Narasimha Swamy heading, and framed portrait. In Edge or Chrome, Developer Tools → command menu → `Capture screenshot` captures the viewport. Save the actual PNG as `public/images/portfolio-preview.png`.
3. In `src/data/projects.js`, set only the Personal Developer Portfolio project's `screenshot` to `'images/portfolio-preview.png'` instead of `null`.
4. Reload the portfolio. The real screenshot replaces the illustration and its placeholder label automatically. Run `npm run build` again before any future deployment.

Do not supply a generated screenshot. No `portfolio-preview.png` has been created because there is no actual browser capture yet.
