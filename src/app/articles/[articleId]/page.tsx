import Link from "next/link";

const NewsAritcles = async ({ params, searchParams }: {
    params: Promise<{ articleId: string }>
    searchParams: Promise<{ lang?: "en" | "es" | "fr" }>
}) => {

    const { articleId } = await params;
    const { lang = "en" } = await searchParams;

    return <>
        <h1 className="p-10">News Articles Id -: {articleId}</h1>
        <p className="p-10">Reading in language -: {lang}</p>
        <Link className="p-10" href={`/articles/${articleId}?lang=en`}>English</Link>
        <Link className="p-10" href={`/articles/${articleId}?lang=es`}>Spanish</Link>
        <Link className="p-10" href={`/articles/${articleId}?lang=fr`}>French</Link>

    </>
}

export default NewsAritcles;