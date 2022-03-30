import { getLangFiles } from './helper';

const enUSFiles = import.meta.globEager('../../src/**/locale/en-US.ts');

export default {
    'navbar.action.locale': 'Switch to English',
    'navbar.menu.pairs': 'Pairs',
    'navbar.menu.swap': 'Swap',
    'navbar.menu.subscribe': 'Subscribe',
    'navbar.menu.about': 'About',
    ...getLangFiles(enUSFiles)
};
