const { default: axios } = require("axios")


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (!req.body) {
        return { status: 400, body: 'send med en body da..' }
    }

    if (!req.body.method) {
        return { status: 400, body: 'send med en body med method da' }
    }

    if (!['get', 'post', 'test'].includes(req.body.method)) {
        return { status: 400, body: 'send med en body med method som er get eller post da' }
    }

    if (req.body.method === 'test') return { status: 200, body: "Hallo, her er jeg!" }

    if (!req.body.url) {
        return { status: 400, body: 'send med en body med url da' }
    }

    try {
        if (req.body.method === 'post') {
            const { data } = await axios.post(req.body.url, req.body.payload || {}, { timeout: 30000 })
            return { status: 200, body: data }
        } else {
            const { data } = await axios.get(req.body.url, { timeout: 30000 })
            return { status: 200, body: data }
        }
    } catch (error) {
        const status = error.response?.status || 500
        return { status, body: error.response?.data || error.stack || error.toString() }
    }
}