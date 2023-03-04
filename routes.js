import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import Mail from './apps/Mail/pages/MailIndex.js'
import Note from './apps/keep/pages/NoteIndex.js'
import details from './apps/Mail/pages/MailDetails.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/mail',
			component: Mail,
		},
		{
			path: '/note',
			component: Note,
		},
		{
			path: '/mail/:mailId',
			component: details,
		},
	],
}

export const router = createRouter(routerOptions)
