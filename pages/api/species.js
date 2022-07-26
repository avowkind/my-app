import clientPromise from '../../lib/mongodb'

const defaultSpecies = [
  {
    _id: 'SNA',
    name: 'Snapper'
  },
  {
    _id: 'TRE',
    name: 'Trevally'
  },
  {
    _id: 'SAL',
    name: 'Salmon'
  },
  {
    _id: 'YBF',
    name: 'Yellow Bellied Flounder'
  },
  {
    _id: 'BCO',
    name: 'Blue Cod'
  }
]

export default async function handler (req, res) {
  const dbname = process.env.MONGODB_DB

  try {
    if (req.method === 'GET') {
      const client = await clientPromise
      const species = client.db(dbname).collection('species')
      let speciesResult = await species.find().toArray()
      if (speciesResult.length === 0) {
        await species.insertMany(defaultSpecies)
        speciesResult = await species.find().toArray()
      }
      res.status(200).json(speciesResult)
    } else {
      // Handle any other HTTP method
    }
  } catch (e) {
    console.error(e)
    res.status(500).json(e)
  }
}
