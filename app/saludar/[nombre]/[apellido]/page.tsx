// function generateStaticParams() {}
//
// export default function Page() {
//   return <h1>Hello, Blog Post Page!</h1>
// }
type PageProps = {
  params: Promise<{
      nombre: string
      apellido: string
  }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { nombre , apellido } = await params

  return (
    <div>
      El nombre introducido es: {nombre} {apellido}
    </div>
  )
}

