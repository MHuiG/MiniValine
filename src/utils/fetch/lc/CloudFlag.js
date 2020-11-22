export function FetchCloudFlag (root) {
  try {
    root.cloudFlag = Object.create(null)
    AV.Query.doCloudQuery('select * from Roles limit 100000000  order by -createdAt').then((rets) => {
      root.cloudFlag.Roles = Object.create(null)
      for (let i = 0; i < rets.results.length; i++) {
        root.cloudFlag.Roles[rets.results[i].get('name')] = { nick: rets.results[i].get('nick'), color: rets.results[i].get('color') }
      }
    }, (error) => { console.log(error) })
    AV.Query.doCloudQuery('select * from Users limit 100000000  order by -createdAt').then((rets) => {
      root.cloudFlag.Users = Object.create(null)
      for (let i = 0; i < rets.results.length; i++) {
        root.cloudFlag.Users[rets.results[i].get('emailhash').toLowerCase()] = rets.results[i].get('role')
      }
    }, (error) => { console.log(error) })
  } catch (e) {}
}
