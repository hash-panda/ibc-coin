import { getLangFiles } from './helper'

const enUSFiles = import.meta.globEager('../../src/**/locale/en-US.ts')

export default {
    'navbar.action.locale': 'Switch to English',
    'navbar.menu.tokens': 'Pairs',
    'navbar.menu.chart': 'Chart',
    'navbar.menu.subscribe': 'Subscribe',
    'navbar.menu.about': 'About',
    'navbar.menu.profile': 'Profile',
    'footer.suggestion': 'Feedback',
    ...getLangFiles(enUSFiles),
}
