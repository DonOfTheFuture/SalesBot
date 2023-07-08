//make sure that the messages to the emails of the target demographic (age range, location, ) respond with the common problems of the target audience 
//send emails periodically according to each target demographic's location
//9am - 11am is normal response rate
//22% answered after first hour
// ways to increase visual aestheticness
//use email api
// try to get location info from email and send mail at specified time depending on location
/*
-header 
- color scheme correspond with logo 
- basic fonts
- subheadings
- section content
- good balance of text and images
- brief text
-  whitespace
- visualizations
- video and gifs

*/

/*
1          mail.com
2          email.com
3          usa.com
4          post.com
5          consultant.com
6          myself.com
7          europe.com
8          dr.com
9          engineer.com
10       asia.com

offers
you have a new and appealing offer from *insurance sales company* for a high quality and  affordable insurance offer. 

Do you require affordable and reliable coverage?

Switch to *insurance company name* for fast and reliable coverage!

Switch to *insurance company name*. click here to learn more about us.

Hello! Read about this new insurance offer from *insert company name*.

*/

/*
Readability is more important than style because you want the message to be
 propagated. Bold and clear headings and sub-headings are not only eye-catching,
 but also work best in making your audience keep reading the content
*/
//suggested subject for advertising 
//send email at time based on timezones with random grabber for their subject to each item in email list
//
//timezones PDT (UTC-7), MDT (UTC-6), CDT (UTC-5), EDT (UTC-4)

function getCityData(city){
	return new Promise(res=>{
const url = 'https://city-and-state-search-api.p.rapidapi.com/cities/search?q='+city+'&country_code=US';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'city-and-state-search-api.p.rapidapi.com'
	}
};
fetch(url, options).then(response=>{
	return response.json();
}).then(result=>{
	let cityID = extractProp(result, 'id');
	const url2 = 'https://city-and-state-search-api.p.rapidapi.com/cities/127545';
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'city-and-state-search-api.p.rapidapi.com'
	}
};
fetch(url, options).then(response=>{
	return response.json()
}).then(result=>{
	/*
	_id:132782
id:132782
name:"Lucknow"
state_id:4022
state_code:"UP"
state_name:"Uttar Pradesh"
country_id:101
country_code:"IN"
country_name:"India"
latitude:"26.83928000"
longitude:"80.92313000"
wikiDataId:"Q47916"
	*/
	result = result.map(locObj=>{
		if(locObj[name] === city){
			return locObj
		}
	})
	res(JSON.stringify([result]))
}).catch((error)=>{
	console.error(error);
})
}).catch((error)=>{
	console.error(error);
})
	})
}
function siteImg(url){
	url = url.replaceAll('/', '2F')
	url = url.replaceAll(':', '3A')
	 url = 'https://website-screenshot6.p.rapidapi.com/screenshot?url=https%3A%2F%2Frapidapi.com%2Fmarketplace&width=1920&height=1080&fullscreen=true';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'website-screenshot6.p.rapidapi.com'
	}
};

