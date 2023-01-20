import {MouseEventHandler, useState} from 'react';

interface Props{
  submitLabel: string;
  handleSubmit: Function;
  hasCancelButton: boolean;
  initialText:string;
  handleCancel: MouseEventHandler<HTMLButtonElement> | undefined;
  username:string;
  setCustomUser:React.Dispatch<React.SetStateAction<string>>;
  customUser:string;
  isEditing?: boolean;
  isReplying?: boolean;
  replyUser:string;
  setReplyUser:React.Dispatch<React.SetStateAction<string>>;
}

const CommentForm:React.FC<Props> = ({replyUser ,isReplying ,isEditing ,customUser, setCustomUser, username ,submitLabel, handleSubmit, hasCancelButton = false, initialText='', handleCancel}) => {

  const [text, setText] = useState<string>(initialText)

  const isTextAreaDisabled = (isReplying) && (isEditing);
  const onSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  }

  const differ = () => {
    if(!customUser){
      return replyUser;
    }
  }

  return (
    <form className='sus' onSubmit={onSubmit}>

      { !isEditing ? (
        <input required className='input-name' style={{color:"black"}} placeholder="Input your name here..." value={differ()} onChange={(e)=>{
          setCustomUser(e.target.value);
        }}/>
      ) : (
        <></>
      ) }
      
      
      <textarea
      required 
      placeholder='Write a comment...'
      className="comment-form-textarea" 
      value={text} 
      onChange={(e) => setText(e.target.value)}/>

      <button className='comment-form-button' disabled={isTextAreaDisabled}>{submitLabel}</button>

      {hasCancelButton && (
        <button 
        type='button' 
        className='comment-form-button comment-form-cancel-button'
        onClick={handleCancel}>Cancel</button>
      )}

    </form>
  )
}

export default CommentForm