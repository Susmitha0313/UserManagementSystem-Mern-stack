const verifyLogin = async(req, res) => {
    try {
        console.log(req.body);
        res.send(req.body)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    verifyLogin,
}