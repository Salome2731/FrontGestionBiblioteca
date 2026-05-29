import React, { useState, useEffect } from 'react';
import MaterialForm from './materiales/MaterialForm';
import { useThemeStyles } from "../../../context/useThemeStyles.js";

const Materiales = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [materiales, setMateriales] = useState(() => {
        try {
            const saved = localStorage.getItem("misMateriales");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            return [];
        }
    });
    const [materialEditando, setMaterialEditando] = useState(null);
    const styles = useThemeStyles();

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
        setMaterialEditando({...materiales[index], index});
        setIsModalOpen(true);
    };

    const eliminarMaterial = (index) => {
        if (window.confirm("¿Está seguro de eliminar este material?")) {
            setMateriales(materiales.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <h1 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary}`}>Gestión de Materiales</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Nuevo Material
                </button>
            </div>

            <div className="overflow-x-auto border rounded-lg shadow">
                <table className="w-full text-center">
                    <thead>
                        <tr className={styles.tableHeaderClass}>
                            <th className={`${styles.cellClass} font-semibold`}>Título</th>
                            <th className={`${styles.cellClass} font-semibold`}>Autor</th>
                            <th className={`${styles.cellClass} font-semibold`}>Editorial</th>
                            <th className={`${styles.cellClass} font-semibold`}>ISBN</th>
                            <th className={`${styles.cellClass} font-semibold`}>Cant. Total</th>
                            <th className={`${styles.cellClass} font-semibold`}>Cant. Disp.</th>
                            <th className={`${styles.cellClass} font-semibold`}>Estado</th>
                            <th className={`${styles.cellClass} font-semibold`}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiales.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="p-6 text-center text-gray-500 italic">No hay material registrado.</td>
                            </tr>
                        ) : (
                            materiales.map((m, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className={styles.cellColor}>{m.titulo}</td>
                                    <td className={styles.cellColor}>{m.autor}</td>
                                    <td className={styles.cellColor}>{m.editorial}</td>
                                    <td className={styles.cellColor}>{m.isbn}</td>
                                    <td className={styles.cellColor}>{m.cantTotal}</td>
                                    <td className={styles.cellColor}>{m.cantDisp}</td>
                                    <td className={styles.cellColor}>{m.estado}</td>
                                    <td className="p-3 flex justify-center gap-2">
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
                onClose={() => { setIsModalOpen(false); setMaterialEditando(null); }} 
                onSave={handleSave} 
                materialAEditar={materialEditando} 
            />
        </div>
    );
};

export default Materiales;