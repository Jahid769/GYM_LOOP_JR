import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <Toaster richColors position="top-right" />
        </>
    );
}
