'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../app/api';

// Definimos la interfaz de los datos que entrega tu API
interface Porcentaje {
  ANIO: number;
  RUTVENDEDOR: string;
  NOMVENDEDOR: string;
  COMUNA: string;
  SUELDO_BASE: number;
  APORTE_VENTAS: number;
}

export default function Porcentajes() {
  const [datos, setDatos] = useState<Porcentaje[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/porcentaje-vendedor`)
      .then((res) => res.json())
      .then(setDatos)
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold text-gray-100 mb-6">
          Porcentaje de Ventas por Vendedor
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-xl text-left">
            <thead>
              <tr className="text-gray-300">
                <th className="p-3">Vendedor</th>
                <th className="p-3">Comuna</th>
                <th className="p-3">Sueldo Base</th>
                <th className="p-3">Aporte Ventas (%)</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((d, i) => (
                <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/40">
                  <td className="p-3">{d.NOMVENDEDOR}</td>
                  <td className="p-3">{d.COMUNA}</td>
                  <td className="p-3">${d.SUELDO_BASE}</td>
                  <td className="p-3 text-indigo-300">
                    {(d.APORTE_VENTAS * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
