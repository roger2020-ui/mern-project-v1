const Document = require('../models/documentModel')

//get all documents
const getDocuments = async (req, res) => {
  const documents = await Document.find({}).sort({ createAt: -1 })
  res.status(200).json(documents)
}

//get a single document
const getDocument = async (req,res) => {
    const {id} = req.params
    //check if the id entered is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Invalid id provided'})
    }

    const document = await Document.findById(id)
    if(!document) {
        return res.status(404).json({error: 'Document not found'})
    }
    res.status(200).json(document)
}
// create/upload new document
const uploadDocument = async (req, res) => {
  const { filename, path, desc } = req.body
  //add document to db
  try {
    const document = await Document.create({ filename, path, desc })
    res.status(200).json(document)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a document

//update a document

module.exports = { uploadDocument, getDocuments,getDocument }
