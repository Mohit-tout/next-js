
const Blog = async () => {

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve('intentianal delay')
        }, 2000)
    })

    return <>
        <h1>
            Welcome Blog Page !!!
        </h1>
    </>

}
export default Blog;