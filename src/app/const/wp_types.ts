export type WorkType = {
    acf: {
        credit: string,
        description: string,
        period: string,
        thumbnail: string,
        extend_column: boolean,
        extend_row: boolean,
    },
    id: number,
    categories: number[],
    content: {
        rendered: string,
    },
    title: {
        rendered: string,
    }
};

export type WPParamType = {
    id?: number,
    categories?: string,
    per_page?: string,
    page?: string,
    orderby?: string,
    filter?: string,
};

export type CatType = {
    id: number,
    name: string,
    parent: number,
    slug: string,
}

export type ReconstructCatsType = {
    works: CatType[],
    studies: CatType[],
    artists: CatType[],
};

export type navItemType = {
    text?: string,
    path?: string,
    items?: navItemType[],
    isChild?: boolean,
    catId?: number | null,
    onClick?: ()=>void,
};

export type MemberType = {
    acf: {
        name: string,
        english_name: string,
        position: string,
        bio: string,
        pic: string,
    },
    id: number,
};