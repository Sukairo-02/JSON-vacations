const fs = require('fs')

const start = () => {
	const raw = JSON.parse(
		fs.readFileSync('./vacationsRaw.json', { encoding: 'utf-8' })
	)

	const userMap = new Map()
	raw.forEach((e) => {
		if (userMap.has(e.user._id)) {
			userMap.get(e.user._id).weekendDates.push({
				startDate: e.startDate,
				endDate: e.endDate,
			})
		} else {
			userMap.set(e.user._id, {
				userID: e.user._id,
				name: e.user.name,
				weekendDates: [{ startDate: e.startDate, endDate: e.endDate }],
			})
		}
	})

	const pretty = []
	for ([key, value] of userMap.entries()) {
		pretty.push(value)
	}

	fs.writeFile(
		'vacationsPretty.json',
		JSON.stringify(pretty, null, 4),
		function (err) {
			if (err) return console.log(err)
		}
	)
}

start()
