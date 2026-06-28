export default {
  name: 'hobby',
  title: 'Hobbies & Interests',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Order Display Number',
      type: 'number',
      description: 'Used for sorting, e.g., 1, 2, 3',
    },
    {
      name: 'title',
      title: 'Hobby Title',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Hobby Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'photo',
      title: '4:3 Display Photo',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop perfectly in Sanity
      }
    }
  ]
}