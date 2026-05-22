import React, { useState, useEffect } from 'react';
import MaterialForm from './materiales/MaterialForm';

const Materiales = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [materiales, setMateriales] = useState(() => {
        const saved = localStorage.getItem("misMateriales");
        return saved ? JSON.parse(saved) : [];
    });
    const [materialEditando, setMaterialEditando] = useState(null);

    useEffect(() => {
        localStorage.setItem("misMateriales", JSON.stringify(materiales));
    }, [materiales]);

    const handleSave = (material) => {
        if (materialEditando !== null) {
            const nuevaLista = [...materiales];
            nuevaLista[materialEditando.index] = material;
            setMateriales(nuevaLista);
        } else {
            setMateriales([...materiales, material]);
        }
        setMaterialEditando(null);
        setIsModalOpen(false);
    };

    const prepararEdicion = (index) => {
        setMaterialEditando({ ...materiales[index], index });
        setIsModalOpen(true);
    };

    const eliminarMaterial = (index) => {
        setMateriales(materiales.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Materiales</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Nuevo Material
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="p-3">Título</th>
                            <th className="p-3">Autor</th>
                            <th className="p-3">Editorial</th> {/* NUEVA COLUMNA */}
                            <th className="p-3">ISBN</th>
                            <th className="p-3">Cant. Total</th>
                            <th className="p-3">Cant. Disp.</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiales.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="p-6 text-center text-gray-500 italic">
                                    No hay material bibliográfico registrado.
                                </td>
                            </tr>
                        ) : (
                            materiales.map((m, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{m.titulo}</td>
                                    <td className="p-3">{m.autor}</td>
                                    <td className="p-3">{m.editorial}</td> {/* DATO AGREGADO */}
                                    <td className="p-3">{m.isbn}</td>
                                    <td className="p-3">{m.cantTotal}</td>
                                    <td className="p-3">{m.cantDisp}</td>
                                    <td className="p-3">{m.estado}</td>
                                    <td className="p-3 flex gap-2">
                                        <button onClick={() => prepararEdicion(index)} className="text-blue-500 hover:underline">Editar</button>
                                        <button onClick={() => eliminarMaterial(index)} className="text-red-500 hover:underline">Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            <MaterialForm 
                isOpen={isModalOpen} 
                onClose={() => {setIsModalOpen(false); setMaterialEditando(null);}} 
                onSave={handleSave} 
                materialAEditar={materialEditando} 
            />
        </div>
    );
};

export default Materiales;