import MainLayout from '../components/MainLayout';
import Body from '../components/Body';

export default function Home(value) {
  if (!value) {
    return 'Loading...';
  }
  return (
    <MainLayout>
      <Body/>
    </MainLayout>
  )
}
