import {useEffect, useState} from 'react'
import axiosInstance from '../../axiosinstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()
    const [ma100, setMA100] = useState()
    const [ma200, setMA200] = useState()
    const [prediction, setPrediction] = useState()
    const [mse, setMSE] = useState()
    const [rmse, setRMSE] = useState()
    const [r2, setR2] = useState()


    useEffect(() => {
        const fetchProtectedData = async () => {
            try{
                const response = await axiosInstance.get('/protected-view/'             
                )
                //     , {
                //     // headers: {
                //     //     Authorization: `Bearer ${accessToken}`
                //     // }
                //     // pass header to axiosinstace via interceptor, so no need to pass here
                // })
                // console.log('Success:', response.data)
            }catch(error){
                console.log('error here')
                console.error('Error fetching data:', error)
            }
        }
        fetchProtectedData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Trigger API endpoint
        try {
            const response = await axiosInstance.post('/predict/', {ticker: ticker})
            console.log(response.data)
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const plotUrl = `${backendRoot}${response.data.plot_img}`
            const ma100Url = `${backendRoot}${response.data.plot_100_dma}`
            const ma200Url = `${backendRoot}${response.data.plot_200_dma}`
            const predictionUrl = `${backendRoot}${response.data.plot_prediction}`
            // Set plots
            setPlot(plotUrl)
            setMA100(ma100Url)
            setMA200(ma200Url)
            setPrediction(predictionUrl)
            setMSE(response.data.mse)
            setRMSE(response.data.rmse)
            setR2(response.data.r2)
            if(response.data.error){
                setError(response.data.error)
            }
            else{
                setError('')
            }
        } catch (error) {
            console.error('There was an error making the API request', error)
        } finally{
            setLoading(false)
        }
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6'>
                <form onSubmit={handleSubmit}>
                    <input type='text' className='form-control' placeholder='Enter Stock Ticker'
                    onChange={(e) => setTicker(e.target.value)} required
                    />
                    <small>{error && <div className='text-danger'>{error}</div>}</small>
                    <button type='submit' className='btn btn-info mt-3'>
                        {loading ? (<span><FontAwesomeIcon icon={faSpinner} spin />Please wait...</span>) : ('See prediction')}
                    </button>
                </form>
            </div>

            {/* Print Prediciton plots */}
            {prediction && (
                <div className='prediction mt-5'>
                    <div className="p-3">
                        {plot && (<img src={plot} alt="Stock Prediction Plot" style={{ maxWidth: '100%'}}/>)}
                    </div>
                    <div className="p-3">
                        {ma100 && (<img src={ma100} alt="100 DMA Plot" style={{ maxWidth: '100%'}}/>)}
                    </div>
                    <div className="p-3">
                        {ma200 && (<img src={ma200} alt="200 DMA Plot" style={{ maxWidth: '100%'}}/>)}
                    </div>
                    <div className="p-3">
                        {prediction && (<img src={prediction} alt="Final Prediction Plot" style={{ maxWidth: '100%'}}/>)}
                    </div>
    
                    <div className="text-light p3">
                        <h4>Model Evaluation</h4>
                        <p>MSE: {mse}</p>
                        <p>RMSE: {rmse}</p>
                        <p>R²: {r2}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Dashboard