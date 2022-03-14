import { CoinItem } from '@/types/types';
import atom from '@/assets/images/atom.png';
import { getImageSrc } from '@/utils';

/**
 * list of coin displays
 */
export const COIN_LIST: CoinItem[] = [
    {
        denom: 'uatom',
        name: 'ATOM',
        icon: atom
    },
    {
        denom: 'ujuno',
        name: 'JUNO',
        icon: atom
    },
    {
        denom: 'uluna',
        name: 'LUNA',
        icon: atom
    },
    {
        denom: 'uosmo',
        name: 'OSMO',
        icon: atom
    },
    {
        denom: 'uscrt',
        name: 'SCRT',
        icon: atom
    },
    {
        denom: 'ukava',
        name: 'KAVA',
        icon: atom
    },
    {
        denom: 'uxprt',
        name: 'XPRT',
        icon: atom
    },
    {
        denom: 'uakt',
        name: 'AKT',
        icon: atom
    },
    {
        denom: 'umed',
        name: 'MED',
        icon: atom
    },
    {
        denom: 'uband',
        name: 'BAND',
        icon: atom
    },
    {
        denom: 'uiris',
        name: 'IRIS',
        icon: atom
    }
];

/**
 * list of coin displays
 */
export const DISPLAY_COIN_LIST = {
    uatom: {
        name: 'ATOM',
        icon: getImageSrc('atom-logo.png')
    },
    ujuno: {
        name: 'JUNO',
        icon: getImageSrc('atom-logo.png')
    },
    uluna: {
        name: 'LUNA',
        icon: getImageSrc('atom-logo.png')
    },
    uosmo: {
        name: 'OSMO',
        icon: getImageSrc('atom-logo.png')
    },
    uscrt: {
        name: 'SCRT',
        icon: getImageSrc('atom-logo.png')
    },
    ukava: {
        name: 'KAVA',
        icon: getImageSrc('atom-logo.png')
    },
    uxprt: {
        name: 'XPRT',
        icon: getImageSrc('atom-logo.png')
    },
    uakt: {
        name: 'AKT',
        icon: getImageSrc('atom-logo.png')
    },
    umed: {
        name: 'MED',
        icon: getImageSrc('atom-logo.png')
    },
    uband: {
        name: 'BAND',
        icon: getImageSrc('atom-logo.png')
    },
    uiris: {
        name: 'IRIS',
        icon: getImageSrc('atom-logo.png')
    }
};
