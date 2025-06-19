import Link from 'next/link';

export default function PagoPendientePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>Pago Pendiente</h1>
      <p>Tu pago está pendiente de confirmación. Te notificaremos cuando se complete.</p>
      <Link href="/">
        <button style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Volver al inicio</button>
      </Link>
    </div>
  );
}
