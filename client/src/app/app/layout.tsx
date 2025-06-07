import { MainLayout } from '~/shared/components/layouts'

export default function Layout({ children }: React.PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>
}
