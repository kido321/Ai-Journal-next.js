import "@/app/style/Textbox.css"
import TextareaAutosize from 'react-textarea-autosize';

export default function Textbox() {
    return (
        <div className="tbody">
        <div className="text-black question">whats on your mind?</div>
      <TextareaAutosize  className="tbox" placeholder="TYPE...."/>
      </div>
    )
  }
  