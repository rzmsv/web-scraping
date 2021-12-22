const axios = require("axios");
var prompt = require('prompt-sync')();
const JSSoup = require('jssoup').default;
const fs = require("fs")

var day_of_month = 0
const city_link = prompt('Please enter your link from (accuweather.com): ');


async function get_data(city_link){
    try {
        const data = await axios.get(`${city_link}`)

            const list_of_days = []

            let soup = new JSSoup(data.data);
            let find = soup.findAll("div",{class: "temp"}).toString()
            let dayOfDate = soup.findAll("div",{class: "date"}).toString()
            let split_days_temps = find.split(",")
            let listOfDays = dayOfDate.split(",")
            
            for (i = 0 ; i < split_days_temps.length ; i ++){
                
                days = {
                    day : listOfDays[i].split(">")[1].split("<")[0],
                    max_temp : split_days_temps[i].split(">")[2].split("&")[0],
                    min_temp : split_days_temps[i].split(">")[4].split("&")[0],
                }

                list_of_days.push(days)
                const json_stringify = JSON.stringify(list_of_days)
                // Insert To Local Storage
                fs.writeFileSync("./Json_Of_Days/myjsonfile.json",json_stringify,'utf8')
    }       
    } catch (error) {
        console.log("Link was NOT valid.")
    }
    

}

get_data(city_link)

