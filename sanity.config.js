'use client'; // <-- MUST BE AT THE VERY TOP, ABOVE IMPORTS

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import profile from './src/sanity/schemas/profile';
import project from './src/sanity/schemas/project';
import hobby from './src/sanity/schemas/hobby';

export default defineConfig({
  name: 'default',
  title: 'Christine Portfolio',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  plugins: [structureTool()],
  schema: {
    types: [profile, project, hobby],
  },
});