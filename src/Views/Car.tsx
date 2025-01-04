import { useState, useEffect } from 'react'
import ArticleComponent from '../Components/ArticleComponent'
import '../App.css'
import { ArticleParams } from '../ArticleType';

const Car: React.FC = () => {

    const [mysArticles, setArticles] = useState<ArticleParams[]>([])
    const getArticles = () => {
        if (!localStorage.getItem('miCar')) {
            localStorage.setItem('miCar', JSON.stringify([]))
        } else {
            const storedArticles = localStorage.getItem('miCar');
            if (storedArticles) {
                const buff = JSON.parse(storedArticles);
                const rep = encontrarRepetidos(buff);

                setArticles(rep);
            }


        }
    }



    const sumaTotal = mysArticles.reduce((acum, art) => {
        return acum + (art.price * art.piezas);
    }, 0);
    const  encontrarRepetidos=(arr: ArticleParams[]): ArticleParams[] =>{
        const articulosPorId: { [key: number]: ArticleParams } = {};
         arr.forEach(articulo => { if (articulosPorId[articulo.id]) {
             articulosPorId[articulo.id].piezas += articulo.piezas; } 
             else { 
                articulosPorId[articulo.id] = { ...articulo }; 
            } 
            }
        ); 
        return Object.values(articulosPorId);
        }
        useEffect(() => {
            getArticles();
        }, []);

        return (

            <div className='contenedor'>
                <div className='card-full'>
                    <div>
                        <h1>Tu carrito de compras!</h1>
                    </div>
                    <div>
                        <h3>Total acumulado: $ {sumaTotal} MXN</h3>
                    </div>

                </div>
                {mysArticles.length > 0 ? (
                    mysArticles.map((item, index) => (
                        <ArticleComponent key={index} params={item} isCar={true} inCar={true}></ArticleComponent>
                    ))
                ) :
                    (<h1>No hay elementos en el carrito</h1>)
                }
            </div>

        )
    }

    export default Car
