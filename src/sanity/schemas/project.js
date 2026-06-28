const projectSchema = {
  name: 'project',
  title: 'Featured Projects',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
    },
    {
      name: 'tag',
      title: 'Project Tag',
      type: 'string',
      description: 'e.g., "full-stack", "frontend"',
    },
    {
      name: 'isLive',
      title: 'Is Live?',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'chips',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'liveUrl',
      title: 'Live Deployment URL',
      type: 'url',
    },
    {
      name: 'githubUrl',
      title: 'GitHub Repository URL',
      type: 'url',
    },
    {
    name: 'image',
    title: 'Project Screenshot',
    type: 'image',
    options: {
        hotspot: true // Enables cropping and framing directly in Studio
    }
    }
    
  ]
};

export default projectSchema;