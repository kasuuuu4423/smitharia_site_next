import type { WPParamType, WorkType, CatType, ReconstructCatsType, MemberType } from "../const/wp_types";
import { WPWorkUrl, WPCatUrl, WPMemberUrl } from "../const/wp_api"

class WP{
    static isMatchCat = ( selectedCats: string[], workCats: string[]) =>{
        let tmp = [];
        for(let cat of selectedCats){
            if(workCats.includes(cat)){
                tmp.push(cat);
            }
        }
        return selectedCats.length === tmp.length;
    }

    static objectToQueryString(obj: {[key: string]: string}): string{
        let queryString = "";
        Object.keys(obj).forEach(key => {
            queryString += key + "=" + obj[key] + "&";
        });
        return queryString;
    }

    static async getWPData(){
        const cats = await WP.getCats();
        const works = await WP.getWorks({
                per_page: '10',
                page: '1',
                categories: '',
                orderby: '',
            });
        return {
            cats: cats,
            works: works,
        };
    }

    static async getWork(id: number): Promise<WorkType>{
        const u = new URL(WPWorkUrl+id+"/");
        const worksRes = await fetch(u);
        const work: WorkType = await worksRes.json();
        return work;
    }

    static async getWorks(
        params: WPParamType = {} as WPParamType
    ): Promise<WorkType[]>{
        const u = new URL(WPWorkUrl);
        const p: {[key: string]: string} = this.deleteEmptyParam(params);
        u.search = this.objectToQueryString(p);
        const worksRes = await fetch(u);
        const works: WorkType[] = await worksRes.json();
        return works;
    }

    static async getCat(id: number): Promise<CatType>{
        const u = new URL(WPCatUrl+id+"/");
        const p: {[key: string]: string} = {
            'per_page': "100",
        };
        u.search = this.objectToQueryString(p);
        const catRaw = await fetch(u);
        const cat: CatType = await catRaw.json();
        return cat;
    }

    static async getRawCats(): Promise<CatType[]>{
        const u = new URL(WPCatUrl);
        const p: {[key: string]: string} = {
            'per_page': "100",
        };
        u.search = this.objectToQueryString(p);
        const catsRaw = await fetch(u);
        const cats: CatType[] = await catsRaw.json();
        return cats;
    }

    static async getCats(): Promise<ReconstructCatsType>{
        const u = new URL(WPCatUrl);
        const p: {[key: string]: string} = {
            'per_page': "100",
        };
        u.search = this.objectToQueryString(p);
        const catsRaw = await fetch(u);
        const cats = this.reconstructCats(await catsRaw.json());
        return cats;
    }

    static async getMembers(): Promise<MemberType[]>{
        const u = new URL(WPMemberUrl);
        const p: {[key: string]: string} = {
            'per_page': "100",
        };
        u.search = this.objectToQueryString(p);
        const membersRaw = await fetch(u);
        const members = await membersRaw.json();
        return members;
    }

    private static reconstructCats(rawCats: CatType[]): ReconstructCatsType{
        const cats = {} as {[key: string]: CatType[]};
        const parents: CatType[] = rawCats.filter(cat=>cat.parent===0);
        parents.forEach((parent)=>{
            cats[parent.name] = rawCats.filter(cat=>cat.parent === parent.id);
        });
        return cats as ReconstructCatsType;
    }
    
    private static deleteEmptyParam(params: WPParamType): {[key: string]: string}{
        const p: {[key: string]: string} = params;
        if(params.categories === "") delete p.categories;
        if(params.per_page === "") delete p.per_page;
        if(params.orderby === "") delete p.orderby;
        if(params.page === "") delete p.page;
        return p;
    }
}

export default WP;