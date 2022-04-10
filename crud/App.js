import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import React, { useState, useEffect } from 'react';

function App() {
  const baseUrl = "https://localhost:44381/";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [modeloSeleccionado, setModeloSeleccionado]=useState({
    id: "",
    titulo: "",
    descripcion: ""
  });

  const peticionGet=async()=>{
    await axios.get(baseUrl+"api/notas")
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    });
  }

  const peticionPost=async()=>{
    delete modeloSeleccionado.id;
    await axios.post(baseUrl+"api/notas", modeloSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    });
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"api/notas/"+modeloSeleccionado.id, modeloSeleccionado)
    .then(response=>{
      var respuesta = response.data;
      var d = data;
      d.map(modelo=>{
        if(modelo.id === modeloSeleccionado.id){
          modelo.titulo = respuesta.titulo;
          modelo.descripcion = respuesta.descripcion;
        }
      });
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    });
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"api/notas/"+modeloSeleccionado.id)
    .then(response=>{
      setData(data.filter(modelo=>modelo.id!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    });
  }

  const seleccionarModelo=(modelo, caso)=>{
    setModeloSeleccionado(modelo);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setModeloSeleccionado({
      ...modeloSeleccionado,
      [name]: value
    });
  }

  useEffect(()=>{
    peticionGet();
  },[]);

  return (
    <div className="App">
      <button className='btn btn-success' onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>titulo</th>
            <th>descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(nota=>(
            <tr key={nota.id}>
              <td>{nota.id}</td>
              <td>{nota.titulo}</td>
              <td>{nota.descripcion}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarModelo(nota, "Editar")}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={()=>seleccionarModelo(nota, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar Nota</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label>Titulo:</label>
              <br/>
              <input type="text" className='form-control' name='titulo' onChange={handleChange}/>
              <label>Descripcion:</label>
              <br/>
              <input type="text" className='form-control' name='descripcion' onChange={handleChange}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
          </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Nota</ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label>ID:</label>
              <br/>
              <input type="text" className='form-control' name='id' readOnly value={modeloSeleccionado && modeloSeleccionado.id}/>
              <br/>
              <label>Titulo:</label>
              <br/>
              <input type="text" className='form-control' name='titulo' onChange={handleChange} value={modeloSeleccionado && modeloSeleccionado.titulo}/>
              <br/>
              <label>Descripcion:</label>
              <br/>
              <input type="text" className='form-control' name='descripcion' onChange={handleChange} value={modeloSeleccionado && modeloSeleccionado.descripcion}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
          </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
          <ModalBody>
            Esta seguro que quiere eleiminar la nota?
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-danger' onClick={()=>peticionDelete()}>Si</button>
            <button className='btn btn-secondary' onClick={()=>abrirCerrarModalEliminar()}>No</button>
          </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
