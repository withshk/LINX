export interface Folder{
    id:number;
    name:string;
}
export interface Link {
    id:number;
    url:string;
    title:string;
    memo:string|null;
    img:string|null;
    folderId:number|null;
    pinned:boolean;
    clickCount:number;
    createdAt:number;
}

export type SortOption = "latest" | "oldest" | "mostClicked" | "leastClicked";