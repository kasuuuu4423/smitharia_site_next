import { WorkType } from './const/wp_types'
import WP from './features/WP'
import Works from './components/top/Works'


export default async function Home() {
  const works = await WP.getWorks({'per_page': "100",});
  const cats = await WP.getRawCats();
  return (
    <main className='w-full'>
      <Works works={works} cats={cats}/>
    </main>
  )
}
