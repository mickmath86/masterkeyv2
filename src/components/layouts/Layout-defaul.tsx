import Footer1 from "../footer/Footer1";
import Header from "../header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div id="wrapper" className="clearfix">
                <Header />
                {children}
                <Footer1 />
            </div>
        </>
    );
}
