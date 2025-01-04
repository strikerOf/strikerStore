import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const api_base = import.meta.env.VITE_API_URL;

interface ArticleDetail{
    id:string;
    category:string;
    description:string;
    price:number;
    title:string;
    image:string;
}
const InfoArticle: React.FC = () => {
    const [myDetailArticle, setArticleDetail] = useState<ArticleDetail|null>(null)
    const {id} = useParams<Record<string,string>>();
    const getInfoArticle = () => {
        axios.get(`${api_base}/products/${id}`)
            .then((response) => {
                setArticleDetail(response.data);
                // console.log(myDetailArticle);
            })
            .catch(error => console.error('Error', error));
    }
    const addToCar = (item: any) => {
        // const upCar=localStorage.getItem('inCar');
        const arrayGuardado = JSON.parse(localStorage.getItem('miCar') || '[]');

        if (arrayGuardado) {
            const newArray = [...arrayGuardado, item]
            localStorage.setItem('miCar', JSON.stringify(newArray));
        }

    }
    useEffect(()=>{
        getInfoArticle();
    },[])
    return(
        <div className='contenedor'>
            <div className='card-legal'>
                <div>
                    <h1>{myDetailArticle?.title}</h1>
                </div>
                <div className='text-center'>
                    <img src={myDetailArticle?.image} height={300} width={300}></img>
                </div>
                <div>
                    <h2>$ {myDetailArticle?.price}</h2>
                </div>
                <div>
                    <h2>Descripcion:</h2>
                    <p>{myDetailArticle?.description}</p>
                    <button onClick={() => addToCar(myDetailArticle)} className='btn-green'>Agregar al carrito</button>
                </div>
            </div>
        </div>
    );
}

export default InfoArticle;