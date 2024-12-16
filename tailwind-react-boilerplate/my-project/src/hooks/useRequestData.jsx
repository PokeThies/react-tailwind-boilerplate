import { useState } from "react"
import axios from "axios"

const useRequestData = () => {

    const [ isLoading, setIsLoading] = useState(false);
    const [ data, setData] = useState(null);
    const [ error, setError] = useState(null);

    /**
     * lav en request til en api
     * @param {string} url link til api'en
     * @param {string} method hvilken måde du vil bruge api'en på (GET, POST, DELETE)
     * @param {JSON} bodydata data der skal sendes til api'en
     * @param {JSON} headers 
     * @param {JSON} params spcial data til api'en så som api key 
     */
    const makeRequest = async (url, method = "GET", bodydata = null, headers = null, params = null) =>
    //funktionen er async fordi det giver browseren mulighed for at køre functionen i bagrunden mens brugeren kigger på/bruger hjemmesiden
    {
        setIsLoading( true );

        try
        {
            let response;//en let som kommer til at indeholde response fra api'en

            switch(method){// gør det samme som en masse elif statements men er mere performance velligt når man kommer over 3 statements
                case "GET":
                    response = await axios.get(url, { headers, params });//await betyder at linjen skal vente på den asynkrone funktion bliver færdig
                    break;

                case "POST":
                    response = await axios.post(url, bodydata, { headers, params });
                    break;

                case "DELETE":
                    response = await axios.delete(url, { headers, params });
                    break;

                case "PUT":
                    response = await axios.put(url, bodydata, { headers, params });
                    break;

                case "PATCH":
                    response = await axios.patch(url, bodydata, { headers, params });
                    break;

                default:
                    throw new Error( "Invalid method. GET, POST, PUT, PATCH or DELETE was expected.");
            }

            if( response && response.data !== undefined){
                setData( response.data );
                setError( null );
            }
            else{
                throw new Error("Empty rensponse or no data returned");
            }
        }
        catch (error)//hvis der opstår en fejl kørrer vi denne kode for at vise det til brugeren og os selv
        {
            console.log( "ERROR", error );
            setError( "an error has ocurred: " + error.message);
            setData(null);
        }
        finally//bliver kørt i slutningen uanset om vi har fået en fejl eller ej
        {
            setIsLoading(false);
        }
    }

    return { makeRequest, isLoading, data, error };//sender den data tilbage som skal bruges uden for dette script som et JSON objekt(den data inden i tuborg klapperne)
}

export default useRequestData
