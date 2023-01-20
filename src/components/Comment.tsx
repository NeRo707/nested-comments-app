
import user from '../img/user.png'
import CommentForm from './CommentForm';

import { IProps } from './interface';




interface Props{
  key: string;
  comment: IProps;
  replies: IProps[];
  currentUserId: string;
  activeComment: IProps;
  setActiveComment: React.Dispatch<any> ;
  parentId: string;
  addComment: (text:string, parentId:string) => void;
  deleteComment: (id: string) => void;
  updateComment: (id: string, text:string) => void;
  username:string;
  setCustomUser:React.Dispatch<React.SetStateAction<string>>;
  customUser:string;
  replyUser:string;
  setReplyUser:React.Dispatch<React.SetStateAction<string>>;
}


const Comment:React.FC<Props> = ({
  addComment,
  parentId = null, 
  comment, replies, 
  currentUserId, 
  deleteComment, 
  activeComment, 
  setActiveComment,
  updateComment,
  username,
  customUser,
  setCustomUser,
  replyUser,
  setReplyUser,
}) => {
  
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  //console.log(replies);

  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id;
  const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id;
  const replyId:string = parentId ? parentId : comment.id;

  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src={user} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div className=''>{createdAt}</div>
        </div>
          {!isEditing && <div className="comment-text">{comment.body}</div>}
          {isEditing && (
            <CommentForm
            replyUser={replyUser}
            setReplyUser={setReplyUser} 
            customUser={customUser}
            setCustomUser={setCustomUser}
            username={username}
            submitLabel='Update' 
            isEditing={true}
            isReplying={false}
            hasCancelButton initialText={comment.body} 
            handleSubmit={(text:string) => updateComment(text, comment.id)} 
            handleCancel={() => setActiveComment(null)} />
          )}

          <div className="comment-actions">
            {canReply && <div className="comment-action" onClick={() => setActiveComment({id: comment.id, type: "replying"})}>Reply</div>}
            {canEdit && <div className="comment-action" onClick={() => setActiveComment({id: comment.id, type: "editing"})} >Edit</div>}
            {canDelete && <div className="comment-action" onClick={() => deleteComment(comment.id)} >Delete</div>}
          </div>
          {isReplying && (
            <CommentForm
            replyUser={replyUser}
            setReplyUser={setReplyUser}
            isEditing={false}
            isReplying={true}
            customUser={customUser}
            setCustomUser={setCustomUser}
            username={username} 
            submitLabel='Reply'
            handleSubmit={(text: string) => addComment(text, replyId)} hasCancelButton={true} initialText={''} handleCancel={() => setActiveComment(null)} />
          )}
          {replies.length > 0 &&  (
            <div className="replies">
              {replies.map((reply => (

                <Comment
                replyUser={replyUser}
                setReplyUser={setReplyUser}
                customUser={customUser}  
                setCustomUser={setCustomUser}
                username={username} 
                comment={reply} 
                key={reply.id} 
                replies={[]} 
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                parentId = {comment.id}
                />
              )))}
            </div>
          )}
      </div>
    </div>
  )
}

export default Comment
