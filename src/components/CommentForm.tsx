import {useState} from 'react';

interface Props{
  submitLabel: string;
  handleSubmit: Function;
  hasCancelButton: boolean;
  initialText:string;
  handleCancel: any;
  username:string;
  setCustomUser:React.Dispatch<React.SetStateAction<string>>;
  customUser:string;
}

const CommentForm:React.FC<Props> = ({ customUser, setCustomUser, username ,submitLabel, handleSubmit, hasCancelButton = false, initialText='', handleCancel}) => {

  const [text, setText] = useState<string>(initialText)
  const isTextAreaDisabled = text.length === 0;
  const onSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  }

  return (
    <form className='sus' onSubmit={onSubmit}>
      <input style={{color:"black"}} placeholder="Type Name..." value={customUser} onChange={(e)=>{
        setCustomUser(e.target.value);
      }}></input>
      <textarea 
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