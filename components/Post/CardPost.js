import React, { useState } from "react";
import { Link } from "next/router";
import { Segment, Card, Image, Popup, Divider } from "semantic-ui-react";
import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import { deletePost } from "../../utils/postActions";

const CardPost = ({ post, user, setPosts, setShowToastr }) => {
  const [likes, setLikes] = useState(post.likes);
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0;
  const [comments, setComments] = useState(post.comments);

  return (
    <>
      <Segment basic>
        <Card color="teal" fluid>
          {post.picUrl && (
            <Image
              src={post.picUrl}
              floated="left"
              wrapped
              ui={false}
              alt="PostImage"
              style={{ cursor: "pointer" }}
            />
          )}
          <Card.Content>
            <Image
              floated="left"
              src={post.user.profilePicUrl}
              avatar
              circular
            />

            {(user.role === "root" || post.user._id === user._id) && (
              <Popup
                on="click"
                position="top right"
                trigger={
                  <Image
                    src="/deleteIcon.svg"
                    style={{ cursor: "pointer" }}
                    size="mini"
                    floated="right"
                  />
                }
              >
                <Header as="h4" content="Are you sure?" />
                <p>This action is irreversible!</p>

                <Button
                  color="red"
                  icon="thrash"
                  content="Delete"
                  onClick={() => deletePost(post._id, setPosts, setShowToastr)}
                />
              </Popup>
            )}
            <Card.Header>
              <Link href={`/${post.user.username}`}>
                <a>{post.user.name}</a>
              </Link>
            </Card.Header>
            <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta>
            {post.location && <Card.Meta content={post.location} />}

            <Card.Description
              style={{
                fontSize: "17px",
                letterSpacing: "0.1px",
                wordSpacing: "0.35px",
              }}
            >
              {post.text}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon
              name={isLiked ? "heart" : "heart outline"}
              color="red"
              style={{ cursor: "pointer" }}
            />
            {likes.length > 0 && (
              <span className="spanLikesList">
                {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
              </span>
            )}

            <Icon
              name="comment outline"
              style={{ marginLeft: "7px" }}
              color="blue"
            />
            {comments.length > 0 &&
              comments.map(
                (comment, i) =>
                  i < 3 && (
                    <PostComments
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                      user={user}
                      setComments={setComments}
                    />
                  )
              )}

            {comments.length > 3 && (
              <Button content="View more" color="teal" basic circular />
            )}
            <Divider hidden />

            <CommentInputField
              user={user}
              postId={post._id}
              setComments={setComments}
            />
          </Card.Content>
        </Card>
      </Segment>
      <Divider hidden />
    </>
  );
};

export default CardPost;
