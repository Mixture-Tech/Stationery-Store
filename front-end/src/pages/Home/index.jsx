import SlideProduct from './components/SlideProduct'
import SuggestProduct from './components/SuggestProduct';

const Home= () =>{
    return (
        <main>
            <div className="flex gap-10 flex-col items-center justify-center w-full p-4">
                <SlideProduct title='Xu hướng'/>
                <SlideProduct title='Nổi bật'/>
                <SlideProduct title='Nổi bật'/>
            </div>
            <div className='flex gap-2 items-center justify-center mt-10'>
                <SuggestProduct></SuggestProduct>
            </div>
        </main>
    );
}

export default Home;