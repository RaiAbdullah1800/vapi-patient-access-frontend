// CUSTOM ICON COMPONENT
import duotone from '@/icons/duotone';
export const navigation = [{
  name: 'Dashboards',
  Icon: duotone.PersonChalkboard,
  children: [{
    name: 'Analytics',
    path: '/dashboard'
  // }, {
  //   name: 'Analytics 2',
  //   path: '/dashboard/analytics-2'
   }]
}, {
  name: 'Profile',
  Icon: duotone.UserProfile,
  path: '/dashboard/profile'
}];