const { connect } = require('puppeteer-real-browser')
const puppeteer = require('puppeteer')

let lastCookies = null
let lastCookieTime = 0

const connectWithTimeout = async (browserURL, timeout) => {
	return Promise.race([
		puppeteer.connect({ browserURL }),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Connection timed out')), timeout)
		),
	])
}

async function modifyCookies( webDevAddress) {
  if(!lastCookies || (Date.now() - lastCookieTime > 1000 * 60 * 30)){
    return 0
  }
	try {
		// 连接到现有浏览器实例
		const browserURL = webDevAddress // 浏览器的调试地址
		console.log('开始设置cookie', webDevAddress)
		const browser = await connectWithTimeout(browserURL, 5000)
		await browser.setCookie(...lastCookies)
		await browser.disconnect()
		console.info('cookie设置成功')
		return 1
	} catch (error) {
		console.error('cookie设置失败:', error)
		return 0
	}
}

async function autoLoginPoe2(username, password, webDevAddress) {
	let state = 0
	const { browser, page } = await connect({
		headless: false,
		args: [],
		customConfig: {},
		turnstile: true,
		connectOption: {},
		disableXvfb: false,
		ignoreAllFlags: false,
	})

	try {
		// const page = await browser.newPage();
		await page.goto('https://www.pathofexile.com/login', {
			waitUntil: 'networkidle2',
		})

		let login = false

		let count = 0
		while (true) {
			count++
			console.log('尝试登陆', count)
			if (count > 20) {
				console.log('尝试登陆失败')
				return
			}
			const emailInput = await page.$('input[name="login_email"]')
			if (emailInput && !login) {
				await page.type('input[name="login_email"]', username)
				await page.type('input[name="login_password"]', password)
				await page.click('.sign-in__submit')
				login = true
			}
			if (login) {
				const requestPromise = new Promise((resolve) => {
					const timeout = setTimeout(() => {
						resolve(null)
					}, 15000)
					page.on('request', (request) => {
						if (request.url().match(/showcase-pins/)) {
							clearTimeout(timeout)
							resolve(request)
						}
					})
				})
				const request = await requestPromise
				if (request) {
					const cookies = await page.cookies()
          lastCookies = cookies
          lastCookieTime = Date.now()
					console.log('登陆成功')
          state = 1;
					// state = await modifyCookies(cookies, webDevAddress)
				} else {
					console.log('登陆失败')
				}
				await page.close()
				await browser.close()
				break
			}
			await new Promise((r) => setTimeout(r, 5000))
		}
	} catch (error) {
		console.error('登陆失败:', error)
	}finally{
    if (page) {
			await page.close()
		}
		if (browser) {
			await browser.close()
		}
  }
	return state
}

module.exports = {
	autoLoginPoe2,
  modifyCookies
}
