import { AuthGuard } from './AuthGuard'
import { Sidebar } from './Sidebar'

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthGuard>
      <div className='grid grid-cols-[auto_1fr]'>
        <Sidebar />
        <main className='p-10 flex w-full max-w-2xl mx-auto'>
          <div className='border border-default-200 w-full rounded-xl'>{children}</div>
        </main>
      </div>
    </AuthGuard>
  )
}
