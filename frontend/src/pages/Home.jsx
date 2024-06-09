import './Home.css'

import FeaturedProperties from '../components/FeaturedProperties.jsx'
import FeaturedProperties1 from '../components/FeaturedProperties1.jsx'
import MainCarousel from '../components/MainCarousel.jsx'


const Home = () =>{

    return (
        <div className='main-wrapper'>
            {/* Carousel */}
            <MainCarousel />
            <br />
            <h2>Listed properties</h2>
            <FeaturedProperties />           
        </div>   
    )

}

export default Home

                
