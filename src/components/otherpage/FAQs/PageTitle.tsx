import Image from "next/image";
import Link from "next/link";

export default function PageTitle() {
    return (
        <div className="page-title style-default">
            <div className="thumbs">
                <Image
                    src="/assets/images/page-title/page-title-12.jpg"
                    width={1920}
                    height={300}
                    alt=""
                    priority
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h2 className="title text_white mb_12">
                        Frequently Asked Questions
                    </h2>
                    <ul className="breadcrumb justify-content-center text-button fw-4">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>Pages</li>
                        <li>Frequently Asked Questions</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
