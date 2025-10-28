'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../app/api';
interface ErrorRegistro {
  RUTINA_ERROR: string;
  DESCRIP_ERROR: string;
}

export default function Errores() {
  const [errores, setErrores] = useState<ErrorRegistro[]>([]);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [expandido, setExpandido] = useState<number | null>(null);

  useEffect(() => {
        fetch(`${API_BASE_URL}/api/errores`)
      .then((res) => res.json())
      .then(setErrores)
      .catch(console.error);
  }, []);

  const interpretarError = (descripcion: string): string => {
    if (descripcion.includes('ORA-00001'))
      return 'Informe generado dos veces para el mismo año.';
    if (descripcion.includes('ORA-00942'))
      return 'Tabla o vista no existe.';
    if (descripcion.includes('ORA-06550'))
      return 'Error de sintaxis en el bloque PL/SQL.';
    if (descripcion.includes('ORA-00904'))
      return 'Columna no válida o inexistente.';
    if (descripcion.includes('ORA-00933'))
      return 'Error de sintaxis SQL.';
    if (descripcion.includes('ORA-12154'))
      return 'Servicio Oracle (TNS) no encontrado.';
    if (descripcion.includes('ORA-28009'))
      return 'Autenticación fallida.';
    return 'Error no identificado.';
  };

  const erroresVisibles = mostrarTodos ? errores : errores.slice(0, 5);

  return (
    <section className="py-20 bg-gray-950 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-8">
          Errores del Sistema ({errores.length})
        </h2>

        {errores.length === 0 ? (
          <p className="text-gray-400">No se registran errores recientes.</p>
        ) : (
          <div className="space-y-4 text-left">
            {erroresVisibles.map((e, i) => {
              const mensajeInterpretado = interpretarError(e.DESCRIP_ERROR);
              const estaAbierto = expandido === i;

              return (
                <div
                  key={i}
                  className="bg-gray-800 rounded-2xl p-5 shadow hover:bg-gray-700 transition-all border border-gray-700/40"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandido(estaAbierto ? null : i)}
                  >
                    <div>
                      <p className="text-red-400 font-semibold">
                        Rutina: {e.RUTINA_ERROR}
                      </p>
                      <p className="text-yellow-300 text-sm">
                        {mensajeInterpretado}
                      </p>
                    </div>

                    <span className="text-gray-400 text-sm select-none">
                      {estaAbierto ? '▲' : '▼'}
                    </span>
                  </div>

                  {estaAbierto && (
                    <div className="mt-3 border-t border-gray-700 pt-2">
                      <p className="text-xs text-gray-400 font-mono">
                        {e.DESCRIP_ERROR}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {errores.length > 5 && (
          <button
            onClick={() => setMostrarTodos(!mostrarTodos)}
            className="mt-8 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {mostrarTodos ? 'Ver menos ▲' : `Ver todos (${errores.length}) ▼`}
          </button>
        )}
      </div>
    </section>
  );
}
