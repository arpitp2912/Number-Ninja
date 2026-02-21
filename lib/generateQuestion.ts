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

  const rand=(min:number,max:number)=>
    Math.floor(Math.random()*(max-min+1))+min

  // ----------------------------
  // Difficulty Tier Selection
  // ----------------------------
  // 70% easy, 20% medium, 10% tricky
  const roll = Math.random()
  const tier =
    roll < 0.7 ? "easy" :
    roll < 0.9 ? "medium" :
    "tricky"

  let a:number,b:number,op:string,expr:string,ans:number

  do{

    // ----------------------------
    // 🟢 STREAK 0–5 (Warmup)
    // small numbers, avoid borrow where possible
    // ----------------------------
    if(streak <= 5){
      a = rand(1,9)
      b = rand(1,9)
      op = Math.random()<0.6?"+":"-"

      if(op==="-"){
        if(a<b)[a,b]=[b,a]
        ans=a-b
        expr=`${a} - ${b}`
      }else{
        ans=a+b
        expr=`${a} + ${b}`
      }
    }

    // ----------------------------
    // 🟡 STREAK 6–15 (Flow)
    // allow carry / borrow lightly
    // ----------------------------
    else if(streak <= 15){
      a = rand(1,20)
      b = rand(1,20)
      op = Math.random()<0.5?"+":"-"

      if(op==="-"){
        if(a<b)[a,b]=[b,a]
        ans=a-b
        expr=`${a} - ${b}`
      }else{
        ans=a+b
        expr=`${a} + ${b}`
      }
    }

    // ----------------------------
    // 🟠 STREAK 16–35 (Engagement)
    // introduce boundary crossing
    // ----------------------------
    else if(streak <= 35){

      if(tier==="easy"){
        a = rand(5,20)
        b = rand(1,10)
      }
      else if(tier==="medium"){
        a = rand(10,40)
        b = rand(5,20)
      }
      else{
        // tricky: near 10 boundary
        const base = rand(10,30)
        a = base + rand(7,9)
        b = rand(6,9)
      }

      op = Math.random()<0.5?"+":"-"

      if(op==="-"){
        if(a<b)[a,b]=[b,a]
        ans=a-b
        expr=`${a} - ${b}`
      }else{
        ans=a+b
        expr=`${a} + ${b}`
      }
    }

    // ----------------------------
    // 🔴 STREAK 36+ (Ninja Mode)
    // deceptive but fast-solvable
    // ----------------------------
    else{

      if(tier==="easy"){
        a = rand(10,30)
        b = rand(5,15)
      }
      else if(tier==="medium"){
        a = rand(20,50)
        b = rand(10,25)
      }
      else{
        // tricky patterns like 29+11 or 41-19
        const base = rand(20,40)
        a = base + rand(8,9)
        b = rand(9,11)
      }

      op = Math.random()<0.5?"+":"-"

      if(op==="-"){
        if(a<b)[a,b]=[b,a]
        ans=a-b
        expr=`${a} - ${b}`
      }else{
        ans=a+b
        expr=`${a} + ${b}`
      }
    }

  }while(expr===lastExpression)

  lastExpression=expr

  return{
    expression:expr,
    answer:ans,
    options:createOptions(ans)
  }
}