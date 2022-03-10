export interface Profile {
    key: number;
    name: string;
    address: string[];
    create?: number;
    update?: number;
}

export interface ProjectBaseInfo {
    key: string;
    icon: string;
    name: string;
    claimStatus: string;
    claimStatusClass: string;
    label: string[];
    snapDate: string;
    airdropDate: string;
    description: string;
    detail?: string;
    twitter?: string;
    discord?: string;
    airdropClaim?: string;
    airdropLink?: string;
    officialWeb: string;
    coin: string;
    isCheckAccount: boolean;
    checkAccount: Function;
}

export interface AirdropInfo {
    address: string;
    amount: number | string;
    coin?: string;
}

export interface ProfileAllotted {
    profileKey: number;
    projectKey: string;
    airdropTotalAmount: number;
    checkTime?: number;
    airdrop?: AirdropInfo[];
}
