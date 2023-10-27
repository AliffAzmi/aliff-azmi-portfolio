const routes = [
  {
    href: '/projects',
    label: 'Projects'
  },
  {
    href: '/blog',
    label: 'Blog'
  },
  {
    href: '#/tools',
    label: 'Tools',
    children: [
      {
        href: '#',
        label: 'CV Builder - (Coming soon)',
        target: ''
      },
      {
        href: 'https://common-command.aliffazmi.com/',
        label: 'Common Command',
        target: '_blank'
      },
      {
        href: 'https://ezgizer.aliffazmi.com/',
        label: 'EzGizer',
        target: '_blank'
      },
      {
        href: 'https://ezcaldio.aliffazmi.com/calorie-calculator',
        label: 'Calorie calculator',
        target: '_blank'
      },
      {
        href: 'https://ezcaldio.aliffazmi.com/idw-calculator',
        label: 'Ideal Waist',
        target: '_blank'
      }
    ]
  }
]

export default routes
