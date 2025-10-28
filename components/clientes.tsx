'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../app/api';
export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/clientes`).then(r => r.json()).then(setClientes);
  }, []);

  return (
    <section className="py-16 bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8">Clientes Activos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((c: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold">{c.NOMBRE}</h3>
              <p className="text-sm text-gray-500">{c.MAIL}</p>
              <p className="text-gray-700 mt-2">Crédito: ${c.CREDITO}</p>
              <p className={`text-sm mt-1 ${c.SALDO > c.CREDITO ? 'text-red-600' : 'text-green-600'}`}>
                Saldo: ${c.SALDO}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
