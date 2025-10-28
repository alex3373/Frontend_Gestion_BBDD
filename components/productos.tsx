'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../app/api';

export default function Productos() {
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
  fetch(`${API_BASE_URL}/api/productos`)
      .then((res) => res.json())
      .then(setProductos)
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-8">Inventario de Productos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.slice(0, 9).map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 text-left shadow transition-all ${
                p.TOTALSTOCK <= p.STKSEGURIDAD
                  ? 'bg-red-900/60 hover:bg-red-800'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <p className="text-indigo-300 text-lg">{p.DESCRIPCION}</p>
              <p className="text-sm text-gray-400">Código: {p.CODPRODUCTO}</p>
              <p className="text-sm text-gray-400">Valor: ${p.VUNITARIO}</p>
              <p className="text-sm text-gray-400">
                Stock actual: {p.TOTALSTOCK} (mínimo {p.STKSEGURIDAD})
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
