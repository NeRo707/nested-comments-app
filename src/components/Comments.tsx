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
  replyUser:string;
  setReplyUser:React.Dispatch<React.SetStateAction<string>>;
}

const Comments:React.FC<Props> = ({customUser, currentUserId, username, setCustomUser, replyUser, setReplyUser}) => {
  const [backendComments, setBackendComments] = useState<Array<IProps>>([]);
  const [activeComment, setActiveComment] = useState<any>(null);

  const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);

  
  const getReplies = (commentId:string | number) => {
  
    return backendComments.filter(backendComments => backendComments.parentId === commentId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  };
  console.log('0: ',activeComment);
  const addComment = (text:string, parentId:string) => {
    // console.log(parentId)
    // console.log("AddComment", text, parentId);
    createCommentApi(text, parentId, currentUserId, username).then(comment => {
      setBackendComments([comment, ...backendComments]);
      console.log('1: ',activeComment);
      setActiveComment(null);
      setCustomUser('');
      console.log('2: ',activeComment);
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
    
      <CommentForm replyUser={replyUser} setReplyUser={setReplyUser} customUser={customUser} setCustomUser={setCustomUser} username={username} submitLabel="Write" handleSubmit={addComment} hasCancelButton={false} initialText={''} handleCancel={undefined} />
      <div className="comments-container">
      {rootComments.map((rootComment) => (
        <Comment
        replyUser={replyUser}
        setReplyUser={setReplyUser}
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
