import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Basic Next.js Example</h3>
        <p>This template shall be the foundation for the thesis work I will programm</p>
      </section>
    </Layout>
  )
}