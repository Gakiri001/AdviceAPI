import {useState} from 'react'
import Qoute from './Qoute'
import "./Advices.css"

function Advice() {
  const[qoute,setQoute] = useState("")
  const[qouteData, setQouteData] = useState(null)
  const[error, setError] = useState(false)
  const[loading,setLoading] = useState(false)

  const handleQouteSearch = async(ev) =>{
    ev.preventDefault()
    console.log(qoute)
    
    setQouteData(null)
    setError(null)
    setLoading(true)

    try{
      const adviceResponse = await fetch (`https://api.adviceslip.com/advice`)
      console.log(adviceResponse)
      if(adviceResponse.ok === true){
        const theQouteData = await adviceResponse.json()
        console.log(theQouteData)
        setQouteData(theQouteData.slip.advice)
        setLoading(false)
      }
      else{
        setError(`couldn't find an advice`)
        setLoading(false)
      }
    }
    catch{
      setError(`There was an error fetching the qoute,please check the internet connection or try again later`)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='Advice'>
      <h1>Quote to keep you motivated</h1>
      <h3>We move together,we recharge, we learn too</h3>
      <button onClick={handleQouteSearch}>Get a Qoute</button>
      <div className='QouteShow'>
        {
          error && <h2>{error}</h2>
        }
        {
          loading && <h2>Loading please wait....</h2>
        }
        {
          qouteData && <Qoute advice={qouteData}/>
        }
      </div>
    </div>
  )
}

export default Advice