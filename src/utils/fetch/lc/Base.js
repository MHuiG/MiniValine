export function FetchLCBase(root) {
	root.setAV = function (root) {
	  // set serverURLs
	  let prefix = 'https://'
	  let serverURLs = ''
	  if (!root.config.serverURLs) {
		switch (root.config.appId.slice(-9)) {
		  // TAB
		  case '-9Nh9j0Va':
			prefix += 'tab.leancloud.cn'
			break
			// US
		  case '-MdYXbMMI':
			prefix += 'console.leancloud.app'
			break
		  default:
			prefix += 'avoscloud.com'
			break
		}
	  }
	  serverURLs = root.config.serverURLs || prefix
	  try {
		AV.init({
		  appId: root.config.appId,
		  appKey: root.config.appKey,
		  serverURLs
		})
	  } catch (e) {}
	  root.v = AV
	}
	root.fetchCount = (root) => {
	  const query1 = new root.v.Query('Comment')
	  query1.equalTo('url', root.C.url)
	  const query2 = new root.v.Query('Comment')
	  query2.equalTo('url', `${root.C.url}/`)
	  const query = AV.Query.or(query1, query2)
	  query.notEqualTo('isSpam', true)
	  query.count().then((count) => {
		root.el.querySelector('.count').innerHTML = count
	  }).catch((ex) => {
		console.log(ex)
		root.el.querySelector('.count').innerHTML = 0
	  })
	}
	root.postComment=(root,comment,callback)=>{
		// setting access
		const getAcl = () => {
		const acl = new root.v.ACL()
		acl.setWriteAccess('role:' + root.role, true)
		acl.setPublicReadAccess(true)
		acl.setPublicWriteAccess(false)
		return acl
		}
		comment.setACL(getAcl())
		comment
		  .save({ log: window.MV })
		  .then((commentItem) => {
			callback(commentItem)
		  })
		  .catch((ex) => {
			root.submitting.hide()
		  })
	}
	
}
