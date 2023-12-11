export const recoverRadio = async (stationName)=>{
    const response = await fetch(`https://de1.api.radio-browser.info/json/stations/byname/${stationName}`);
        const data = await response.json();
        console.log("LA data del fecht es ", data.length);
        // Actualiza el estado local con los datos obtenidos de la API
        const first200Data = data.filter((item, index) => index < 200);
        return first200Data ;

}