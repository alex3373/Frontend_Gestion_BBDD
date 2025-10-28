'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../app/api';

interface Venta {
  NUMBOLETA?: number;
  NUMFACTURA?: number;
  RUTCLIENTE: string;
  RUTVENDEDOR: string;
  FECHA: string;
  TOTAL: number;
  ESTADO: string;
}

export default function Ventas() {
  const [boletas, setBoletas] = useState<Venta[]>([]);
  const [facturas, setFacturas] = useState<Venta[]>([]);
  const [tipo, setTipo] = useState<'boletas' | 'facturas'>('boletas');
  const [pagina, setPagina] = useState(1);
  const porPagina = 9;
      useEffect(() => {
        fetch(`${API_BASE_URL}/api/boletas`)
          .then((r) => r.json())
          .then(setBoletas)
          .catch(console.error);

        fetch(`${API_BASE_URL}/api/facturas`)
          .then((r) => r.json())
          .then(setFacturas)
          .catch(console.error);
      }, []);

  const data = tipo === 'boletas' ? boletas : facturas;
  const totalPaginas = Math.ceil(data.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const paginadas = data.slice(inicio, inicio + porPagina);

  const cambiarTipo = (nuevoTipo: 'boletas' | 'facturas') => {
    setTipo(nuevoTipo);
    setPagina(1);
  };

  return (
    <section className="py-16 bg-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">
            Ventas — {tipo === 'boletas' ? 'Boletas' : 'Facturas'}
          </h2>
          <div className="space-x-3">
            <button
              onClick={() => cambiarTipo('boletas')}
              className={`px-4 py-2 rounded-xl transition-all ${
                tipo === 'boletas'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Boletas
            </button>
            <button
              onClick={() => cambiarTipo('facturas')}
              className={`px-4 py-2 rounded-xl transition-all ${
                tipo === 'facturas'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Facturas
            </button>
          </div>
        </div>

        {/* Lista de ventas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginadas.length > 0 ? (
            paginadas.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-800 p-6 hover:bg-gray-700 transition-all shadow border border-gray-700/40"
              >
                <p className="text-indigo-300 font-semibold">
                  {tipo === 'boletas' ? 'Boleta' : 'Factura'} Nº {v.NUMBOLETA || v.NUMFACTURA}
                </p>
                <p className="text-sm text-gray-400">Cliente: {v.RUTCLIENTE}</p>
                <p className="text-sm text-gray-400">Vendedor: {v.RUTVENDEDOR}</p>
                <p className="text-gray-200 mt-2">Total: ${v.TOTAL}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(v.FECHA).toLocaleDateString()}
                </p>
                <p
                  className={`text-xs font-semibold mt-2 ${
                    v.ESTADO === 'PA'
                      ? 'text-green-400'
                      : v.ESTADO === 'EM'
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}
                >
                  Estado: {v.ESTADO}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No se encontraron registros.
            </p>
          )}
        </div>

        {/* Controles de paginación */}
        {data.length > porPagina && (
          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pagina === 1
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              ◀ Anterior
            </button>

            <span className="text-gray-400 text-sm">
              Página {pagina} de {totalPaginas}
            </span>

            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pagina === totalPaginas
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              Siguiente ▶
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
