import { useState, useEffect } from "react";
import { Circles } from  'react-loader-spinner';
import { fetchAdverts } from "../../servise/api";
import {AdvertsGalleryItem} from '../AdvertsGalleryItem/AdvertsGalleryItem';
import css from './AdvertsGallery.module.css';

export const AdvertsGallery = () => {
    const [adverts, setAdverts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRender, setIsRender] = useState(false);
  
    const handleFetchAdverts = async () => {
      setIsRender(false);

      try {
        const {data} = await fetchAdverts();
  
        setAdverts(data);
        setIsRender(true); 
        } 
        catch (error) {
          alert("ERROR Sorry, there are no images matching your search query. Please try again."); 
        } 
        finally {
          setIsLoading(false);
        };
      };

    useEffect(() => {
        handleFetchAdverts();
    },[]);

    return (
        isRender &&
            <div>
                {isLoading && <Circles/>}
            
                <ul className={css.advertsGallery}>
                    {adverts.map(({
                      id, 
                      img,
                      make,
                      year,
                      rentalPrice
                    }) => (
                    <AdvertsGalleryItem
                    id={id}
                    img={img}
                    make={make}
                    year={year}
                    price={rentalPrice}
                    />
                ))}
                </ul>
            </div>
    )
};