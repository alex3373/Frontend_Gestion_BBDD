'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../app/api';

// Tipos de datos esperados desde tu backend
interface Vendedor {
  RUTVENDEDOR: string;
  NOMBRE: string;
  MAIL: string;
  SUELDO_BASE: number;
  COMISION: number;
  CODCOMUNA?: number;
}

interface Porcentaje {
  ANIO: number;
  RUTVENDEDOR: string;
  NOMVENDEDOR: string;
  COMUNA: string;
  SUELDO_BASE: number;
  APORTE_VENTAS: number;
}

export default function Vendedores() {
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [porcentaje, setPorcentaje] = useState<Porcentaje[]>([]);

  // Cargar datos al montar el componente
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/vendedores`)
      .then((r) => r.json())
      .then(setVendedores)
      .catch(console.error);

    fetch(`${API_BASE_URL}/api/porcentaje-vendedor`)
      .then((r) => r.json())
      .then(setPorcentaje)
      .catch(console.error);
  }, []);

  // Buscar el porcentaje correspondiente a cada vendedor
  const getAporte = (rut: string) => {
    const item = porcentaje.find((p) => p.RUTVENDEDOR === rut);
    return item ? (item.APORTE_VENTAS * 100).toFixed(2) : '0.00';
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8">Rendimiento de Vendedores</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendedores.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-gray-800 rounded-2xl shadow hover:bg-gray-700 transition-all"
            >
              <h3 className="text-xl font-semibold">{v.NOMBRE}</h3>
              <p className="text-sm text-gray-400 mb-2">{v.MAIL}</p>
              <p>Sueldo base: ${v.SUELDO_BASE}</p>
              <p>Comisión: {v.COMISION}%</p>
              <p className="text-indigo-400 font-semibold mt-2">
                Aporte ventas: {getAporte(v.RUTVENDEDOR)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
