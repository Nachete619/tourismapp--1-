import { HospedajeDetails } from "@/components/hospedaje/hospedaje-details"

export default function HospedajeDetailPage({ params }: { params: { id: string } }) {
  return <HospedajeDetails id={params.id} />
}
