import { useState } from "react";
import axios from "axios";

const useRequestData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Lav en request til en api
   * @param {string} url link til api'en
   * @param {string} method  hvilken måde du ville bruge api'en på (GET, POST, DELETE)'
   * @param {JSON} bodydata Data der skal sendes til api'en
   *  @param {JSOn} headers
   * @param {JSON} params Special data til api'en så som api key
   */
  const makeRequest = async (url, method = "GET", bodydata = null) =>
    /* Funktionen async giver din browser mulighed for at køre funkcionen i bagrudnen mens man bruger/kigger på hjemmesiden */
    {
      setIsLoading(true);

      try {
        let response; /* en let som kommer til at indeholde reponse fra api'en */

        switch (
          method // gør det samme som en masse elif statements men er mere performance velligt når man kommer over 3 statements
        ) {
          case "GET":
            response = await axios.get(url, { headers, params }); // await betyder at linjen skal vente på den asynkrone funktion bliver færdig

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
          case "patch":
            response = await axios.patch(url, bodydata, { headers, params });

            break;
          default:
            throw new Error(
              "Invalid method. GET, POST, PUT, PATCH or DELETE was expected"
            );
        }
        if (response && response.data !== undefined) {
          setData(response.data);
          setError(null);
        } else {
          throw new Error("Empty response or no data returned");
        }
      } catch (error) {
        console.log("Fejl", error);
        setError("An error has ocured:" + error.message);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

  return {makeRequest, isLoading, data, error}; // sender den data tilbage som skal bruges yden for dette script som sender det tilbage som et JSON ibjet (Den data inden indefor tuborg klarmmern)
}

export default useRequestData;
