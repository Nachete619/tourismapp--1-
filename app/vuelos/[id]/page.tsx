import { VueloDetails } from "@/components/vuelos/vuelo-details"

export default function VueloDetailPage({ params }: { params: { id: string } }) {
  return <VueloDetails id={params.id} />
}
