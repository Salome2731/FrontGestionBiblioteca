import React, {useEffect, useState} from 'react';
import {reservationService} from '../../services/reservationService';

export default function ReservasPage() {
    const [reservas, setReservas] = useState([]);

    // Cargar los datos al abrir la página
    useEffect(() => {
        cargarReservas();
    }, []);

    const cargarReservas = async () => {
        try {
            const data = await reservationService.getAll();
            setReservas(data);
        } catch (error) {
            console.error("Error cargando reservas:", error);
        }
    };

    const handleCancelar = async (id) => {
        if (confirm("¿Seguro que desea cancelar esta reserva?")) {
            try {
                // Cambia el estado a CANCELADA en el Backend
                await reservationService.update(id, {estado: 'CANCELADA'});
                cargarReservas(); // Recarga la tabla de inmediato
            } catch (error) {
                alert("Error al cancelar la reserva");
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Reservas</h1>
            </div>

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
                                    <td className="px-5 py-4">{reserva.id}</td>
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
                                </tr>
                            )
                        )
                    )
                    }
                    < /tbody>
                </table>
            </div>
        </div>
    )
}