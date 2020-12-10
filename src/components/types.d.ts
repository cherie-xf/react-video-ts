interface Video  {
    title: string;
    num: number;
    duration: number;
    video: string;
    url?: string | undefined;
    id: string;
    played: boolean;
}

interface Item extends Video  {
    active: boolean;
}