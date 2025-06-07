export default async function ChatById({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  console.log('id', id)

  return <div>ChatById</div>
}
