import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [magicEquipSpells, setMagicEquipSpells] = useState([]);

    const [limit, setLimit] = useState(4);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    const [cardImages, setCardImages] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3004/data?_page=${page}&_limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200) return response.json();
                return {
                    code: response.status,
                    message: "Verifique conexion"
                };
            })
            .then(payload => {
                if (Array.isArray(payload) && payload.length > 0) {
                    setMagicEquipSpells(payload);
                } else {
                    // Aqui hay un error
                    alert(payload.message);
                }
            })
            .catch(error => {
                alert(error.message);
            });
    }, [limit, page]);

    // Efecto aplicado cuando Search cambia, es decir, cuando el campo de búsqueda sufre un cambio
    useEffect(() => {
    // Guarda la URL de la API en una variable llamada url
    let url = `http://localhost:3004/data?_page=${page}&_limit=${limit}`;
  
    // Se agrega la parte de búsqueda a la URL si Search cambia
    if (search) {
      url += `&name_like=${search}`;
    }
  
    // Se hace la petición ya con la URL compuesta
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // Se verifica si la petición fue respondida con éxito
        if (response.status === 200) return response.json();
        return {
          code: response.status,
          message: "Verifique la conexión"
        };
      })
      .then(payload => {
        // Se asignan los datos al estado Magic
        if (Array.isArray(payload)) {
          if (payload.length > 0) {
            setMagicEquipSpells(payload);
            const images = payload.map(card => card.card_images[0].image_url_small);
            setCardImages(images);
          } else {
            setMagicEquipSpells([]); // Actualizar el estado con un array vacío
            alert("No se encontraron resultados.");
          }
        } else {
          alert(payload.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }, [limit, page, search]);
  
      
  
  
    //manejador de cambio de paginas
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
      };

    /*const requestCards = () => {
        fetch(`http://localhost:3004/data?_page=${page}&_limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(cards => {
                setMagicEquipSpells(cards);
            })
            .catch(error => {
                console.log(error);
            });
    };*/
    return (
        <div className="App">
            {/*esto es un fondo animado que saque de una libreria en linea*/}
            <div>
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            </div>
            {/*aqui termina la parte del fondo animado*/}
            <div className='Container'>
                <h1 className='Titulo'>Cartas de Yugioh</h1>
                <div className='Container__search'>
                    <label htmlFor="limit">Limit</label>
                    <input 
                    className='Toolbar_input'
                    type="number" 
                    name="limit" 
                    min="10" 
                    onInput={(e) => {
                    const _limit = e.currentTarget.value;
                    setLimit(_limit);
                    }
                    }/>
                    <label 
                    htmlFor="page">Page</label>
                    <input 
                    className='Toolbar_input'
                    type="number" 
                    name="page" 
                    min="1" 
                    onInput={(e) => {
                    const _page = e.currentTarget.value;
                    setPage(_page);
                    }
                    }/>
                    {/* <button onClick={requestCards}>Request cards</button> */}
                    {/*esta es la barra de busqueda*/}
                    <label 
                    htmlFor='Search'>Search</label>
                    <input
                    className='Toolbar_input'
                    type="text"
                    name='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    

                </div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Card</th>
                </tr>
                </thead>
                <tbody>
                {magicEquipSpells.map((card, index) => (
                    <tr key={card.id}>
                        <td>{card.name}</td>
                        <td>{card.desc}</td>
                        <td>
                            <img 
                            className='CardImg'
                            src={cardImages[index]} alt={card.name} />
                        </td>
                    </tr>
                        ))
                }
                </tbody>
            </table>
            </div>
        {/*esta seccion son los botones para navegar entre las primeras 16 paginas*/}
        
            <div className='appNav'>
              <button className='appNav__ANT' onClick={() => handlePageChange(page - 1)}>Ant.</button>
                <button className='appNav_button' onClick={() => handlePageChange(1)}>1</button>
                <button className='appNav_button' onClick={() => handlePageChange(2)}>2</button>
                <button className='appNav_button' onClick={() => handlePageChange(3)}>3</button>
                <button className='appNav_button' onClick={() => handlePageChange(4)}>4</button>
                <button className='appNav_button' onClick={() => handlePageChange(5)}>5</button>
                <button className='appNav_button' onClick={() => handlePageChange(6)}>6</button>
                <button className='appNav_button' onClick={() => handlePageChange(7)}>7</button>
                <button className='appNav_button' onClick={() => handlePageChange(8)}>8</button>
                <button className='appNav_button' onClick={() => handlePageChange(9)}>9</button>
                <button className='appNav_button' onClick={() => handlePageChange(10)}>10</button>
                <button className='appNav_button' onClick={() => handlePageChange(11)}>11</button>
                <button className='appNav_button' onClick={() => handlePageChange(12)}>12</button>
                <button className='appNav_button' onClick={() => handlePageChange(13)}>13</button>
                <button className='appNav_button' onClick={() => handlePageChange(14)}>14</button>
                <button className='appNav_button' onClick={() => handlePageChange(15)}>15</button>
                <button className='appNav_button' onClick={() => handlePageChange(16)}>16</button>
                <button className='appNav__ANT' onClick={() => handlePageChange(page + 1)}>Sig.</button>
            </div>
        </div>
    );
}

export default App;
