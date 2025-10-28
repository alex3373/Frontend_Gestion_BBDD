export const metadata = {
  title: "Gestión de Ventas - Oracle Dashboard",
  description: "Panel integral de control comercial conectado a Oracle Cloud.",
};

import DashboardPrincipal from "../components/dashboard-principal";
import GenerarInforme from "../components/generar-informe";
import Ventas from "../components/ventas";
import Vendedores from "../components/vendedores";
import Clientes from "../components/clientes";
import Productos from "../components/productos";
import Errores from "../components/errores";
import Sueldos from "../components/sueldos";

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-200 py-10 text-center shadow-md border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-semibold mb-2 text-indigo-400">
              Panel de Control Comercial – Informe de Ventas y Vendedores

            </h1>
            <p className="text-sm text-gray-400">
              Muestra de integración Next.js + Node.js con base de datos Oracle (procedimientos PL/SQL) 
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Proyecto técnico desarrollado por Alexis Córdova
            </p>
          </div>
        </section>

      <DashboardPrincipal />
      <GenerarInforme />
      <Sueldos />
      <Ventas />
      <Vendedores />
      <Clientes />
      <Productos />
      <Errores />
    </>
  );
}
