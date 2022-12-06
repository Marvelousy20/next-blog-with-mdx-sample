import Head from "next/head";
import Header from "./Header";

interface Props {
  children: any;
  description: string;
  pageTitle: string;
}

const Layout = ({ children, description, pageTitle }: Props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{pageTitle}</title>
      </Head>
      <div className="max-w-[800px] mx-auto mt-10">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
