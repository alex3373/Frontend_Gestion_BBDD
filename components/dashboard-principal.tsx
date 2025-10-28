'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../app/api';

export default function DashboardPrincipal() {
  const [resumen, setResumen] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/boletas`).then((r) => r.json()),
      fetch(`${API_BASE_URL}/api/facturas`).then((r) => r.json()),
      fetch(`${API_BASE_URL}/api/clientes`).then((r) => r.json()),
      fetch(`${API_BASE_URL}/api/productos`).then((r) => r.json()),
      fetch(`${API_BASE_URL}/api/errores`).then((r) => r.json()),
    ]).then(([boletas, facturas, clientes, productos, errores]) => {
      const totalVentas = [...boletas, ...facturas].reduce(
        (acc, v) => acc + (v.TOTAL || 0),
        0
      );
      setResumen({
        totalVentas,
        clientesActivos: clientes.length,
        productos: productos.length,
        errores: errores.length,
      });
    });
  }, []);

  if (!resumen)
    return (
      <p className="text-center text-gray-400 mt-10">
        Cargando datos del panel...
      </p>
    );

  return (
    <section className="py-16 bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-10">Resumen General</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-2xl p-6 shadow">
            <h3 className="text-lg font-medium">Ventas Totales</h3>
            <p className="text-2xl font-bold text-indigo-400">
              ${resumen.totalVentas.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 shadow">
            <h3 className="text-lg font-medium">Clientes Activos</h3>
            <p className="text-2xl font-bold text-green-400">
              {resumen.clientesActivos}
            </p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 shadow">
            <h3 className="text-lg font-medium">Productos</h3>
            <p className="text-2xl font-bold text-yellow-400">
              {resumen.productos}
            </p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 shadow">
            <h3 className="text-lg font-medium">Errores</h3>
            <p className="text-2xl font-bold text-red-400">
              {resumen.errores}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
