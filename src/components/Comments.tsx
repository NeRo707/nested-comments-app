import {useState, useEffect} from 'react';
import { getComments as getCommentsApi, createComment as createCommentApi, deleteComment as deleteCommentApi, updateComment as updateCommentApi } from '../api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { IProps } from './interface';

interface Props{
  currentUserId:string;
  username: string;
  setCustomUser:React.Dispatch<React.SetStateAction<string>>;
  customUser:string;
}

const Comments:React.FC<Props> = ({customUser, currentUserId, username, setCustomUser}) => {
  const [backendComments, setBackendComments] = useState<Array<IProps>>([]);
  const [activeComment, setActiveComment] = useState<any>(null);

  const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);

  
  const getReplies = (commentId:string | number) => {
  
    return backendComments.filter(backendComments => backendComments.parentId === commentId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  };

  

  const addComment = (text:string, parentId:string) => {
    // console.log(parentId)
    // console.log("AddComment", text, parentId);
    createCommentApi(text, parentId, currentUserId, username).then(comment => {
      setBackendComments([comment, ...backendComments])
      setActiveComment(null);
    });


  }

  const deleteComment = (commentId:string) => {
    if(window.confirm("are you sure?")){
      deleteCommentApi(commentId).then(() => {
        const updatedBackednComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId)
          setBackendComments(updatedBackednComments);
      })
    }
  }

  const updateComment = (text:string, commentId:string) => {
    updateCommentApi(text, commentId).then(() => {
        const updatedBackednComments = backendComments.map(
          backendComment => {
            if(backendComment.id === commentId) {
              return {...backendComment, body: text }
            }
            return backendComment;
          });
          setBackendComments(updatedBackednComments);
          setActiveComment(null);
      }
    )
}
  
  useEffect(() => {
    getCommentsApi().then((data:IProps[]) => {
      setBackendComments(data);
    })
  }, [])


  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write a comment</div>
      <CommentForm customUser={customUser} setCustomUser={setCustomUser} username={username} submitLabel="Write" handleSubmit={addComment} hasCancelButton={false} initialText={''} handleCancel={undefined} />
      <div className="comments-container">
      {rootComments.map((rootComment) => (
        <Comment
        customUser={customUser}
        setCustomUser={setCustomUser}
        username={username}
        updateComment={updateComment} 
        comment={rootComment} 
        key={rootComment.id} 
        replies={getReplies(rootComment.id)} 
        currentUserId={currentUserId}
        deleteComment={deleteComment}
        activeComment={activeComment}
        setActiveComment={setActiveComment}
        parentId={rootComment.id}
        addComment={addComment}
        
        />
      ))}
      </div>
  

    </div>
  )
}


export default Comments
