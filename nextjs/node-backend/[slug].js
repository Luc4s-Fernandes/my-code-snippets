//pages/[slug]

export default function MemberDetailsPage({ data }) {

    return (
        <div>
            <h1>Details Page</h1>
            <p>ID: {data.id}</p>
            <p>Name: {data.name}</p>
            <p>Age: {data.age}</p>
            <p>Email: {data.email}</p>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const id = params.slug;

    try {
        const res = await fetch(`http://localhost:3000/api/api-handler?id=${id}`);

        if (!res.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        const data = await res.json();

        return {
            props: {
                data,
            },
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            props: {
                data: null
            }
        };
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    };
}