import { Fragment } from "react";
import { DefaultSeo } from "next-seo";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Fragment>
                <DefaultSeo
                    titleTemplate="%s | Gym Loop"
                    defaultTitle="Gym Loop - Flexible Gym Memberships Across Bangladesh"
                    description="Access gyms across Bangladesh with a single membership. Find and check in to partner gyms near you."
                    openGraph={{
                        type: "website",
                        locale: "en_BD",
                        url: "https://gymloop.com.bd/",
                        siteName: "Gym Loop",
                    }}
                    twitter={{
                        handle: "@gymloop",
                        site: "@gymloop",
                        cardType: "summary_large_image",
                    }}
                />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Fragment>
        </SessionProvider>
    );
}
