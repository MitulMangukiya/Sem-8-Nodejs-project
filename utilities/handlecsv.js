import multer from 'multer';
import csvtojson from 'csvtojson';

const handleMultipartData = multer({ limits: { fileSize: 1000000 * 5 } }).single("csvfile");

export const handleCsv = async (req, res, next) => {
    handleMultipartData(req, res, async (err) => {
        if (err) {
            res.json({ msgs: err.message });
        } else {
            const fileBuffer = req.file.buffer;

            if (!fileBuffer) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            csvtojson().fromString(fileBuffer.toString())
                .then(async (jsonArray) => {

                    let uniqueProducts = [];
                    let productName = [];

                    jsonArray.map((item) => {
                        let checkproduct = item.productName.toLowerCase()
                        // console.log(typeof(checkproduct))

                        if (!productName.includes(checkproduct)) {
                            productName.push(checkproduct);
                            uniqueProducts.push(item);
                        }
                    });
                    
                    uniqueProducts.map((e) => {
                        e.productPrice = parseFloat(e.productPrice);
                        e.mainUserId = req.user.userId;
                        e.createdBy = req.user.userId;
                    })

                    // console.log("length : ",uniqueProducts.length)
                    // res.json(uniqueProducts);
                    req.body = uniqueProducts
                    next()
                })
                .catch((e) => {
                    res.json("csv file is not parsed.",e)
                });
        }
    });
};
