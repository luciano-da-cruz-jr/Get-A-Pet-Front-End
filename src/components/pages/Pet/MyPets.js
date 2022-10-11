import api from '../../../utils/api'
import {useState, useEffect} from 'react'

import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'

import RoundedImage from '../../layout/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyPets() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api
          .get('/pets/mypets', {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setPets(response.data.pets)
          })
      }, [token])

    return (
        <section>
            <h1>MyPets</h1>
            <div>
                <Link to="/pet/add">Cadastrar Pet</Link>
            </div>
            <div>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div key={pet._id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span className="bold">{pet.name}</span>
                            <div className={styles.actions}>
                                {pet.available ? 
                                (<>
                                    {pet.adopter && (
                                        <button>Concluir adoção</button>
                                    )}
                                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                    <button>Excluir</button>
                                </>) 
                                : <p>Pet já adotado</p>}
                            </div>
                        </div>
                ))}
                {pets.length === 0 && <p>Não há pets cadastrados</p>}
            </div>
        </section>
    )
}

export default MyPets