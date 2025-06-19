import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

// 1. IMPORTANTE: Cambia el nombre de tu variable de entorno a MP_ACCESS_TOKEN
// 1. IMPORTANTE: Cambia el nombre de tu variable de entorno a MP_ACCESS_TOKEN
const accessToken = process.env.MP_ACCESS_TOKEN;
const nextPublicUrl = process.env.NEXT_PUBLIC_URL;

if (!accessToken) {
  // Este error se mostrará en la consola del servidor si el token no está configurado
  console.error("ERROR: La variable de entorno MP_ACCESS_TOKEN no está definida.");
  throw new Error("El token de acceso de Mercado Pago no está configurado en el servidor.");
}

if (!nextPublicUrl) {
  // Este error se mostrará en la consola del servidor si la URL no está configurada
  console.error("ERROR: La variable de entorno NEXT_PUBLIC_URL no está definida.");
  throw new Error("La URL base del sitio (NEXT_PUBLIC_URL) no está configurada en el servidor.");
}



// Inicializamos el cliente de Mercado Pago con tu token
const client = new MercadoPagoConfig({
  accessToken,
});

export async function POST(request: Request) {
  try {
    // Leemos los productos del carrito que nos envía el frontend
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "El formato de los items es inválido o el carrito está vacío." },
        { status: 400 }
      );
    }

    // Creamos la preferencia de pago con los datos del carrito
    const preference = await new Preference(client).create({
      body: {
        items: items,
        // 2. IMPORTANTE: Define las URLs a las que será redirigido el usuario
        back_urls: {
          success: `${nextPublicUrl}/pago-exitoso`,
          failure: `${nextPublicUrl}/pago-fallido`,
          pending: `${nextPublicUrl}/pago-pendiente`,
        },

      },
    });

    // Devolvemos el link de pago (init_point) al frontend
    return NextResponse.json({ init_point: preference.init_point });

  } catch (error) {
    console.error("Error al crear la preferencia de pago:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: "Hubo un error en el servidor al crear la preferencia.", details: errorMessage },
      { status: 500 }
    );
  }
}
