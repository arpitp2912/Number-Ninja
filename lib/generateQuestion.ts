export type Question = {
  expression: string
  answer: number
  options: number[]
}

let lastExpression = ""

function shuffle(arr:number[]){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1))
    ;[arr[i],arr[j]]=[arr[j],arr[i]]
  }
  return arr
}

function createOptions(correct:number){
  const set=new Set<number>([correct])
  while(set.size<4){
    const fudge=Math.floor(Math.random()*5)+1
    const sign=Math.random()<0.5?-1:1
    const val=correct+(fudge*sign)
    if(val>=0) set.add(val)
  }
  return shuffle([...set])
}

export function generateQuestion(streak:number):Question{

  const easy = streak < 20

  const rand=(min:number,max:number)=>
    Math.floor(Math.random()*(max-min+1))+min

  let a:number,b:number,op:string,expr:string,ans:number

  do{
    if(easy){
      a=rand(1,9)
      b=rand(1,9)
    }else{
      a=rand(10,99)
      b=rand(1,50)
    }

    op=Math.random()<0.5?"+":"-"

    if(op==="-"){
      if(a<b)[a,b]=[b,a]
      ans=a-b
      expr=`${a} - ${b}`
    }else{
      ans=a+b
      expr=`${a} + ${b}`
    }

  }while(expr===lastExpression)

  lastExpression=expr

  return{
    expression:expr,
    answer:ans,
    options:createOptions(ans)
  }
}