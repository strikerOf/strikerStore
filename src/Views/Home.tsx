import { useState, useEffect } from 'react'
import ArticleComponent from '../Components/ArticleComponent'
import '../App.css'
import axios from 'axios';
import { ArticleParams } from '../ArticleType';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const api_base = import.meta.env.VITE_API_URL;

const Home:React.FC=() =>{
    const [mysArticles, setArticle] = useState([])
    const [myStore, setMyStore] = useState<number[]>([]);

    const getArticles = () => {
        axios.get(`${api_base}/products`)
            .then((response) => {
                setArticle(response.data)
            })
            .catch(error => console.error('Error', error));
            
    }

    const checkStore=()=>{
        const storedArticles = localStorage.getItem('miCar');
        if (storedArticles) {
            const buff = JSON.parse(storedArticles);
            const arrayIds=[];
            for (let index = 0; index < buff.length; index++) {
                arrayIds.push(buff[index].id);
                
            }
            setMyStore(arrayIds);
        }
    }
    const checkItem=(item:ArticleParams):boolean=>{
        return myStore.includes(item.id);
    }
    useEffect(() => {
        // const inCar = localStorage.getItem('miCar');
        if (!localStorage.getItem('miCar')) {
            localStorage.setItem('miCar', JSON.stringify([]))
        }
        checkStore();
        getArticles();
        
    }, []);

    return (

        <div className='contenedor'>
            {mysArticles.map((item, index) => (
                <ArticleComponent key={index} params={item} isCar={false} inCar={checkItem(item)} ></ArticleComponent>
            ))}
        </div>

    )
}

export default Home
