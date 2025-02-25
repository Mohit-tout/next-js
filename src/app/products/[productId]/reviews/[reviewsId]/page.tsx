const getRandomInt = (count: number) => {
    return Math.floor(Math.random() * count)
}

const ProductReview = async ({ params }: {
    params: Promise<{ productId: String; reviewsId: String }>
}) => {


    const random = getRandomInt(2)
    console.log('random-------:',random)
    if(random===1 || random===0){
        throw new Error('Testin Error Loading')
    }

    const { productId, reviewsId } = await params;

    return <>
        <h1>Welcom To Product Review Details Page</h1>
        <h2 >Product Id Is :- {productId}</h2>
        <h2 >Reviews Id Is :- {reviewsId}</h2>

    </>
}

export default ProductReview;