var request = new XMLHttpRequest();
request.open('GET', 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-031?Authorization=CWB-6D57F8F9-271C-4AB5-9D0A-7D27D10D2B0F&format=JSON&LocationName=%E7%95%AA%E8%B7%AF%E9%84%89&sort=Time',true);
request.onload = function(){
    
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        let response = JSON.parse(this.response)

        console.log(response.records.Locations[0])
        
        function setTitle(){
            document.getElementById('nowtitle').textContent = response.records.Locations[0].LocationsName + response.records.Locations[0].Location[0].LocationName +'五天天氣預報'
        }

        function setDate(daynum){
            let targetName = 'day'+ daynum + 'date'
            document.getElementById(targetName).textContent = response.records.Locations[0].Location[0].WeatherElement[0].Time[2*daynum-2].StartTime.substr(5,5)
        }
        
        function setTemp(daynum){
            let targetMin = 'day'+ daynum + 'Mint'
            let targetMax = 'day'+ daynum + 'Maxt'
            let targetName = 'day'+ daynum + 'temp'

            if (nowHr >= 6 && nowHr < 18){
                targetMin = response.records.Locations[0].Location[0].WeatherElement[2].Time[2*daynum-1].ElementValue[0].MinTemperature
                targetMax = response.records.Locations[0].Location[0].WeatherElement[1].Time[2*daynum-2].ElementValue[0].MaxTemperature
            }
            else{
                targetMin = response.records.Locations[0].Location[0].WeatherElement[2].Time[2*daynum-2].ElementValue[0].MinTemperature
                targetMax = response.records.Locations[0].Location[0].WeatherElement[1].Time[2*daynum-1].ElementValue[0].MaxTemperature
            }

            document.getElementById(targetName).textContent = targetMin +'°C/'+ targetMax + '°C'

        }

        function setUVI(daynum){
            let targetName = 'day'+ daynum + 'UVI'
            if (nowHr >= 6 && nowHr < 18){
                document.getElementById(targetName).textContent =  response.records.Locations[0].Location[0].WeatherElement[13].Time[daynum-2].ElementValue[0].UVIndex
            }
            else{
                if (daynum == 1){
                    document.getElementById(targetName).textContent =  '-'
                }
                else{
                    document.getElementById(targetName).textContent = response.records.Locations[0].Location[0].WeatherElement[13].Time[daynum-2].ElementValue[0].UVIndex
                }
            }
        }

        function setPoP(daynum){
            let targetName = 'day'+ daynum + 'PoP'
            document.getElementById(targetName).textContent = response.records.Locations[0].Location[0].WeatherElement[11].Time[2*daynum-2].ElementValue[0].ProbabilityOfPrecipitation
            + '%'
        }

        function setRH(daynum){
            let targetName = 'day'+ daynum + 'RH'
            document.getElementById(targetName).textContent = response.records.Locations[0].Location[0].WeatherElement[4].Time[2*daynum-2].ElementValue[0].RelativeHumidity + '%'
        }

        function setWD(daynum){
            let targetName = 'day'+ daynum + 'WD'
            document.getElementById(targetName).textContent = response.records.Locations[0].Location[0].WeatherElement[10].Time[2*daynum-2].ElementValue[0].WindDirection
        }

        function setWx(daynum){
            let targetName = 'day'+ daynum + 'Wx'
            document.getElementById(targetName).textContent = response.records.Locations[0].Location[0].WeatherElement[12].Time[2*daynum-2].ElementValue[0].Weather
        }

        function wxImgs(daynum){
            let targetName = 'day'+ daynum + 'Wx'
            let addImg = document.createElement("img")
            let br = document.createElement("br")
            let value = response.records.Locations[0].Location[0].WeatherElement[6].Time[2*daynum-2].ElementValue[0].MinApparentTemperature

            if ( value == 1 ){
                addImg.src="icon/01.svg"
            }
            else if( value == 2 ){
                addImg.src="icon/02.svg"
            }
            else if( value == 3){
                addImg.src="icon/03.svg"
            }
            else if( value >= 4 && value < 9){
                addImg.src="icon/05.svg"
            }
            else if( value >= 9 && value < 11){
                addImg.src="icon/08.svg"
            }
            else if( value >= 11){
                addImg.src="icon/12.svg"
            }
            document.getElementById(targetName).appendChild(br)
            document.getElementById(targetName).appendChild(addImg)
        }

        let nowHr = new Date().getUTCHours() + 8;
        setTitle()
        for (i=1;i<=5;i++){
            setWx(i)
            setWD(i)
            setRH(i)
            setPoP(i)
            setDate(i)
            setTemp(i)
            setUVI(i)
            wxImgs(i)
        }

    
    } 
    else {
    }
};
request.send();

