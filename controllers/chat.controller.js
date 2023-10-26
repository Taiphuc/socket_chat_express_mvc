const path = require('path')

var that = module.exports = {
    homepage: async (req, res, next) => {
        res.sendFile(path.join(__basedir, 'index.html'));
    },
    message: async (req, res, next) => {
        const { msg } = req.query
        // const io = res.io // use middleware (C1)
        // io.emit('chat message', msg)
        _io.emit('chat message', msg) // global variable (C2)
        return res.json({
            code: 200,
            message: msg
        })
    }
}