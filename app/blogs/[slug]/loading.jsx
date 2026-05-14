import LoadingIndicator from "@/components/LoadingIndicator"

const Loading = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-ink text-bone">
      <LoadingIndicator label="Loading post" />
    </main>
  )
}

export default Loading
