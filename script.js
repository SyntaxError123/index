const app = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://randomuser.me/api/?results=20', true)

request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status <= 400) {
    data.results.forEach(user => {
      const profile = document.createElement('div')
      profile.setAttribute('class', 'profile')

      const name = document.createElement('h2')
      const gender = document.createElement('p')
      const dob = document.createElement('p')
      const country = document.createElement('p')
      const birthday = document.createElement('p')
      var dobFormatted = new Date(user.dob.date)
      var dayOfYearToday = getDayOfYear(new Date())
      var dayOfYearDob = getDayOfYear(user.dob.date)

      name.textContent = user.name.first + ' ' + user.name.last
      gender.textContent = 'Gender: ' + user.gender
      dob.textContent = 'Date of Birth: ' + dobFormatted.toLocaleDateString("en-US")
      country.textContent = 'Country: ' + user.location.country

      if (dayOfYearToday > dayOfYearDob) {
        birthday.textContent = 'Birthday: Has already happened.'
      }
      if (dayOfYearToday < dayOfYearDob) {
        birthday.textContent = 'Birthday: Has Yet to occur.'
      }
      if (dayOfYearToday === dayOfYearDob) {
        birthday.textContent = 'Happy Birthday!'
      }

      container.appendChild(profile);
      profile.appendChild(name)
      profile.appendChild(gender)
      profile.appendChild(dob)
      profile.appendChild(birthday)
      profile.appendChild(country)

    })
  } else {
    console.log('error')
  }
}

//Send the request
request.send()

//Get the number of the day of the year (1-366)
function getDayOfYear(date) {
  var now = new Date(date);
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);

  return day
}
