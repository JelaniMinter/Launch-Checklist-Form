window.addEventListener("load", () => {
   document.querySelector("form").addEventListener("submit", (event) => {
      
      let pilotName = document.querySelector("input[name=pilotName]").value
      let copilotName = document.querySelector("input[name=copilotName]").value
      let fuelLevel = document.querySelector("input[name=fuelLevel]").value
      let cargoMass = document.querySelector("input[name=cargoMass]").value
      let faultyItems = document.getElementById("faultyItems")
      let fuelStatus = document.getElementById("fuelStatus")
      let cargoStatus = document.getElementById("cargoStatus")
      let launchStatus = document.getElementById("launchStatus")
      let correctDataEntered = false
      
      function validNamecheck(testName) {
         let allowedLetters = "abcefghijklmnopqrstuvwxyz"
         let lowerTestName = testName.toLowerCase()
         for(i=0; i<lowerTestName.length; i++) {
             if (allowedLetters.indexOf(lowerTestName.charAt(i)) === -1) {
                 return -1
            }
         }
      }

      if (pilotName === "" || copilotName === "" || fuelLevel === "" || cargoMass === "") {
         alert("All fields are required!");
         event.preventDefault()
      }else if (validNamecheck(pilotName) === -1 || validNamecheck(copilotName) === -1) {
         alert("Names cannot have any numbers or special symbols");
         event.preventDefault()
      }else if (isNaN(Number(fuelLevel)) || isNaN(Number(cargoMass))) {
         alert("Fuel level and Cargo mass must be numeric")
         event.preventDefault()
      }else{
         correctDataEntered = true
      }

      if (correctDataEntered === true) {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName} is ready for launch`
         document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${copilotName} is ready for launch`
      
         if (fuelLevel < 10000 && cargoMass > 10000) {
            faultyItems.style.visibility = "visible"
            fuelStatus.innerHTML = "There is not enough fuel for the journey"
            cargoStatus.innerHTML = "There is too much mass for launch"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
            event.preventDefault()
         } else if (fuelLevel < 10000) {
            faultyItems.style.visibility = "visible"
            fuelStatus.innerHTML = "There is not enough fuel for the journey"
            cargoStatus.innerHTML = "Cargo mass low enough for launch"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
            event.preventDefault()
         } else if (cargoMass > 10000) {
            faultyItems.style.visibility = "visible"
            fuelStatus.innerHTML = "Fuel level high enough for launch"
            cargoStatus.innerHTML = "There is too much mass for launch"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
            event.preventDefault()
         } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch"
            cargoStatus.innerHTML = "Cargo mass low enough for launch"
            launchStatus.style.color = "green"
            launchStatus.innerHTML = "Shuttle is ready for launch"
            event.preventDefault()
         }
      }

      fetch("https://handlers.education.launchcode.org/static/planets.json").then((response) => {
         response.json().then((json) => {
            let planet = Math.round(Math.random()*5)
            document.getElementById("missionTarget").innerHTML = 
            `<h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[planet].name}</li>
                  <li>Diameter: ${json[planet].diameter}</li>
                  <li>Star: ${json[planet].star}</li>
                  <li>Distance from Earth: ${json[planet].distance}</li>
                  <li>Number of Moons: ${json[planet].moons}</li>
               </ol>
            <img src="${json[planet].image}"></img>`
         })})
})})
