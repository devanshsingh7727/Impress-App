import Head from 'next/head';
import Image from 'next/image';
// import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
import Contianer from '../MainComponent/Container';
import { Grid } from '@mui/material';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ImpressApp</title>
        <meta
          name='description'
          content='Craft polished and personalized professional emails effortlessly. Generate from resume data and choose expertly designed templates. Make a lasting impression in just a few clicks. Swift, secure, and effective '
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid
        container
        sx={{
          backgroundColor: '#212121',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Contianer />
      </Grid>
    </>
  );
}
