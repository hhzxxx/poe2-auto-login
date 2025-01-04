const { autoLoginPoe2 } = require('./gjf.js')

/**
 * 详细教程看 README.md
 */

let interval = 10 //十分钟登陆一次
let username = '123456@qq.com'
let password = '123456'
let webDevAddress = 'http://192.168.2.130:19222'


;(async () => {
  let lastLogin = 0
	while (true) {
		if (Date.now() - lastLogin > 1000 * 60 * interval) {
		  const state =	await autoLoginPoe2(username, password,webDevAddress)
      if(state > 0){
        lastLogin = Date.now()
      }
		}
		await new Promise((r) => setTimeout(r, 5000))
	}
})()
