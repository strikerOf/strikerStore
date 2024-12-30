import React, { useState } from 'react'; 
import { ArticleParams } from '../ArticleType';
import starCalif  from '../assets/icons/star.png'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface ArticleComponentProps { 
    params: ArticleParams;
    isCar:boolean;
    inCar:boolean;
}

const ArticleComponent: React.FC<ArticleComponentProps>=({params,isCar,inCar}) =>{
    const MySwal = withReactContent(Swal)
    let navigate = useNavigate();
    const [piezas, setPiezas] = useState(1);
    const { id, title, image, price } = params;
    const cantidadEval = Math.floor(Math.random()*(5-1)+1);
    const califications=[];
     for(let i=0; i< cantidadEval;i++){
        califications.push(
            <img src={starCalif} height={15} width={15}></img>
        )
     }
    const addToCar =(item:any,cantidad:any)=>{
        // const upCar=localStorage.getItem('inCar');
        const arrayGuardado = JSON.parse(localStorage.getItem('miCar') || '[]');

        const nItem= {...item,piezas:cantidad}
        if (arrayGuardado) {
            const newArray = [...arrayGuardado,nItem]
            localStorage.setItem('miCar', JSON.stringify(newArray));
        }
        MySwal.fire({
            title: "Agregado al Carrito!",
            text: item.title,
            icon: "success"
        }).then(() => {
            // window.location.reload();


        });
    }
    const handleClick=(id:number)=>{
        navigate(`/detail-article/${id}`)
    }
    const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setPiezas( Number(event.target.value)); 
    };
    const deleteToCar =(item:any)=>{
        const arrayGuardado:ArticleParams[] = JSON.parse(localStorage.getItem('miCar') || '[]');
        if (arrayGuardado) {
            const noElement=arrayGuardado.filter(articulo => articulo.id !==item.id);
            localStorage.setItem('miCar', JSON.stringify(noElement));
                  
                
        }
        MySwal.fire({
            title: "Agregado al Carrito!",
            text: item.title,
            icon: "success"
        }).then(() => {
            window.location.reload();


        });
         
        
    }
    
    return (
        <>
            <div className='myCard'>
                {/* <div className='text-center'>
                    <h3>$ Compra Digimon</h3>
                </div> */}
                <div className='text-center m-10 picture-card'>
                    <img src={image} height={150} width={150}></img>
                </div>
                <div className='cut-text'>
                    <b>{title}</b>
                </div>
                <div className='cut-text'>
                    <h4 className='text-blue'>${price}</h4>
                    <p className='text-14'>Piezas:
                        {isCar ? (
                            <span> {params.piezas}<br></br>
                            Subtotal: <b>{params.piezas*params.price}</b></span>
                        ):
                        (
                        <input type='number' className='input-piezas' value={piezas} onChange={manejarCambio}></input>
                        )}
                       
                        {inCar ? (<span className='added'>Added</span>) : ('')} </p>
                </div>
                <div className='Buy-ops'>
                    
                    <button onClick={() => handleClick(id)} className='pos-left btn-blue'>Info</button>
                    {isCar ? (
                        <button onClick={() => deleteToCar(params)}  className='pos-right btn-red'>Eliminar de carrito</button>
                    ):
                    (<button onClick={() => addToCar(params, piezas)} className='pos-right btn-green'>Agregar al carrito</button>)
                    }
                </div>
            </div>
        </>
    );
}

export default ArticleComponent;