fetch(url, options).then(response=>{
	return response.json();
}).then(result=>{
	res(result);
	
}).catch((error)=>{
	console.error(error);
})
}
function getEmailData(name, state){
	
   name = name.split(' ')
	const url = 'https://usa-people-search-public-records.p.rapidapi.com/SearchPeople?FirstName='+name[0]+'&LastName='+name[name.length-1]+'&Page=1&State='+state;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'usa-people-search-public-records.p.rapidapi.com'
	}
}
let emailList = allDivs()['email-list']
fetch(url, options).then(response=>{
	/*
	FullName:"LUIS I DIAZ JR"
City:"FITCHBURG"
State:"MA"
Age:"52"
Address:"86 WOODLAND ST FITCHBURG, MA 01420-4070"
Previous_Addresse:"54 WEST ST, APT 4 NORTHAMPTON, MA 01060-3738 (7/22/2011 - 7/22/2011)"
	*/
	return response.json()
}).then(result=>{
	let inbxDiv = allDivs(emailList)['emails']
result['Source1'].forEach((prsnObj)=>{
	let emailDiv = makeEmail(extractProp(prsnObj, 'Email'))
	inbxDiv.appendChild(emailDiv)
})
}).catch((error)=>{
	console.error(error);
})
}
function makeEmail(emailStr){
	let inbxDiv = allDivs()['emails']
	let emailDivClne = inbxDiv.children[0].cloneNode(true)
		//	emailDivClne.children[0].innerText = emailStr
				let [email, remBtn] = ['h4', 'button'].map((str)=>{
					return emailDivClne.querySelector(str)
				})
		
		email.innerText = emailStr
		email.addEventListener('click', (e)=>{
			let newA = document.createElement('a')
			newA.href = 'mailto:'+emailStr
			styleElm(newA, {
				display: 'none'
			})
			document.body.appendChild(newA)
			newA.onclick = (e) =>{
				newA.remove()
			}
			newA.click()
			
		})
	remBtn.addEventListener('click', (e)=>{
		let conDel = confirm('delete email?')
		if(conDel === true){
			emailDivClne.remove()
		}
	})
	return emailDivClne
}
(function emailsList(){
	geoLoc([37, -95],'UNITED STATES')
	let emailList = allDivs()['email-list']
	let inbxInpt = allDivs(emailList)['inbox-inpt']
	let [newEmailInpt, addBtn, rndmBtn, sendBtn, clearBtn] = Array.from(inbxInpt.children)
	let inbxDiv = allDivs(emailList)['emails']
	let sndrDiv = allDivs()['sndr-nav']
	//		let sndrDiv = allDivs()['sndr-nav']
		let navDivs = Array.from(sndrDiv.children)
		let [sbjctDiv, sndrEmail, cmpny] = navDivs
		let infoLists = navDivs.map((div)=>{
			return div.querySelector('select')
		})
		let [subjects, emails, companies] = infoLists
		infoLists.forEach((slctElm)=>{
			addOpt(slctElm)
		})
    rndmBtn.addEventListener('click', (e)=>{
		rndmNames()
	})
	sendBtn.addEventListener('click', (e)=>{
		Array.from(inbxDiv.children).forEach((inbx)=>{
		sendGrid(emails.value, inbx.children[0].innerText, companies.value, subjects)
		})
	})
		addBtn.addEventListener('click', (e)=>{
			if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmailInpt.value)){  
			let emailClne = makeEmail(newEmailInpt.value)
			styleElm(emailClne, {display: 'block'})
			styleElm(emailClne, {display: 'flex', flex: '1'})
			inbxDiv.appendChild(emailClne)
			}else{
				blink(newEmailInpt, 'red')
			}
		})
