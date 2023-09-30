import { NextResponse } from "next/server";
import { replace  , journal_prompt} from '@/constant/journalprompt'



export const POST = async (req: Request) => {

    const  prompt = await req.json(); 
    replace(prompt.journalType);
    
    
};
