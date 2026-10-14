import { defineConfig, loadEnv } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const resumePath = process.env.VITE_RESUME_PATH || env.VITE_RESUME_PATH || 'resume/Narasimha_Swamy_Resume.pdf';
  const publicDirectory = resolve(process.cwd(), 'public');
  const resumeFile = resolve(publicDirectory, resumePath);
  let resumeAvailable = false;
  if (resumeFile.startsWith(publicDirectory + sep) && /\.pdf$/i.test(resumeFile)) {
    try { resumeAvailable = readFileSync(resumeFile).subarray(0, 5).toString() === '%PDF-'; } catch { /* Keep the missing-file fallback. */ }
  }
  return {
    plugins: [react(), tailwindcss()],
    base: process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || './',
    define: {'import.meta.env.VITE_RESUME_AVAILABLE': JSON.stringify(resumeAvailable)},
  };
});
