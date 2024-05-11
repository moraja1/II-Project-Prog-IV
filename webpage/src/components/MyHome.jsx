const MyHome = (props) => {
    return (
        <article className="cmp-container home-screen">
            <h1>{`Bienvenido, ${props.user.name} ${props.user.lastName}`}</h1>
        </article>

    )
}

export default MyHome;