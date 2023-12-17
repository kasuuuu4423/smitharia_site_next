import WP from '../../features/WP'
import WorkDetail from '@/app/components/work/WorkDetail';

export default async function Work(props: {params: {id: number}}) {
    const id = props.params.id;
    const work = await WP.getWork(id);
    const cats = await WP.getRawCats();
    return (
        <main className='w-full'>
            <WorkDetail work={work} cats={cats}/>
        </main>
    )
}
