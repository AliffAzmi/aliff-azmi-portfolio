import { writable } from 'svelte/store'
import Cookies from 'js-cookie'

const theme = writable('system')
const pid = writable(Cookies.get('project-id') || '')
pid.subscribe(val => Cookies.set('project-id', val))

const id = writable(Cookies.get('article-id') || '')
id.subscribe(val => Cookies.set('article-id', val))

export { theme, pid, id }
