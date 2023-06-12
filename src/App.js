import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [magicEquipSpells, setMagicEquipSpells] = useState([]);

    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

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
            <h1>Cartas de Yugioh</h1>
            <label htmlFor="limit">Limit</label>
            <input type="number" name="limit" min="5" onInput={(e) => {
                const _limit = e.currentTarget.value;
                setLimit(_limit);
            }
            }/>
            <label htmlFor="page">Page</label>
            <input type="number" name="page" min="1" onInput={(e) => {
                const _page = e.currentTarget.value;
                setPage(_page);
            }
            }/>
            {/* <button onClick={requestCards}>Request cards</button> */}
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {
                    magicEquipSpells.map(card =>
                        <tr>
                            <td>{card.name}</td>
                            <td>{card.desc}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
