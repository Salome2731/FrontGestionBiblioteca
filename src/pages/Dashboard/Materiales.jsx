import React from 'react';
import { useThemeStyles } from "../../context/useThemeStyles.js";

const Materiales = () => {
    const styles = useThemeStyles();

    return (
        <div className="w-full p-6">
            <h1 className={`text-2xl sm:text-3xl font-bold ${styles?.textPrimary || 'text-gray-800'}`}>
                Gestión de Material Bibliográfico
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                ¡Por fin! Si estás viendo esto, significa que el módulo cargó correctamente y las rutas están melas.
            </p>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
                Próximo paso: Empezar a crear la tabla y el formulario para tus libros.
            </div>
        </div>
    );
};

export default Materiales;