import "@/app/style/Textbox.css"
import React, { useState ,useEffect , useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Openai from '@/app/openai';
import { useMutation } from "@tanstack/react-query";
import { MessageSc  } from "@/lib/validators/message";
import { nanoid } from 'nanoid'
import Userinput from "./Userinput";
import Chatmesseges from "./Chatmesseges";

export default function Textbox() {

  return (
        <div className="tbody">
        <Chatmesseges />
        <Userinput/>
      </div>
    )
  }
  