clearBtn.addEventListener('click', (e)=>{
	if(Array.from(inbxDiv.children).length > 1){
	let askClr = confirm('remove all emails?')
	if(askClr === true){
	let email = inbxDiv.children[0].cloneNode(true)
	inbxDiv.innerHTML = ''
	inbxDiv.appendChild(email)
	}else{
		e.preventDefault()
	}}
})
	
})()
function blink(elm,col){
	let n = 0
	let colInt = setInterval(()=>{
		if(n === 10){
		if(n %2 !== 0){
			elm.style.color = col
		}else{
			elm.style.color = 'black'
		}
		}
		n+=1
	}, 1000)
}
function rndmNames(){
	return new Promise((res)=>{
		const url = 'https://realty-mole-property-api.p.rapidapi.com/randomProperties?limit=500';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
	}
};

fetch(url, options).then(response=>{
	return  response.json();
}).then(result=>{
	let names = []
	result.forEach((obj, i, arr)=>{
		if(obj.hasOwn('owner')){
			let locObj = Object.create({})
			let state = extractProp(obj, 'state')
			let ownrs = extractProp(obj, 'names')
			locObj.state = state
			locObj.names = ownrs
			names.push(locObj)
		}
	})
	return names
}).then(nameArr=>{
	nameArr.forEach((n, i)=>{
		getEmailData(n)
	})
}).catch((error)=>{
	console.error(error);
})
	})
}
function rndmNum(lmt){
	let rndm = (Math.random()+'').slice(3, 5)
	let rndmNum = parseInt(rndm, 10)
	rndmNum = (rndmNum >= lmt)? Math.round(rndmNum - lmt): rndmNum
	return rndmNum
}
function sendGrid(sender, rcpnt, cmpny, sbjctsList){
	//insurance sales company theme html site
	//template
	let siteURL = 'www.'+cmpny+'.com'
	let siteImgURL = Promise.resolve(siteImg(siteURL))
	//clickInd(destination, str,email_addr,giveLink)
	let urlClick = clickInd(siteURL, 'offer from '+cmpny, rcpnt)
	Promise.resolve(urlClick).then(response=>{
	let msg = alDivs()['message']
	msg = msg.children[0].value
	//use with json storage
	let HTMail = `
	<!DOCTYPE>
	   <html>
	      <body>
		  <a></a>
		  <img src='`+siteImgURL+`' alt='`+cmpny+`' style="width: 100%;" href='`+siteURL+`'/>
		    <div id="friends-div">
			<div id="friend-div-head">
			  <h2>Friend</h2>
			  <button>+</button>
			</div>
			<div class="friend-div">
			 <input type="text" placeholder="friend name" id="friend name" class="friend-inpt"/>
			  <input type="email" placeholder="email of friend" class="friend-inpt"/>
			  <button>Send</button>
			  </div>
			</div>
			
		   </body>
	   </html>
	`
 
	function emailSbjct(insrnce){
		let sndrDiv = allDivs()['sndr-nav']
		let navDivs = Array.from(sndrDiv.children)
		let [sbjctDiv, sndrEmail, cmpny] = navDivs
	
			let sbjctsStrArr = ['you have a new and appealing offer from *insurance sales company* for a high quality and  affordable insurance offer.','Do you require affordable and reliable coverage?','Switch to *insurance sales company* for fast and reliable coverage!','Switch to *insurance sales company*. click here to learn more about us.','Hello! Read about this new insurance offer from *insurance sales company*.'].concat(Array.from(sbjctsList.children))
		let rndm = rndmNum(sbjctStrArr.length-1)
		let sbjctStr = sbjsctsStrArr[rndm]
		sbjctStr = sbjctStr.replaceAll('*insurance sales company*', insrnce)
		return sbjsctsStr
	}
	return new Promise((res)=>{
		
	const url = 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
	},
	body: {
		personalizations: [
			{
				to: [
					{
						email: rcpnt
					}
				],
				subject: emailSbjct(cmpny)
			}
		],
		from: {
			email: sender
		},
		content: [
			{
				type: 'text/html',
				value: HTMail
			}
		]
	}
};

fetch(url, options).then(response=>{
return response.json()
}).then(result=>{
	console.log(result);
}).catch((error)=>{
	console.error(error);
})
	})
	}).then(res=>{
		let clicksArr = clickLS()
	let markrInt = setInterval(()=>{
		if(clicksArr.length < JSON.parse(localStorage.getItem).length){
			for(let on = 0; on < clicksArr.length; on++){
				let clickCity = getCityData(clicksArr[on]['city'])
				let coord = ['latitude', 'longitude'].map((str)=>{
					return parseInt(extractProp(clickCity, str), 10)
				})
				let cityTime = Promise.resolve(getTimeZone(clicksArr[on]['city']))
				let crctTime = theTime(cityTime)
				if(crctTime === true){
					geoLoc(coord, rcpnt)
				}
			}
		}
	}, 1000)
	})
}
function addOpt(slct){
	let addBtn = slct.previousElementSibling
	let newOptInpt = addBtn.previousElementSibling
	addBtn.onclick = (e) =>{
	let opt = slct.children[0].cloneNode(true)
	opt.value = newOptInpt.value
	slct.appendChild(opt)
	}
}
function clicksLS(){
	let clicksArr = JSON.parse(localStorage.getItem('clicks'))
	let clicks = (clicksArr !== null) ? [] : clicksArr
	return clicks
}
function getTimeZone(city){
	city = city.replace(' ', '__')
	city =city.replaceAll(' ', '_')
	return new Promise((res)=>{
		const url = 'https://wft-geo-db.p.rapidapi.com/v1/locale/timezones/'+city+'/time';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

 fetch(url, options).then(response=>{
	 return response.json()
	 }).then(result=>{
	//	 data:"2022-09-23T14:53:36.705152303-07:00"
	let dataStr = result['data']
	let time = dataStr.slice(dataStr.indexOf('T')+1,dataStr.indexOf('-'))
	 time = time.split(':').map((t)=>{
		 return Math.round(t)
	 })
	 
	res(time[0]+':'+time[1]);
}).catch((error)=>{
	console.error(error);
})
	})
}
function theTime(cityTime){
//9am - 11am
	    var timeInputSplit = cityTime.split(':'),
      hours, minutes, meridian;
    hours = timeInputSplit[0] ;
    minutes = timeInputSplit[1];
    if(hours <= 12){
      meridian = 'AM'
     
    }else if(hours > 12){
      meridian = 'PM'
      hours -= 12
    }else{
      hours = 12
      meridian = "PM"
    }
    var dateInputValue = cityTime.value;
    var setTime = parseInt((hours === undefined || hours === 0)? hours = '12' : hours) + ':' + minutes + ' ' + meridian + ' ' + dateInputValue;
    setTime = (setTime[0] === '0' && meridian == 'AM')? setTime.replace('0','12'):setTime 
	if(meridian === 'AM'){
		if(hours >= 9 && hours <= 11){
			 return true
		}
	}
	/*
	  var t = new Date();
  var h2 = t.getHours();
    var meridian = (h2 > 12)? 'PM': 'AM';
    var hoursDiff = (meridian == 'PM')? ((t.getHours() - 12)+1) :(t.getHours() - 12)
  var hour = (t.getHours() > 12)?hoursDiff: t.getHours();
  var hour2 = (hour === 0)? 12 : hour;
  var minutes = (t.getMinutes() < 10)? '0' + t.getMinutes(): t.getMinutes();
  var year = t.getFullYear();
  var month = (t.getMonth() + 1 < 10)? '0'+ (t.getMonth()+1): (t.getMonth()+1);
  var day = t.getDate();
  var currentTime = parseInt(hour2) + ':' + minutes + ' ' + meridian + " " + year+"-"+month+"-"+((day < 10)? '0'+day: day);
*/
}
function valEmail(email){
	email = email.replaceAll('@', '')
	return new Promise((res)=>{
	const url = 'https://global-email-v4.p.rapidapi.com/v4/WEB/GlobalEmail/doGlobalEmail?email='+email+'&opt=VerifyMailbox%3AExpress%7CVerifyMailbox%3AExpressPremium&format=json';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2914da1d34msh351ab7879406227p10bf89jsne4b256644e61',
		'X-RapidAPI-Host': 'global-email-v4.p.rapidapi.com'
	}
};
fetch(url, options).then(response=>{
	return response.json();
}).then(result=>{
	res(result);
}).catch ((error)=>{
	console.error(error);
})
	})
}
function allDivs(div, sel){
let elm = (div === undefined)? document.body.getElementsByTagName('*') : div.getElementsByTagName('*')
 return elm
}
function geoLoc(coords, email){
     let mapElm = allDivs()['map']
	     var map = L.map(mapElm.getAttributeNode('id').value).setView(coords, 13);
   setTile(map)
    setMarker(coords, email, map)

  }
  function setMarker(coords, label, map){
	L.marker([coords[0], coords[1]]).addTo(map)
    .bindPopup(label)
    .openPopup();

 }
  function setTile(the_map){
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
}).addTo(the_map);
 }
 function styleElm(elm, obj){
	let keys = Object.keys(obj)
	keys.forEach((k, i, arr)=>{
		elm.style[k] = obj[k] 
	})
	return elm
}
function clickInd(destination, str,email_addr,giveLink){
return new Promise(res=>{
  const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'fb3a8799a1msh7d51c652e251487p1f9c8ajsncd7fa90e29de',
		'X-RapidAPI-Host': 'url-shortener-and-ip-logger.p.rapidapi.com'
	},																				//make email from ceo with api or retrieve company site from website
	body: '{"destinationUrl":"'+destination+'","label":"'+str+'","notifications":[{"type":"EMAIL","token":"'+email_addr+'"}]}'
};

fetch('https://url-shortener-and-ip-logger.p.rapidapi.com/pint-sized/api/v1.0/shorten', options)
	.then(response => response.json())
	.then(response =>{ 
	console.log(response)
	/*id:"q1th9jzy"
key:"vcpBO1bI"
destinationUrl:"https://google.com"
label:"my short url"
redirectUrls:
0:"https://sized.link/*/

let {id, key, dest,label, redir} = response
    let frnchsName = dest.replace('https://', '')
	let topLvlDmns = ['.com','.net', '.io']
	for(let dn = 0; dn < topLvlDmns.length;dn++){
	frnchsName = frnchsName.replace(topLvlDmns[dn], '')
	}
    const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'fb3a8799a1msh7d51c652e251487p1f9c8ajsncd7fa90e29de',
		'X-RapidAPI-Host': 'url-shortener-and-ip-logger.p.rapidapi.com'
	},
	body: '{"id":"'+id+'","key":"'+key+'"}'
};

fetch('https://url-shortener-and-ip-logger.p.rapidapi.com/pint-sized/api/v1.0/visits', options)
	.then(response => response.json())
	.then(response =>{ 
	/*let vidDivObj = Object.create({})
	vidDivObj['cam_name'] = frnchsName
	//let newVidDiv = newVidDiv('load', vidDivObj)*/

	
	let allVisits = localStorage.getItem('visitLog')
	allVisits = (allVisits === null)?[]:JSON.parse(allVisits)
	let logObj = Object.create({})
	logObj.visits = response['visits']
	logObj.id = id
	logObj.key = key
	logObj.addr = addr
	let idExsts = false
	if(allVisits.length >= 1){
	 idExsts = allVisits.some((obj, i)=>{
	   return obj.id=== id && obj.key === key
	 })
	}
	if(idExsts === false){
	allVisits.push(logObj)
	}else{
	  let crntObj = allVisits.filter((o)=>{
	    return o.id === id && obj.key === key		
	  })[0]
	  let objIdx = allVisits.indexOf(crntObj)
	  crntObj.visits = logObj.visits
	  allVisits[objIdx] = crntObj
	}
	res(JSON.stringify(allVisits)) 
	}).catch(err => console.log(err.name+' '+err.message+' '+5686));
  }).catch(err=>{console.log(err.name+' '+err.message+' '+5686)});
  })
}