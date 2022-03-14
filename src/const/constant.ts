import { CoinItem } from '@/types/types';
import atom from '@/assets/images/atom.png';
import { getSrc } from '@/utils';

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
        icon: getSrc('atom-logo.png')
    },
    ujuno: {
        name: 'JUNO',
        icon: getSrc('atom-logo.png')
    },
    uluna: {
        name: 'LUNA',
        icon: getSrc('atom-logo.png')
    },
    uosmo: {
        name: 'OSMO',
        icon: getSrc('atom-logo.png')
    },
    uscrt: {
        name: 'SCRT',
        icon: getSrc('atom-logo.png')
    },
    ukava: {
        name: 'KAVA',
        icon: getSrc('atom-logo.png')
    },
    uxprt: {
        name: 'XPRT',
        icon: getSrc('atom-logo.png')
    },
    uakt: {
        name: 'AKT',
        icon: getSrc('atom-logo.png')
    },
    umed: {
        name: 'MED',
        icon: getSrc('atom-logo.png')
    },
    uband: {
        name: 'BAND',
        icon: getSrc('atom-logo.png')
    },
    uiris: {
        name: 'IRIS',
        icon: getSrc('atom-logo.png')
    }
};
