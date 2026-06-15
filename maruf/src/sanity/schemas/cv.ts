import { defineField, defineType } from 'sanity'

export const cvSchema = defineType({
  name: 'cv',
  title: 'CV / Portfolio',
  type: 'document',
  preview: {
    prepare: () => ({ title: 'Maruf Site' }),
  },
  fields: [
    defineField({
      name: 'personal',
      title: 'Personal Info',
      type: 'object',
      fields: [
        defineField({ name: 'name', type: 'string', title: 'Full Name' }),
        defineField({ name: 'title', type: 'string', title: 'Professional Title' }),
        defineField({ name: 'email', type: 'string', title: 'Email' }),
        defineField({ name: 'phone', type: 'string', title: 'Phone' }),
        defineField({ name: 'location', type: 'string', title: 'Location' }),
        defineField({ name: 'linkedin', type: 'url', title: 'LinkedIn URL' }),
        defineField({ name: 'medium', type: 'url', title: 'Medium URL' }),
        defineField({ name: 'image', type: 'image', title: 'Profile Photo', options: { hotspot: true } }),
        defineField({ name: 'summary', type: 'text', title: 'Summary / Bio', rows: 5 }),
        defineField({
          name: 'skills',
          type: 'array',
          title: 'Skills',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        }),
      ],
    }),
    defineField({
      name: 'workExperience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'company', type: 'string', title: 'Company' }),
            defineField({ name: 'role', type: 'string', title: 'Role / Title' }),
            defineField({ name: 'date', type: 'string', title: 'Date Range' }),
            defineField({ name: 'location', type: 'string', title: 'Location' }),
            defineField({
              name: 'images',
              type: 'array',
              title: 'Photos',
              of: [{ type: 'image', options: { hotspot: true } }],
            }),
            defineField({
              name: 'details',
              type: 'array',
              title: 'Description (bullets)',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'company', subtitle: 'role' },
          },
        },
      ],
    }),
    defineField({
      name: 'researchExperience',
      title: 'Research Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'organization', type: 'string', title: 'Organization' }),
            defineField({ name: 'title', type: 'string', title: 'Project Title' }),
            defineField({ name: 'date', type: 'string', title: 'Date Range' }),
            defineField({ name: 'location', type: 'string', title: 'Location' }),
            defineField({
              name: 'images',
              type: 'array',
              title: 'Photos',
              of: [{ type: 'image', options: { hotspot: true } }],
            }),
            defineField({ name: 'details', type: 'text', title: 'Description', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'organization' },
          },
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'degree', type: 'string', title: 'Degree' }),
            defineField({ name: 'institution', type: 'string', title: 'Institution' }),
            defineField({ name: 'year', type: 'string', title: 'Year' }),
          ],
          preview: {
            select: { title: 'degree', subtitle: 'institution' },
          },
        },
      ],
    }),
    defineField({
      name: 'academic',
      title: 'Workshops & Training',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cvFile',
      title: 'CV / Resume (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
  ],
})
