import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth.js";
import PostCard from "../components/PostCard.js";
import PostForm from "../components/PostForm.js";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function Home() {
	const { user } = useContext(AuthContext);

	const {
		loading,
		error,
		data: { getPosts: posts } = {},
	} = useQuery(FETCH_POSTS_QUERY);

	return (
		<Grid columns={3} divided>
			<Grid.Row className="page-title">
				<Grid.Column>
					<h1>Recent Posts</h1>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<h1>Loading posts</h1>
				) : (
					posts &&
					posts.map((post) => (
						<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
							<PostCard post={post} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
}

export default Home;
