import React, { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import cerrarImg from '../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('')

    const [mensaje, setMensaje] = useState('');


    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);            
            setFecha(gastoEditar.fecha);            
        }
    }, [])

    const cerrarModal = () => {
        setAnimarModal(false); // anima el formulario
        setGastoEditar({});
        setTimeout(() => {
            setModal(false); // anima el background
        }, 250);
    }

    const handleSubmit = ( event) => {
        event.preventDefault();

        
        if ([ nombre.trim(), cantidad, categoria ].includes('')) {
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('');
            }, 3000);
            return;
        }
        guardarGasto({ nombre: nombre.trim(), cantidad, categoria, id, fecha})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={cerrarImg}
                    alt="Cerrar modal"
                    onClick={cerrarModal}
                />
            </div>
            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`} 
                autoComplete="off">
                <legend> { gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                { mensaje && <Mensaje  tipo="error">{ mensaje }</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id="nombre"
                        type="text" 
                        placeholder="Añade el Nombre del Gasto"
                        value={nombre}
                        onChange={ (event) => setNombre(event.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id="cantidad"
                        type="number" 
                        placeholder="Añade la Cantidad del Gasto ej. 300"
                        value={cantidad}
                        onChange={ (event) => setCantidad(Number(event.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria"
                            value={categoria}
                            onChange={ (event) => setCategoria(event.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={ gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
            </form>
        </div>
    )
}

export default Modal
