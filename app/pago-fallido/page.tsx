import Link from 'next/link';

export default function PagoFallidoPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>Pago Fallido</h1>
      <p>Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.</p>
      <Link href="/carrito">
        <button style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Volver al carrito</button>
      </Link>
    </div>
  );
}
