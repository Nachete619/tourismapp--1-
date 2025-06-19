import { AutoDetails } from "@/components/autos/auto-details"

export default function AutoDetailPage({ params }: { params: { id: string } }) {
  return <AutoDetails id={params.id} />
}
