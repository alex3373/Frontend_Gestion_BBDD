'use client';
import { useState } from 'react';
import { API_BASE_URL } from '../app/api';

export default function GenerarInforme() {
  const anioActual = new Date().getFullYear();
  const [mensaje, setMensaje] = useState('');
  const [porcentajes, setPorcentajes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generarInforme = async () => {
    setLoading(true);
    setMensaje(`Generando informe del año ${anioActual}, por favor espera...`);

    try {
      const res = await fetch(`${API_BASE_URL}/api/generar-informe/${anioActual}`);
      const text = await res.text();
      setMensaje(text);

      const data = await fetch(`${API_BASE_URL}/api/porcentaje-vendedor`).then((r) => r.json());
      const filtrados = data.filter((p: any) => String(p.ANIO) === String(anioActual));
      setPorcentajes(filtrados);
    } catch (err: any) {
      console.error(err);
      setMensaje('❌ Error al generar el informe.');
      setPorcentajes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Generar informe anual de rendimiento según porcentaje de ventas por vendedor
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Año actual: <span className="text-amber-400 font-semibold">{anioActual}</span>
        </p>

        <button
          onClick={generarInforme}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white text-lg transition-all ${
            loading ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Procesando...' : `Generar informe ${anioActual}`}
        </button>

        {mensaje && (
          <p
            className={`mt-8 mb-8 font-medium ${
              mensaje.startsWith('✅') ? 'text-green-400' :
              mensaje.startsWith('❌') ? 'text-red-400' :
              'text-yellow-400'
            }`}
          >
            {mensaje}
          </p>
        )}

        {porcentajes.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse shadow bg-gray-800 rounded-xl overflow-hidden">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Año</th>
                    <th className="p-3 text-left">RUT</th>
                    <th className="p-3 text-left">Vendedor</th>
                    <th className="p-3 text-left">Comuna</th>
                    <th className="p-3 text-left">Sueldo Base</th>
                    <th className="p-3 text-left">% Aporte</th>
                  </tr>
                </thead>
                <tbody>
                  {porcentajes.map((p, i) => (
                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/60">
                      <td className="p-3">{p.ANIO}</td>
                      <td className="p-3">{p.RUTVENDEDOR}</td>
                      <td className="p-3">{p.NOMVENDEDOR}</td>
                      <td className="p-3">{p.COMUNA}</td>
                      <td className="p-3">${p.SUELDO_BASE}</td>
                      <td className="p-3 text-indigo-300">
                        {(p.APORTE_VENTAS * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-4 italic">
              Datos generados mediante procedimiento PL/SQL <span className="text-gray-300">GENERAR_INFORME_PORCENTAJE_VENDEDOR</span>  
              y package <span className="text-gray-300">PKG_REPUESTOS_CAR</span>.  
              Resultados obtenidos mediante SELECT sobre tabla <span className="text-gray-300">PORCENTAJE_VENDEDOR</span>.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
