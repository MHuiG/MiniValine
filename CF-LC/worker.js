 52  worker.js 
@@ -1,52 +0,0 @@
/*
Released under the GPL-3.0 License.
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
