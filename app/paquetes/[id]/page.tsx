import { PaqueteDetails } from "@/components/paquetes/paquete-details"

export default function PaqueteDetailPage({ params }: { params: { id: string } }) {
  return <PaqueteDetails id={params.id} />
}
