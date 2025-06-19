import Link from 'next/link';

export default function PagoExitosoPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>¡Pago Exitoso!</h1>
      <p>Gracias por tu compra. Hemos recibido tu pago correctamente.</p>
      <Link href="/">
        <button style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Volver al inicio</button>
      </Link>
    </div>
  );
}
