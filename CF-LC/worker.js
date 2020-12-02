/*
    CF-LC
    Copyright (C) 2019-now  MiniValine Team

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// APP
AppId="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
AppKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

const ORIGINS = {
  "XXXX.XXXXX.workers.dev": "XXXXX.api.lncldglobal.com",
  "XXXXX.yourdomain.com": "XXXXX.api.lncldglobal.com", // proxy serverURLs
}

async function handleRequest(event) {
  const request=event.request

  // You need to write your own filter function here!!
  /*
	Filter function of filter hacker
  */

  const url = new URL(request.url)
  if (url.hostname in ORIGINS) {
    const target = ORIGINS[url.hostname]
    url.hostname = target
    reqHEDNew = new Headers(request.headers)

    if(reqHEDNew.get("X-LC-Id")){

        // You need to write your own filter function here!!
	    /*
		  Filter function of filter hacker
	    */

        reqHEDNew.set("X-LC-Id",AppId)
        reqHEDNew.set("X-LC-Key",AppKey)
    }
    if(reqHEDNew.get("x-lc-sign")){
        reqHEDNew.delete("X-LC-Sign")
    }
    reqNew=new Request(request,{headers: reqHEDNew})
    responsefetch = await fetch(url.toString(),reqNew)
    resHEDNew = new Headers(responsefetch.headers)
    response = new Response(responsefetch.body,{headers: resHEDNew})
    return response
  }
  return fetch(request)
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event))
})
