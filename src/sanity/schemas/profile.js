export default {
  name: 'profile',
  title: 'Profile Settings',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow Text (Small header above name)',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Biography Description',
      type: 'text',
    },
    {
      name: 'gpa',
      title: 'GPA String',
      type: 'string',
    },
    {
      name: 'resume',
      title: 'Upload Resume PDF',
      type: 'file',
      options: {
        accept: '.pdf' // Restricts uploads strictly to PDF files
      }
    },
    {
      name: 'image',
      title: 'Profile Portrait (Stardew Valley Style)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    },
    {
    name: 'backgroundImage',
    title: 'Background Image',
    type: 'image',
    options: {
        hotspot: true, // Enables cropping/positioning tools in the studio
    },
    }
  ]
}