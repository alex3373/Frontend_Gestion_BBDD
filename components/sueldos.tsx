'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../app/api';

interface Bitacora {
  ID_BITACORA: number;
  RUTVENDEDOR: string;
  ANTERIOR: number;
  ACTUAL: number;
  VARIACION: number;
}

export default function Sueldos() {
  const [bitacora, setBitacora] = useState<Bitacora[]>([]);
  const [rut, setRut] = useState('');
  const [nuevoSueldo, setNuevoSueldo] = useState<number | ''>('');
  const [mensaje, setMensaje] = useState('');

  const cargarBitacora = async () => {
    const res = await fetch(`${API_BASE_URL}/api/bitacora`);
    const data = await res.json();
    setBitacora(data);
  };

  useEffect(() => {
    cargarBitacora();
  }, []);

  const actualizarSueldo = async () => {
    if (!rut || !nuevoSueldo) {
      setMensaje('⚠️ Debes ingresar RUT y nuevo sueldo.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/vendedor/${rut}/sueldo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sueldo_base: nuevoSueldo }),
      });

      if (!res.ok) throw new Error('Error al actualizar sueldo.');
      const data = await res.json();
      setMensaje(`✅ ${data.mensaje}`);
      cargarBitacora();
    } catch (err) {
      setMensaje('❌ No se pudo actualizar el sueldo.');
      console.error(err);
    }
  };

  return (
    <section className="py-16 bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-8">Actualización de Sueldos</h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="RUT del vendedor"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 w-64"
          />
          <input
            type="number"
            placeholder="Nuevo sueldo base"
            value={nuevoSueldo}
            onChange={(e) => setNuevoSueldo(Number(e.target.value))}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 w-64"
          />
          <button
            onClick={actualizarSueldo}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all"
          >
            Actualizar
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-8">Bitácora de sueldos</h2>
        {mensaje && <p className="text-amber-400 mb-8">{mensaje}</p>}

        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-xl text-left">
            <thead>
              <tr className="text-indigo-300">
                <th className="p-3">ID</th>
                <th className="p-3">RUT</th>
                <th className="p-3">Anterior</th>
                <th className="p-3">Actual</th>
                <th className="p-3">Variación</th>
              </tr>
            </thead>
            <tbody>
              {bitacora.map((b, i) => (
                <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-3">{b.ID_BITACORA}</td>
                  <td className="p-3">{b.RUTVENDEDOR}</td>
                  <td className="p-3">${b.ANTERIOR}</td>
                  <td className="p-3">${b.ACTUAL}</td>
                  <td className={`p-3 ${b.VARIACION > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {b.VARIACION > 0 ? '+' : ''}{b.VARIACION}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-4 italic">
          Datos obtenidos mediante SELECT sobre tabla <span className="text-gray-300">BITACORA</span>.  
          Actualizaciones registradas automáticamente por trigger <span className="text-gray-300">TG_ACTUALIZA_BITACORA_SUELDO</span>.
        </p>
      </div>
    </section>
  );
}
