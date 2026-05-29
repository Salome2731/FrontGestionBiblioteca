import React, { useState, useEffect } from 'react';

const MaterialForm = ({ isOpen, onClose, onSave, materialAEditar }) => {
    const [formData, setFormData] = useState({
        titulo: '', autor: '', categoria: '', editorial: '', 
        isbn: '', cantTotal: 0, cantDisp: 0, estado: 'Disponible'
    });

    useEffect(() => {
        if (materialAEditar) {
            setFormData(materialAEditar);
        } else {
            setFormData({ titulo: '', autor: '', categoria: '', editorial: '', isbn: '', cantTotal: 0, cantDisp: 0, estado: 'Disponible' });
        }
    }, [materialAEditar]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(formData.cantDisp) > parseInt(formData.cantTotal)) {
            alert("Error: La cantidad disponible no puede ser mayor a la cantidad total.");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    {materialAEditar ? 'Editar Material' : 'Nuevo Material'}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                    <input className="border p-2 rounded" placeholder="Título" required value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})}/>
                    <input className="border p-2 rounded" placeholder="Autor" required value={formData.autor} onChange={(e) => setFormData({...formData, autor: e.target.value})}/>
                    <input className="border p-2 rounded" placeholder="Categoría" required value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})}/>
                    <input className="border p-2 rounded" placeholder="Editorial" required value={formData.editorial} onChange={(e) => setFormData({...formData, editorial: e.target.value})}/>
                    <input className="border p-2 rounded" placeholder="ISBN" required value={formData.isbn} onChange={(e) => setFormData({...formData, isbn: e.target.value})}/>
                    <input type="number" min="0" className="border p-2 rounded" placeholder="Cant. Total" required value={formData.cantTotal} onChange={(e) => setFormData({...formData, cantTotal: e.target.value})}/>
                    <input type="number" min="0" className="border p-2 rounded" placeholder="Cant. Disp." required value={formData.cantDisp} onChange={(e) => setFormData({...formData, cantDisp: e.target.value})}/>
                    <select className="border p-2 rounded" value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                        <option>Disponible</option>
                        <option>Prestado</option>
                        <option>Reservado</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default MaterialForm;