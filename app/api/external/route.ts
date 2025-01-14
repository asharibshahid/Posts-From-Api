import { NextResponse } from "next/server";




const externalApiUrl = "https://jsonplaceholder.typicode.com/posts";
export async  function GET() {
  try {
   const response = await fetch(externalApiUrl)
   if(!response.ok){
return NextResponse.json(
    {succes: false , messsage:"Fetching " }, {status: response.status}
)

   }
   const data = await response.json()

return NextResponse.json({success:true , data})
  } catch (error:any) {
   console.error()
    return NextResponse.json(
        {
            success: false , message:"Fetching Error" , error : error.message
        }
    )
}
}
