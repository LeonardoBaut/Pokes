import { redirect } from 'next/navigation';

export default function Home() {
  //Directo a /pokes
  redirect('/pokes');
}
