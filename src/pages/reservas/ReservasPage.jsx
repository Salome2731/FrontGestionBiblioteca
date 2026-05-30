import React, { useEffect, useState } from 'react';
import { reservationService } from '../../services/reservationService';

export default function ReservasPage() {
    const [reservas, setReservas] = useState([]);
    
    // Estados para el formulario de nueva reserva
    const [usuarioId, setUsuarioId] = useState('');
    const [bookId, setBookId] = useState('');
    const [fechaReserva, setFechaReserva] = useState('');
    const [fechaExpiracion, setFechaExpiracion] = useState('');

    const cargarReservas = async () => {
        try {
            const data = await reservationService.getAll();
            setReservas(data);
        } catch (error) {
            console.error("Error cargando reservas:", error);
        }
    };

    useEffect(() => {
        cargarReservas();
    }, []);

    // 🚀 EXCEPCIONES Y VALIDACIONES AL CREAR RESERVA
    const handleCrearReserva = async (e) => {
        e.preventDefault();

        // ❌ Validación 1: Campos vacíos
        if (!usuarioId || !bookId || !fechaReserva || !fechaExpiracion) {
            alert("⚠️ Error: Todos los campos del formulario son obligatorios.");
            return;
        }

        // ❌ Validación 2: Fecha pasada
        const fechaHoy = new Date().toISOString().split('T')[0];
        if (fechaReserva < fechaHoy) {
            alert("⚠️ Error lógico: No puede programar una reserva para una fecha pasada.");
            return;
        }

        // ❌ Validación 3: Lógica de fechas coherentes
        if (fechaExpiracion <= fechaReserva) {
            alert("⚠️ Error lógico: La fecha de vencimiento debe ser posterior a la fecha de reserva.");
            return;
        }

        try {
            const nuevaReserva = {
                usuarioId: parseInt(usuarioId),
                bookId: parseInt(bookId),
                fechaReserva,
                fechaExpiracion,
                estado: 'RESERVADO'
            };

            await reservationService.create(nuevaReserva);
            alert("¡Reserva creada con éxito! Melo.");
            
            // Limpiar formulario
            setUsuarioId('');
            setBookId('');
            setFechaReserva('');
            setFechaExpiracion('');
            
            cargarReservas(); // Recargar tabla
        } catch (error) {
            console.error("Error al crear reserva:", error);
            alert("Hubo un error al conectar con el servidor para guardar la reserva.");
        }
    };

    const handleCancelar = async (id) => {
        if (confirm("¿Seguro que desea cancelar esta reserva?")) {
            try {
                await reservationService.update(id, { estado: 'CANCELADA' });
                cargarReservas(); 
            } catch (error) {
                alert("Error al cancelar la reserva");
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Reservas</h1>
            </div>

            {/* 📝 FORMULARIO NUEVO CON VALIDACIONES */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Crear Nueva Reserva</h2>
                <form onSubmit={handleCrearReserva} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">ID Usuario</label>
                        <input 
                            type="number" 
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={usuarioId}
                            onChange={(e) => setUsuarioId(e.target.value)}
                            placeholder="Ej. 102"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">ID Libro / Material</label>
                        <input 
                            type="number" 
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            placeholder="Ej. 45"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Fecha Reserva</label>
                        <input 
                            type="date" 
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={fechaReserva}
                            onChange={(e) => setFechaReserva(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Fecha Vencimiento</label>
                        <input 
                            type="date" 
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={fechaExpiracion}
                            onChange={(e) => setFechaExpiracion(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-4 flex justify-end mt-2">
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow transition duration-200"
                        >
                            Guardar Reserva
                        </button>
                    </div>
                </form>
            </div>

            {/* 📋 TABLA DE RESERVAS */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase font-semibold">
                            <th className="px-5 py-3">ID Reserva</th>
                            <th className="px-5 py-3">ID Usuario</th>
                            <th className="px-5 py-3">ID Libro</th>
                            <th className="px-5 py-3">Fecha Reserva</th>
                            <th className="px-5 py-3">Fecha Vencimiento</th>
                            <th className="px-5 py-3">Estado</th>
                            <th className="px-5 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {reservas.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-gray-500">
                                    No hay reservas registradas.
                                </td>
                            </tr>
                        ) : (
                            reservas.map((reserva) => (
                                <tr key={reserva.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-5 py-4 font-semibold">{reserva.id}</td>
                                    <td className="px-5 py-4">{reserva.usuarioId}</td>
                                    <td className="px-5 py-4">{reserva.bookId}</td>
                                    <td className="px-5 py-4">{reserva.fechaReserva}</td>
                                    <td className="px-5 py-4">{reserva.fechaExpiracion}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            reserva.estado === 'RESERVADO' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {reserva.estado}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        {reserva.estado !== 'CANCELADA' ? (
                                            <button
                                                onClick={() => handleCancelar(reserva.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-150"
                                            >
                                                Cancelar
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Sin acciones</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
