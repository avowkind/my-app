import clientPromise from '../../lib/mongodb'

const defaultBatchcodes = [
  {
    id: 'SNA',
  },
  {
    id: 'TRE',
    name: 'Trevally',
  },  {
    id: 'SAL',
    name: 'SALMON',
  },  
]

export default async function handler (req, res) {
  const dbname = process.env.MONGODB_DB

  try {
    if (req.method === 'GET') {
      const client = await clientPromise
      const batchcodes = client.db(dbname).collection('batchcodes')
      let batchcodesResult = await batchcodes.find().toArray()
      if (batchcodesResult.length === 0) {
        await batchcodes.insertMany(defaultBatchcodes)
        batchcodesResult = await batchcodes.find().toArray()
      }
      res.status(200).json( batchcodesResult )

    } else {
      // Handle any other HTTP method
    }

  } catch (e) {
    console.error(e)
    res.status(500).json(e)
  }
}
